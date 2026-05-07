"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XpApi = void 0;
const error_js_1 = require("../error.js");
class XpApi {
    constructor(http) {
        this.http = http;
    }
    triggerXpEvent(userId, eventId) {
        return this.http.post(`/xp-events/trigger`, {
            user_id: userId,
            xp_event_definition_id: eventId
        });
    }
    getXpEventDefinitions() {
        return this.http.get(`/xp-event-definitions`);
    }
    async getXpEventDefinition(id) {
        try {
            return await this.http.get(`/xp-event-definitions/${id}`);
        }
        catch (err) {
            if (err instanceof error_js_1.NotFoundError)
                return null;
            throw err;
        }
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
}
exports.XpApi = XpApi;
//# sourceMappingURL=index.js.map