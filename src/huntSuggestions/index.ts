import { HttpClient } from "../httpClient.js";
import { ProjectWithRelations } from "../projects/types.js";

export type SuggestionTier = "basic" | "standard" | "detailed";

export interface ApproveSuggestionPayload {
    thread_id: string;
    suggester_discord_id: string;
    tier: SuggestionTier;
    display_name: string;
    ip?: string | null;
    discord_invite?: string | null;
    /** Section 1 of the listing, up to 2000 characters. */
    text?: string | null;
    reviewer_discord_id: string;
}

export class HuntSuggestionsApi {
    constructor(private http: HttpClient) { }

    /**
     * Creates the hidden, public, released server project in the Hunt queue (one transaction).
     * 409 (ApiError.data.message) when the post was already approved or a project with the same slug exists.
     */
    approve(payload: ApproveSuggestionPayload): Promise<ProjectWithRelations> {
        return this.http.post<ProjectWithRelations>("/hunt-suggestions", payload);
    }
}
