import { Accessibility, DiscordKind, JoinMethod, ProjectFormat, ProjectStage, ProjectStaffRank, ProjectWithRelations } from "../projects/types.js";

export enum ApplicationStatus {
    DRAFT = "draft",
    SUBMITTED = "submitted",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    WITHDRAWN = "withdrawn",
}

export type ApplicationRelationship = "owner" | "staff";
export type AcceptRoute = "watchlist" | "vetting" | "hunt";
export type ReviewDecision = "accept_watchlist" | "accept_vetting" | "accept_hunt" | "reject_resubmit" | "reject_final";

/** The listing an applicant is building. Field names match the project's; accepting is a copy. */
export interface ApplicationContent {
    name: string | null;
    format: ProjectFormat | null;
    project_stage: ProjectStage | null;
    accessibility: Accessibility | null;
    /** The address players type: the server's own (direct) or the hub's (network). */
    ip: string | null;
    version: string | null;
    join_method: JoinMethod | null;
    network_name: string | null;
    join_instructions: string | null;
    discord_kind: DiscordKind | null;
    discord_invite: string | null;
    guild_id: string | null;
    discord_server_name: string | null;
    discord_member_count: number | null;
    has_dedicated_announcements: boolean | null;
    /** At most 10; each text <= 2000 chars, <= 10 files. */
    sections: { text: string | null, file_ids: number[] }[];
    banner_file_id: number | null;
    links: { label: string, url: string }[];
    staff: { discord_id: string, rank: ProjectStaffRank }[];
    tags: { primary: string[], secondary: string[] };
    english: boolean | null;
}

export interface ApplicationFile {
    id: number;
    name: string;
    content_type: string | null;
}

export interface ApplicationReview {
    id: number;
    revision: number;
    decision: ReviewDecision;
    reason: string | null;
    reviewer_discord_id: string;
    created_at: string;
}

export interface Application {
    id: number;
    applicant_discord_id: string;
    status: ApplicationStatus;
    relationship: ApplicationRelationship;
    working: ApplicationContent;
    /** What reviewers see: the last submitted copy. */
    snapshot: ApplicationContent | null;
    /** Bumps on every submit; decisions must name the revision they saw. */
    revision: number;
    submitted_at: string | null;
    thread_id: string | null;
    card_message_id: string | null;
    review_thread_id: string | null;
    project_id: number | null;
    created_at: string;
    updated_at: string;
}

export interface ApplicationFlags {
    /** Same server or name as a listed project: submitting is blocked. */
    listed_project: { id: number, name: string, display_name: string | null } | null;
    /** Same server or name as an unlisted project: accepting updates it. */
    unlisted_project: { id: number, name: string, display_name: string | null } | null;
    prior_rejections: { application_id: number, revision: number, decision: ReviewDecision, reason: string | null, created_at: string }[];
}

export interface ApplicationDetail extends Application {
    files: ApplicationFile[];
    reviews: ApplicationReview[];
    /** What still blocks submitting (empty = complete). */
    missing: string[];
    flags: ApplicationFlags;
    allowed_routes: AcceptRoute[];
}

export interface AcceptResult {
    application: Application & { reviews: ApplicationReview[] };
    project: ProjectWithRelations;
    notes: string[];
}

export interface ApplicationFileData {
    id: number;
    name: string;
    data: Buffer;
}
