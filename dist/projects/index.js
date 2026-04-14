"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsApi = void 0;
const error_js_1 = require("../error.js");
class ProjectsApi {
    constructor(http) {
        this.http = http;
    }
    // Projects
    list() {
        return this.http.get("/projects");
    }
    search(filter) {
        return this.http.post("/projects/search", { filter });
    }
    create(project) {
        return this.http.post("/projects", project);
    }
    async getById(id) {
        try {
            return await this.http.get(`/projects/${id}`);
        }
        catch (err) {
            if (err instanceof error_js_1.NotFoundError)
                return null;
            throw err;
        }
    }
    async getByName(name) {
        try {
            return await this.http.get(`/projects/by-name/${name}`);
        }
        catch (err) {
            if (err instanceof error_js_1.NotFoundError)
                return null;
            throw err;
        }
    }
    async getByGuild(name) {
        try {
            return await this.http.get(`/projects/by-guild/${name}`);
        }
        catch (err) {
            if (err instanceof error_js_1.NotFoundError)
                return null;
            throw err;
        }
    }
    existsByName(name) {
        return this.http.get(`/projects/exists/by-name/${name}`);
    }
    existsByGuild(guildId) {
        return this.http.get(`/projects/exists/by-guild/${guildId}`);
    }
    update(id, payload) {
        return this.http.put(`/projects/${id}`, payload);
    }
    delete(id) {
        return this.http.delete(`/projects/${id}`);
    }
    // Staff
    listStaff(projectId) {
        return this.http.get(`/projects/${projectId}/staff`);
    }
    setStaff(projectId, crossroadsUserId, rank) {
        return this.http.put(`/projects/${projectId}/staff/${crossroadsUserId}`, { rank });
    }
    removeStaff(projectId, crossroadsUserId) {
        return this.http.delete(`/projects/${projectId}/staff/${crossroadsUserId}`);
    }
    // Attachments
    async setAttachments(projectId, formData) {
        // Just send the FormData to Laravel
        return this.http.post(`/projects/${projectId}/attachments`, formData, {
            headers: formData.getHeaders(),
            maxBodyLength: Infinity, // allow large files
        });
    }
    downloadAllAttachments(projectId) {
        return this.http.get(`/projects/${projectId}/attachments/download`).then(data => data.map(b64 => Buffer.from(b64, "base64")));
    }
    removeAttachment(projectId, attachmentId) {
        return this.http.delete(`/projects/${projectId}/attachments/${attachmentId}`);
    }
    // Links
    listLinks(projectId) {
        return this.http.get(`/projects/${projectId}/links`);
    }
    addLink(projectId, link) {
        return this.http.post(`/projects/${projectId}/links`, link);
    }
    removeLink(projectId, linkId) {
        return this.http.delete(`/projects/${projectId}/links/${linkId}`);
    }
}
exports.ProjectsApi = ProjectsApi;
//# sourceMappingURL=index.js.map