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
export interface HttpClientOptions {
    /** Refuse every request that could write (dry runs). */
    readOnly?: boolean;
    /** Request timeout in milliseconds (default 30000; 0 = none). A hung request must fail, not stall its caller. Ignored with a custom axios instance. */
    timeoutMs?: number;
}
export declare const DEFAULT_TIMEOUT_MS = 30000;
export declare class ReadOnlyError extends Error {
    constructor(method: string, url: string);
}
export declare class HttpClient {
    private axios;
    constructor(baseURL: string, token: string, axiosInstance?: AxiosInstance, options?: HttpClientOptions);
    get instance(): AxiosInstance;
    get<T = any>(url: string, config?: any): Promise<T>;
    post<T = any>(url: string, body: any, config?: any): Promise<T>;
    put<T>(url: string, body: any): Promise<T>;
    delete<T>(url: string): Promise<T>;
}
//# sourceMappingURL=httpClient.d.ts.map