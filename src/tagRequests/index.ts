import { HttpClient } from "../httpClient.js";

export interface TagRequest {
    id: number;
    application_id: number | null;
    name: string;
    requested_by_discord_id: string;
    status: "pending" | "approved" | "rejected";
    decided_by_discord_id: string | null;
    tag_id: number | null;
    message_id: string | null;
}

/** Requests for tags missing from the curated list. Approving creates the tag and adds it to the application. */
export class TagRequestsApi {
    constructor(private http: HttpClient) { }

    create(payload: { application_id: number | null, name: string, requested_by_discord_id: string }): Promise<TagRequest> {
        return this.http.post<TagRequest>("/tag-requests", payload);
    }

    get(id: number): Promise<TagRequest> {
        return this.http.get<TagRequest>(`/tag-requests/${id}`);
    }

    setMessage(id: number, messageId: string): Promise<TagRequest> {
        return this.http.put<TagRequest>(`/tag-requests/${id}`, { message_id: messageId });
    }

    /** 409 when already decided. */
    decide(id: number, approve: boolean, decidedBy: string): Promise<TagRequest> {
        return this.http.post<TagRequest>(`/tag-requests/${id}/decide`, { approve, decided_by_discord_id: decidedBy });
    }
}
