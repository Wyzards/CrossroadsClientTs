import { type AxiosInstance } from 'axios';
export declare function createMockAxios(): jest.Mocked<AxiosInstance>;
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
export declare class HttpClient {
    private axios;
    constructor(baseURL: string, token: string, axiosInstance?: AxiosInstance);
    get instance(): AxiosInstance;
    get<T = any>(url: string, config?: any): Promise<T>;
    post<T = any>(url: string, body: any, config?: any): Promise<T>;
    put<T>(url: string, body: any): Promise<T>;
    delete<T>(url: string): Promise<T>;
}
//# sourceMappingURL=httpClient.d.ts.map