"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgesApi = void 0;
class BadgesApi {
    constructor(http) {
        this.http = http;
    }
    getBadges() {
        return this.http.get(`/badges`);
    }
    createBadge(data) {
        return this.http.post(`/badges`, data);
    }
    updateBadge(id, data) {
        return this.http.put(`/badges/${id}`, data);
    }
    assignBadge(userId, badgeId) {
        return this.http.post(`/crossroads-users/${userId}/badges/${badgeId}`, {});
    }
    removeBadge(userId, badgeId) {
        return this.http.delete(`/crossroads-users/${userId}/badges/${badgeId}`);
    }
    getSystemChannels() {
        return this.http.get(`/system/channels`);
    }
    setSystemChannels(data) {
        return this.http.post(`/system/channels`, data);
    }
}
exports.BadgesApi = BadgesApi;
//# sourceMappingURL=index.js.map