"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagRequestsApi = void 0;
/** Requests for tags missing from the curated list. Approving creates the tag and adds it to the application. */
class TagRequestsApi {
    constructor(http) {
        this.http = http;
    }
    create(payload) {
        return this.http.post("/tag-requests", payload);
    }
    get(id) {
        return this.http.get(`/tag-requests/${id}`);
    }
    setMessage(id, messageId) {
        return this.http.put(`/tag-requests/${id}`, { message_id: messageId });
    }
    /** 409 when already decided. */
    decide(id, approve, decidedBy) {
        return this.http.post(`/tag-requests/${id}/decide`, { approve, decided_by_discord_id: decidedBy });
    }
}
exports.TagRequestsApi = TagRequestsApi;
//# sourceMappingURL=index.js.map