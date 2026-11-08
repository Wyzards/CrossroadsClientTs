"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsApi = void 0;
const form_data_1 = __importDefault(require("form-data"));
const error_js_1 = require("../error.js");
/**
 * Project applications. Editing is allowed while draft or submitted; submit/accept/reject answer
 * 409 when the state or revision is stale and 422 when content is incomplete or a route isn't allowed.
 */
class ApplicationsApi {
    constructor(http) {
        this.http = http;
    }
    list(filter = {}) {
        const params = {};
        if (filter.applicant)
            params.applicant = filter.applicant;
        if (filter.status)
            params.status = filter.status.join(",");
        if (filter.thread_id)
            params.thread_id = filter.thread_id;
        if (filter.review_thread_id)
            params.review_thread_id = filter.review_thread_id;
        return this.http.get("/applications", { params });
    }
    async get(id) {
        try {
            return await this.http.get(`/applications/${id}`);
        }
        catch (err) {
            if (err instanceof error_js_1.NotFoundError)
                return null;
            throw err;
        }
    }
    create(applicantDiscordId, relationship) {
        return this.http.post("/applications", { applicant_discord_id: applicantDiscordId, relationship });
    }
    /** Discord bookkeeping (thread, card message, review thread). */
    update(id, payload) {
        return this.http.put(`/applications/${id}`, payload);
    }
    setWorking(id, working) {
        return this.http.put(`/applications/${id}/working`, { working });
    }
    /** One image or video (10 MB). Reference the returned id from sections or banner_file_id. */
    addFile(id, file, name, contentType) {
        const form = new form_data_1.default();
        form.append("file", file, { filename: name, contentType });
        return this.http.post(`/applications/${id}/files`, form, { headers: form.getHeaders(), maxBodyLength: Infinity });
    }
    files(id, ids) {
        const params = ids && ids.length ? { ids: ids.join(",") } : {};
        return this.http.get(`/applications/${id}/files`, { params })
            .then(files => files.map(f => ({ id: f.id, name: f.name, data: Buffer.from(f.data, "base64") })));
    }
    submit(id) {
        return this.http.post(`/applications/${id}/submit`, {});
    }
    withdraw(id) {
        return this.http.post(`/applications/${id}/withdraw`, {});
    }
    accept(id, revision, route, reviewerDiscordId) {
        return this.http.post(`/applications/${id}/accept`, { revision, route, reviewer_discord_id: reviewerDiscordId });
    }
    reject(id, revision, reason, allowResubmit, reviewerDiscordId) {
        return this.http.post(`/applications/${id}/reject`, { revision, reason, allow_resubmit: allowResubmit, reviewer_discord_id: reviewerDiscordId });
    }
}
exports.ApplicationsApi = ApplicationsApi;
//# sourceMappingURL=index.js.map