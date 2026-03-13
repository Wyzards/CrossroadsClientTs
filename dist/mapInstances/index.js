"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapInstancesApi = void 0;
class MapInstancesApi {
    constructor(http) {
        this.http = http;
    }
    async listForUser(userId) {
        return this.http.get(`/map-instances/user/${userId}`);
    }
    createForUser(userId, payload) {
        return this.http.post(`/map-instances/user/${userId}`, payload);
    }
    getSecondaryUsers(instanceId) {
        return this.http.get(`/map-instances/${instanceId}/secondary-users`);
    }
    addSecondaryUser(instanceId, userId) {
        return this.http.post(`/map-instances/${instanceId}/secondary-users`, { userId });
    }
    removeSecondaryUser(instanceId, userId) {
        return this.http.delete(`/map-instances/${instanceId}/secondary-users/${userId}`);
    }
    delete(instanceId) {
        return this.http.delete(`/map-instances/${instanceId}`);
    }
}
exports.MapInstancesApi = MapInstancesApi;
//# sourceMappingURL=index.js.map