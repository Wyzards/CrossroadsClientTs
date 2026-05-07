"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErasApi = void 0;
const error_js_1 = require("../error.js");
class ErasApi {
    constructor(http) {
        this.http = http;
    }
    async getEras() {
        return this.http.get(`/eras`);
    }
    async getEra(id) {
        try {
            return await this.http.get(`/eras/${id}`);
        }
        catch (err) {
            if (err instanceof error_js_1.NotFoundError)
                return null;
            throw err;
        }
    }
    createEra(data) {
        return this.http.post(`/eras`, data);
    }
    updateEra(id, data) {
        return this.http.put(`/eras/${id}`, data);
    }
    async activateEra(id) {
        const response = await this.http.post(`/eras/${id}/activate`, {});
        return response.affected_users;
    }
}
exports.ErasApi = ErasApi;
//# sourceMappingURL=index.js.map