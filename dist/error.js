"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.NotFoundError = exports.ValidationError = exports.ApiError = void 0;
// errors.ts
class ApiError extends Error {
    constructor(status, message, data) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}
exports.ApiError = ApiError;
class ValidationError extends ApiError {
    constructor(data) {
        super(422, "Validation failed", data);
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends ApiError {
    constructor(data) {
        super(404, "Resource not found", data);
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends ApiError {
    constructor(data) {
        super(401, "Unauthorized", data);
        this.name = "UnauthorizedError";
    }
}
exports.UnauthorizedError = UnauthorizedError;
//# sourceMappingURL=error.js.map