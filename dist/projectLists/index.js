"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectListsApi = void 0;
class ProjectListsApi {
    constructor(http) {
        this.http = http;
    }
    list() {
        return this.http.get("/project-lists");
    }
    getById(id) {
        return this.http.get(`/project-lists/${id}`);
    }
    create(payload) {
        return this.http.post("/project-lists", payload);
    }
    update(id, payload) {
        return this.http.put(`/project-lists/${id}`, payload);
    }
    delete(id) {
        return this.http.delete(`/project-lists/${id}`);
    }
}
exports.ProjectListsApi = ProjectListsApi;
//# sourceMappingURL=index.js.map