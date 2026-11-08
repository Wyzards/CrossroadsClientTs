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
export declare class TagRequestsApi {
    private http;
    constructor(http: HttpClient);
    create(payload: {
        application_id: number | null;
        name: string;
        requested_by_discord_id: string;
    }): Promise<TagRequest>;
    get(id: number): Promise<TagRequest>;
    setMessage(id: number, messageId: string): Promise<TagRequest>;
    /** 409 when already decided. */
    decide(id: number, approve: boolean, decidedBy: string): Promise<TagRequest>;
}
//# sourceMappingURL=index.d.ts.map