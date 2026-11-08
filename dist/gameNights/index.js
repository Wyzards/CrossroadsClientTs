"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameNightsApi = void 0;
const error_js_1 = require("../error.js");
class GameNightsApi {
    constructor(http) {
        this.http = http;
    }
    /** Filter by status and/or by a Discord user who attended. */
    list(filter = {}) {
        const params = {};
        if (filter.status)
            params.status = filter.status;
        if (filter.discordId)
            params.discord_id = filter.discordId;
        return this.http.get(`/game-nights`, { params });
    }
    /** The running game night, or null. */
    async active() {
        try {
            return await this.http.get(`/game-nights/active`);
        }
        catch (err) {
            if (err instanceof error_js_1.NotFoundError)
                return null;
            throw err;
        }
    }
    get(id) {
        return this.http.get(`/game-nights/${id}`);
    }
    /** Throws (409) if one is already active. */
    create(payload) {
        return this.http.post(`/game-nights`, payload);
    }
    end(id) {
        return this.http.put(`/game-nights/${id}`, { status: "ended" });
    }
    cancel(id) {
        return this.http.put(`/game-nights/${id}`, { status: "cancelled" });
    }
    /** Idempotent: re-adding someone keeps their first join time. */
    addAttendees(id, discordIds) {
        return this.http.post(`/game-nights/${id}/attendees`, { discord_ids: discordIds });
    }
    markRsvps(id, discordIds) {
        return this.http.post(`/game-nights/${id}/rsvps`, { discord_ids: discordIds });
    }
}
exports.GameNightsApi = GameNightsApi;
//# sourceMappingURL=index.js.map