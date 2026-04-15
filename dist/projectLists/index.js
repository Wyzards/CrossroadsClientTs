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
    // TODO: Make project use string | null for channel and not optional
    update(id, payload) {
        return this.http.put(`/project-lists/${id}`, payload);
    }
    delete(id) {
        return this.http.delete(`/project-lists/${id}`);
    }
    getTags(listId) {
        return this.http.get(`/project-lists/${listId}/tags`);
    }
    createTag(listId, payload) {
        return this.http.post(`/project-lists/${listId}/tags`, payload);
    }
    updateTag(listId, tagId, payload) {
        return this.http.put(`/project-lists/${listId}/tags/${tagId}`, payload);
    }
    deleteTag(listId, tagId) {
        return this.http.delete(`/project-lists/${listId}/tags/${tagId}`);
    }
    evaluateTags(listId, projectId) {
        return this.http.get(`/project-lists/${listId}/evaluate-tags/${projectId}`);
    }
    evaluateTagsBulk(listId, payload) {
        return this.http.post(`/project-lists/${listId}/evaluate-tags-bulk`, payload);
    }
}
exports.ProjectListsApi = ProjectListsApi;
//# sourceMappingURL=index.js.map