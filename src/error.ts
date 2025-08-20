// errors.ts
export class ApiError extends Error {
    status: number;
    data: any;

    constructor(status: number, message: string, data?: any) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

export class ValidationError extends ApiError {
    constructor(data: any) {
        super(422, "Validation failed", data);
        this.name = "ValidationError";
    }
}

export class NotFoundError extends ApiError {
    constructor(data?: any) {
        super(404, "Resource not found", data);
        this.name = "NotFoundError";
    }
}

export class UnauthorizedError extends ApiError {
    constructor(data?: any) {
        super(401, "Unauthorized", data);
        this.name = "UnauthorizedError";
    }
}