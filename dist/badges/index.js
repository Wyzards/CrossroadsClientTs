"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgesApi = void 0;
const error_js_1 = require("../error.js");
class BadgesApi {
    constructor(http) {
        this.http = http;
    }
    // ========================
    // Profile
    // ========================
    async getProfile(userId) {
        try {
            return await this.http.get(`/crossroads-users/${userId}/profile`);
        }
        catch (err) {
            if (err instanceof error_js_1.NotFoundError)
                return null;
            throw err;
        }
    }
    // ========================
    // Badges
    // ========================
    getBadges() {
        return this.http.get(`/badges`);
    }
    createBadge(data) {
        return this.http.post(`/badges`, data);
    }
    updateBadge(id, data) {
        return this.http.put(`/badges/${id}`, data);
    }
    // ========================
    // User Badges
    // ========================
    assignBadge(userId, badgeId) {
        return this.http.post(`/crossroads-users/${userId}/badges/${badgeId}`, {});
    }
    removeBadge(userId, badgeId) {
        return this.http.delete(`/crossroads-users/${userId}/badges/${badgeId}`);
    }
    // ========================
    // XP
    // ========================
    triggerXpEvent(userId, eventId) {
        return this.http.post(`/xp-events/trigger`, {
            user_id: userId,
            xp_event_definition_id: eventId
        });
    }
    // ----------------------------
    // XP EVENT DEFINITIONS
    // ----------------------------
    getXpEventDefinitions() {
        return this.http.get(`/xp-event-definitions`);
    }
    createXpEventDefinition(data) {
        return this.http.post(`/xp-event-definitions`, data);
    }
    updateXpEventDefinition(id, data) {
        return this.http.put(`/xp-event-definitions/${id}`, data);
    }
    deleteXpEventDefinition(id) {
        return this.http.delete(`/xp-event-definitions/${id}`);
    }
    // ========================
    // Eras
    // ========================
    getEras() {
        return this.http.get(`/eras`);
    }
    createEra(data) {
        return this.http.post(`/eras`, data);
    }
    updateEra(id, data) {
        return this.http.put(`/eras/${id}`, data);
    }
    activateEra(id) {
        return this.http.post(`/eras/${id}/activate`, {});
    }
    // ========================
    // System Channels
    // ========================
    getSystemChannels() {
        return this.http.get(`/system/channels`);
    }
    setSystemChannels(data) {
        return this.http.post(`/system/channels`, data);
    }
}
exports.BadgesApi = BadgesApi;
//# sourceMappingURL=index.js.map