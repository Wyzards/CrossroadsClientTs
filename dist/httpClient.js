"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
exports.createMockAxios = createMockAxios;
const axios_1 = __importDefault(require("axios"));
const error_1 = require("./error");
function createMockAxios() {
    return {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
        request: jest.fn(),
        // Include interceptors if your code uses them
        interceptors: { request: { use: jest.fn(), eject: jest.fn() }, response: { use: jest.fn(), eject: jest.fn() } },
    };
}
class HttpClient {
    constructor(baseURL, token, axiosInstance) {
        this.axios = axiosInstance ?? axios_1.default.create({
            // baseURL specified in implementing config
            // ex: http://127.0.0.1:8000/api/
            baseURL,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!axiosInstance) {
            this.axios.interceptors.response.use(res => res, err => {
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
                    case 401: throw new error_1.UnauthorizedError(data);
                    case 404: throw new error_1.NotFoundError(data);
                    case 422: throw new error_1.ValidationError(data);
                    default: throw new error_1.ApiError(status ?? 500, err.message, data);
                }
            });
        }
    }
    get instance() {
        return this.axios;
    }
    async get(url, config) {
        const res = await this.axios.get(url, config);
        return res.data;
    }
    async post(url, body, config) {
        const res = await this.axios.post(url, body, {
            ...config,
            headers: {
                ...config?.headers,
                ...body.getHeaders?.(),
            },
            maxBodyLength: Infinity,
        });
        return res.data;
    }
    async put(url, body) {
        const res = await this.axios.put(url, body);
        return res.data;
    }
    async delete(url) {
        const res = await this.axios.delete(url);
        return res.data;
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=httpClient.js.map