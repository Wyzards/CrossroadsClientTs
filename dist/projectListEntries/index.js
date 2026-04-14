"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectListEntriesApi = void 0;
class ProjectListEntriesApi {
    constructor(http) {
        this.http = http;
    }
    getForList(listId) {
        return this.http.get(`/project-list-entries/list/${listId}`);
    }
    sync(payload) {
        return this.http.post("/project-list-entries/sync", payload);
    }
}
exports.ProjectListEntriesApi = ProjectListEntriesApi;
//# sourceMappingURL=index.js.map