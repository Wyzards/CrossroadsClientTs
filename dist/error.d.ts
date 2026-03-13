export declare class ApiError extends Error {
    status: number;
    data: any;
    constructor(status: number, message: string, data?: any);
}
export declare class ValidationError extends ApiError {
    constructor(data: any);
}
export declare class NotFoundError extends ApiError {
    constructor(data?: any);
}
export declare class UnauthorizedError extends ApiError {
    constructor(data?: any);
}
//# sourceMappingURL=error.d.ts.map