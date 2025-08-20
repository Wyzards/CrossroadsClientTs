import axios, { type AxiosInstance } from 'axios';
import { ApiError, NotFoundError, UnauthorizedError, ValidationError } from './error.js';

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

    constructor(baseURL: string, token: string) {
        this.axios = axios.create({ baseURL });

        this.axios.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        }); // May only work if included in the create? idk!

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