import axios, { type AxiosInstance } from 'axios';
import { ApiError, NotFoundError, UnauthorizedError, ValidationError } from './error';

export function createMockAxios(): jest.Mocked<AxiosInstance> {
    return {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
        request: jest.fn(),
        // Include interceptors if your code uses them
        interceptors: { request: { use: jest.fn(), eject: jest.fn() }, response: { use: jest.fn(), eject: jest.fn() } },
    } as any;
}

export interface HttpRequestOptions {
    method: "GET" | "POST" | "PUT" | "DELETE";
    url: string;
    data?: unknown;
    headers?: Record<string, string>;
}

export interface HttpResponse<T> {
    data: T;
    status: number;
}

export interface HttpClientOptions {
    /** Refuse every request that could write (dry runs). */
    readOnly?: boolean;
}

/** POSTs that only read; allowed on a readOnly client. */
const READ_ONLY_POSTS = [/\/projects\/search$/, /\/project-lists\/\d+\/evaluate-tags-bulk$/, /\/project-lists\/match$/];

export class ReadOnlyError extends Error {
    constructor(method: string, url: string) {
        super(`readOnly client refused ${method.toUpperCase()} ${url}`);
        this.name = "ReadOnlyError";
    }
}

export class HttpClient {
    private axios: AxiosInstance;

    constructor(baseURL: string, token: string, axiosInstance?: AxiosInstance, options: HttpClientOptions = {}) {
        this.axios = axiosInstance ?? axios.create({
            // baseURL specified in implementing config
            // ex: http://127.0.0.1:8000/api/
            baseURL,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });



        if (options.readOnly) {
            this.axios.interceptors.request.use(config => {
                const method = (config.method ?? "get").toLowerCase();
                const url = (config.url ?? "").split("?")[0] ?? "";
                if (method !== "get" && !(method === "post" && READ_ONLY_POSTS.some(r => r.test(url))))
                    throw new ReadOnlyError(method, config.url ?? "");
                return config;
            });
        }

        if (!axiosInstance) {
            this.axios.interceptors.response.use(
                res => res,
                err => {
                    const status = err.response?.status;
                    const data = err.response?.data;

                    console.error("HTTP ERROR RESPONSE:", {
                        status,
                        data,
                        url: err.config?.url,
                        method: err.config?.method,
                        requestData: err.config?.data,
                        headers: err.response?.headers,
                    });

                    switch (status) {
                        case 401: throw new UnauthorizedError(data);
                        case 404: throw new NotFoundError(data);
                        case 422: throw new ValidationError(data);
                        default: throw new ApiError(status ?? 500, err.message, data);
                    }
                }
            );
        }
    }

    get instance() {
        return this.axios;
    }


    async get<T = any>(url: string, config?: any) {
        const res = await this.axios.get<T>(url, config);
        return res.data;
    }

    async post<T = any>(url: string, body: any, config?: any) {
        const res = await this.axios.post<T>(url, body, {
            ...config,
            headers: {
                ...config?.headers,
                ...body.getHeaders?.(),
            },
            maxBodyLength: Infinity,
        });
        return res.data;
    }

    async put<T>(url: string, body: any) {
        const res = await this.axios.put<T>(url, body);
        return res.data;
    }

    async delete<T>(url: string) {
        const res = await this.axios.delete<T>(url);
        return res.data;
    }
}