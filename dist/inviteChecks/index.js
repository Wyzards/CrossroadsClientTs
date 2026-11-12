"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteChecksApi = void 0;
class InviteChecksApi {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get("/invite-checks");
    }
    /** Records a problem; first_seen_at is kept if it already exists. */
    record(payload) {
        return this.http.post("/invite-checks", payload);
    }
    clear(id) {
        return this.http.delete(`/invite-checks/${id}`);
    }
}
exports.InviteChecksApi = InviteChecksApi;
//# sourceMappingURL=index.js.map