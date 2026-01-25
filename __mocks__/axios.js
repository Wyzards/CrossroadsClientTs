"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    create: jest.fn(() => ({
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
    })),
};
//# sourceMappingURL=axios.js.map