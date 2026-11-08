import FormData from "form-data";
import { NotFoundError } from "../error.js";
import { HttpClient } from "../httpClient.js";
import {
    AcceptResult, AcceptRoute, Application, ApplicationContent, ApplicationDetail, ApplicationFile,
    ApplicationFileData, ApplicationRelationship, ApplicationStatus
} from "./types.js";

/**
 * Project applications. Editing is allowed while draft or submitted; submit/accept/reject answer
 * 409 when the state or revision is stale and 422 when content is incomplete or a route isn't allowed.
 */
export class ApplicationsApi {
    constructor(private http: HttpClient) { }

    list(filter: { applicant?: string, status?: ApplicationStatus[], thread_id?: string, review_thread_id?: string } = {}): Promise<Application[]> {
        const params: Record<string, string> = {};
        if (filter.applicant) params.applicant = filter.applicant;
        if (filter.status) params.status = filter.status.join(",");
        if (filter.thread_id) params.thread_id = filter.thread_id;
        if (filter.review_thread_id) params.review_thread_id = filter.review_thread_id;
        return this.http.get<Application[]>("/applications", { params });
    }

    async get(id: number): Promise<ApplicationDetail | null> {
        try {
            return await this.http.get<ApplicationDetail>(`/applications/${id}`);
        } catch (err) {
            if (err instanceof NotFoundError) return null;
            throw err;
        }
    }

    create(applicantDiscordId: string, relationship: ApplicationRelationship): Promise<ApplicationDetail> {
        return this.http.post<ApplicationDetail>("/applications", { applicant_discord_id: applicantDiscordId, relationship });
    }

    /** Discord bookkeeping (thread, card message, review thread). */
    update(id: number, payload: { thread_id?: string | null, card_message_id?: string | null, review_thread_id?: string | null }): Promise<ApplicationDetail> {
        return this.http.put<ApplicationDetail>(`/applications/${id}`, payload);
    }

    setWorking(id: number, working: ApplicationContent): Promise<ApplicationDetail> {
        return this.http.put<ApplicationDetail>(`/applications/${id}/working`, { working });
    }

    /** One image or video (10 MB). Reference the returned id from sections or banner_file_id. */
    addFile(id: number, file: Buffer, name: string, contentType: string): Promise<ApplicationFile> {
        const form = new FormData();
        form.append("file", file, { filename: name, contentType });
        return this.http.post<ApplicationFile>(`/applications/${id}/files`, form,
            { headers: form.getHeaders(), maxBodyLength: Infinity });
    }

    files(id: number, ids?: number[]): Promise<ApplicationFileData[]> {
        const params = ids && ids.length ? { ids: ids.join(",") } : {};
        return this.http.get<{ id: number, name: string, data: string }[]>(`/applications/${id}/files`, { params })
            .then(files => files.map(f => ({ id: f.id, name: f.name, data: Buffer.from(f.data, "base64") })));
    }

    submit(id: number): Promise<ApplicationDetail> {
        return this.http.post<ApplicationDetail>(`/applications/${id}/submit`, {});
    }

    withdraw(id: number): Promise<ApplicationDetail> {
        return this.http.post<ApplicationDetail>(`/applications/${id}/withdraw`, {});
    }

    accept(id: number, revision: number, route: AcceptRoute, reviewerDiscordId: string): Promise<AcceptResult> {
        return this.http.post<AcceptResult>(`/applications/${id}/accept`, { revision, route, reviewer_discord_id: reviewerDiscordId });
    }

    reject(id: number, revision: number, reason: string, allowResubmit: boolean, reviewerDiscordId: string): Promise<ApplicationDetail> {
        return this.http.post<ApplicationDetail>(`/applications/${id}/reject`,
            { revision, reason, allow_resubmit: allowResubmit, reviewer_discord_id: reviewerDiscordId });
    }
}
