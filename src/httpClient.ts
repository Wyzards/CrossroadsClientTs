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

export class HttpClient {
    private axios: AxiosInstance;

    constructor(baseURL: string, token: string, axiosInstance?: AxiosInstance) {
        this.axios = axiosInstance ?? axios.create({
            baseURL,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!axiosInstance) {
            this.axios.interceptors.response.use(
                res => res,
                err => {
                    const status = err.response?.status;
                    const data = err.response?.data;
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


    async get<T = any>(url: string) {
        const res = await this.axios.get<T>(url);
        return res.data;
    }

    async post<T = any>(url: string, body: any) {
        const res = await this.axios.post<T>(url, body);
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