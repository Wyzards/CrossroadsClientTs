"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementConnectionsApi = void 0;
class AnnouncementConnectionsApi {
    constructor(http) {
        this.http = http;
    }
    /** Newest first. */
    list(filter = {}) {
        const params = {};
        if (filter.guild_id)
            params.guild_id = filter.guild_id;
        if (filter.application_id)
            params.application_id = String(filter.application_id);
        if (filter.project_id)
            params.project_id = String(filter.project_id);
        if (filter.status)
            params.status = filter.status.join(",");
        return this.http.get("/announcement-connections", { params });
    }
    /** Cancels any open attempt for the same application/project. */
    start(payload) {
        return this.http.post("/announcement-connections", payload);
    }
    update(id, payload) {
        return this.http.put(`/announcement-connections/${id}`, payload);
    }
}
exports.AnnouncementConnectionsApi = AnnouncementConnectionsApi;
//# sourceMappingURL=index.js.map