"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XpApi = void 0;
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
    getXpEventDefinition(id) {
        return this.http.get(`/xp-event-definition/${id}`);
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