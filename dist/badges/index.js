"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgesApi = void 0;
const error_js_1 = require("../error.js");
class BadgesApi {
    constructor(http) {
        this.http = http;
    }
    getBadges() {
        return this.http.get(`/badges`);
    }
    async getBadge(id) {
        try {
            return await this.http.get(`/badges/${id}`);
        }
        catch (err) {
            if (err instanceof error_js_1.NotFoundError)
                return null;
            throw err;
        }
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
    getBadgeProgression(badgeId) {
        return this.http.get(`/badges/${badgeId}/progression`);
    }
    updateBadgeProgression(badgeId, data) {
        return this.http.put(`/badges/${badgeId}/progression`, data);
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