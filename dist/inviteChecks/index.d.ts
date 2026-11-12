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
export declare class InviteChecksApi {
    private http;
    constructor(http: HttpClient);
    list(): Promise<InviteCheck[]>;
    /** Records a problem; first_seen_at is kept if it already exists. */
    record(payload: {
        project_id: number;
        url: string;
        status: "bad" | "warning";
        reason: string;
    }): Promise<InviteCheck>;
    clear(id: number): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map