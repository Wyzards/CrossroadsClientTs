"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsApi = void 0;
/** The curated gameplay tag list. Featured tags (max 15) are the forum tag set. */
class TagsApi {
    constructor(http) {
        this.http = http;
    }
    /** All tags by name, each with projects_count. */
    list() {
        return this.http.get("/tags");
    }
    create(payload) {
        return this.http.post("/tags", payload);
    }
    update(id, payload) {
        return this.http.put(`/tags/${id}`, payload);
    }
    delete(id) {
        return this.http.delete(`/tags/${id}`);
    }
}
exports.TagsApi = TagsApi;
//# sourceMappingURL=index.js.map