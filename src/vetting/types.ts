export type VettingStepName = "choose" | "hunt_cleanup" | "close" | "poll_close" | "start" | "event" | "announce" | "gn_start" | "gn_end";
export type VettingStepStatus = "running" | "done" | "skipped" | "failed";

export interface Lease {
    token: string;
    expires_at: string;
}

export interface LeaseHolder {
    holder: string | null;
    expires_at: string | null;
}

export interface VettingSettings {
    enabled: boolean;
    enabled_at: string | null;
    ping_vetting_role_id: string | null;
    ping_polls_role_id: string | null;
    ping_gamenight_role_id: string | null;
    ping_new_projects_role_id: string | null;
    ping_new_archive_role_id: string | null;
    /** Who holds the lease and until when (never the token); null when free. */
    lease: LeaseHolder | null;
}

export type VettingSettingsUpdate = Partial<Pick<VettingSettings,
    "enabled" | "ping_vetting_role_id" | "ping_polls_role_id" | "ping_gamenight_role_id" | "ping_new_projects_role_id" | "ping_new_archive_role_id">>;

export interface VettingStep {
    id: number;
    cycle_id: number;
    step: VettingStepName;
    status: VettingStepStatus;
    attempts: number;
    note: string | null;
    next_attempt_at: string | null;
    started_at: string | null;
    finished_at: string | null;
}

export type ChosenBy = "oldest" | "only" | "poll" | "none";

export interface VotesRecord {
    up: string[];
    down: string[];
    both: string[];
}

/** One option of the Thursday poll. answer_id is the poll answer's id (assigned 1..n in order). */
export interface PollCandidate {
    project_id: number;
    source: "queue" | "hunt";
    /** When it started waiting: the vetting queue, or the Hunt queue for source hunt. */
    waiting_since: string | null;
    answer_id: number | null;
}

export interface PollResult {
    project_id: number;
    votes: number;
    voter_ids: string[];
}

export interface VettingCycle {
    id: number;
    /** ET date (YYYY-MM-DD) of the Friday close. */
    week_of: string;
    chosen_project_id: number | null;
    chosen_by: ChosenBy | null;
    closed_project_id: number | null;
    close_thread_id: string | null;
    close_result: "accepted" | "rejected" | null;
    close_up: number | null;
    close_down: number | null;
    close_both: number | null;
    close_votes: VotesRecord | null;
    closed_at: string | null;
    started_project_id: number | null;
    started_from: string | null;
    started_at: string | null;
    announce_message_id: string | null;
    /** Frozen by choose: the options, in poll order. */
    candidates: PollCandidate[] | null;
    poll_thread_id: string | null;
    poll_message_id: string | null;
    /** Frozen by poll_close. */
    poll_results: PollResult[] | null;
    steps: VettingStep[];
}

/** Fields of a cycle that can be written once (null -> set, same -> no-op, different -> 409). */
export interface CycleWriteOnce {
    chosen_project_id?: number | null;
    chosen_by?: ChosenBy | null;
    announce_message_id?: string | null;
    poll_thread_id?: string | null;
    poll_message_id?: string | null;
    candidates?: PollCandidate[] | null;
    poll_results?: PollResult[] | null;
}

/** Where a project starts vetting from: the vetting queue, or (approving it) the Hunt queue. */
export type StartFrom = "vetting_queue" | "project_hunt_queue";

export interface CloseCyclePayload {
    project_id: number;
    thread_id: string;
    result: "accepted" | "rejected";
    up: number;
    down: number;
    both: number;
    votes: VotesRecord;
}

export interface CurrentVettingProject {
    id: number;
    name: string;
    display_name: string | null;
    vetting_thread_id: string | null;
    community_vetted_at: string | null;
}

/** A hypothetical project for ProjectListsApi.match: start from a real one and override attributes, or give them all. */
export interface MatchProjectPayload {
    project_id?: number;
    architect_approval?: string;
    community_vetted?: string;
    accessibility?: string;
    project_stage?: string;
    tags?: string[];
}
