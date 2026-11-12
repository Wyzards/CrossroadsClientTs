import { HttpClient } from "../httpClient.js";

/** An open problem with a listed project's Discord invite link (exists only while the problem does). */
export interface InviteCheck {
    id: number;
    project_id: number;
    url: string;
    status: "bad" | "warning";
    reason: string;
    first_seen_at: string;
}

export class InviteChecksApi {
    constructor(private http: HttpClient) { }

    list(): Promise<InviteCheck[]> {
        return this.http.get<InviteCheck[]>("/invite-checks");
    }

    /** Records a problem; first_seen_at is kept if it already exists. */
    record(payload: { project_id: number, url: string, status: "bad" | "warning", reason: string }): Promise<InviteCheck> {
        return this.http.post<InviteCheck>("/invite-checks", payload);
    }

    clear(id: number): Promise<void> {
        return this.http.delete(`/invite-checks/${id}`);
    }
}
