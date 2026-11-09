import { CrossroadsUser } from "../users/types.js";
export interface Project {
    id: number;
    channel_id?: string;
    guild_id?: string;
    emoji?: string;
    name: string;
    display_name?: string;
    architect_approval: ArchitectApproval;
    community_vetted: CommunityVetted;
    project_stage: ProjectStage;
    accessibility: Accessibility;
    tier: ProjectTier;
    format: ProjectFormat;
    ip?: string;
    /** Maps: where to download it. */
    download_url?: string | null;
    join_method?: JoinMethod | null;
    network_name?: string | null;
    join_instructions?: string | null;
    discord_kind?: DiscordKind | null;
    discord_invite?: string | null;
    has_dedicated_announcements?: boolean | null;
    banner_attachment_id?: number | null;
    role_id?: string;
    version?: string;
    discovery_thread_id?: string;
}
export interface ProjectWithRelations extends Project {
    links: ProjectLink[];
    /** Every file: the banner and all sections' files. */
    attachments: ProjectAttachment[];
    staff: ProjectStaff[];
    /** The description, in position order. */
    sections: ProjectSection[];
    /** Primary tags (pivot.position 1-3) first in order, then secondary tags. */
    tags: ProjectTag[];
    banner: ProjectAttachment | null;
}
/** One part of a description: up to 2000 characters of text plus up to 10 files. */
export interface ProjectSection {
    id: number;
    position: number;
    text: string | null;
    attachments: ProjectAttachment[];
}
/** A gameplay tag. Featured tags are the forum tag set. */
export interface Tag {
    id: number;
    name: string;
    featured: boolean;
    projects_count?: number;
}
export interface ProjectTag extends Tag {
    pivot: {
        position: number | null;
    };
}
/** A downloaded attachment. */
export interface ProjectFile {
    id: number;
    name: string;
    data: Buffer;
}
export interface CreateProjectPayload {
    name: string;
    channel_id?: string;
    guild_id?: string;
    emoji?: string;
    display_name?: string;
    architect_approval?: ArchitectApproval;
    community_vetted?: CommunityVetted;
    project_stage?: ProjectStage;
    accessibility?: Accessibility;
    tier?: ProjectTier;
    format?: ProjectFormat;
    ip?: string;
    /** Maps: where to download it. */
    download_url?: string | null;
    join_method?: JoinMethod | null;
    network_name?: string | null;
    join_instructions?: string | null;
    discord_kind?: DiscordKind | null;
    discord_invite?: string | null;
    has_dedicated_announcements?: boolean | null;
    role_id?: string;
    version?: string;
    discovery_thread_id?: string;
}
export interface UpdateProjectPayload {
    channel_id?: string;
    guild_id?: string;
    emoji?: string;
    name?: string;
    display_name?: string;
    architect_approval?: ArchitectApproval;
    community_vetted?: CommunityVetted;
    project_stage?: ProjectStage;
    accessibility?: Accessibility;
    tier?: ProjectTier;
    format?: ProjectFormat;
    ip?: string;
    /** Maps: where to download it. */
    download_url?: string | null;
    join_method?: JoinMethod | null;
    network_name?: string | null;
    join_instructions?: string | null;
    discord_kind?: DiscordKind | null;
    discord_invite?: string | null;
    has_dedicated_announcements?: boolean | null;
    role_id?: string;
    version?: string;
    discovery_thread_id?: string;
}
export interface ProjectStaff {
    id: number;
    user: CrossroadsUser;
    rank: ProjectStaffRank;
}
export declare enum ProjectStaffRank {
    LEAD = "lead",
    STAFF = "staff"
}
export declare class ProjectStaffRankHelper {
    static pretty(rank: ProjectStaffRank): string;
    static values(): ProjectStaffRank[];
}
export interface ProjectAttachment {
    id: number;
    path: string;
    /** Null for the banner. */
    section_id: number | null;
}
export interface ProjectLink {
    id: number;
    url: string;
    label: string;
}
/** What kind of thing a project is. Maps get no channel and list in the maps forum. (Replaced `type`; gameplay is now tags.) */
export declare enum ProjectFormat {
    SERVER = "server",
    MAP = "map"
}
export declare const ProjectFormatLabels: Record<ProjectFormat, string>;
export declare const ProjectFormatHelper: {
    values: () => string[];
    pretty: (value: ProjectFormat) => string;
};
/** How players get in: the project's own address (ip), or a network hub (ip) plus join_instructions. */
export declare enum JoinMethod {
    DIRECT = "direct",
    NETWORK = "network"
}
export declare const JoinMethodLabels: Record<JoinMethod, string>;
export declare const JoinMethodHelper: {
    values: () => string[];
    pretty: (value: JoinMethod) => string;
};
/** Where the project's community lives on Discord. */
export declare enum DiscordKind {
    OWN = "own",
    NETWORK = "network",
    NONE = "none"
}
export declare const DiscordKindLabels: Record<DiscordKind, string>;
export declare const DiscordKindHelper: {
    values: () => string[];
    pretty: (value: DiscordKind) => string;
};
export declare enum ProjectStage {
    RELEASED = "released",
    IN_DEVELOPMENT = "in_development",
    ALPHA = "alpha",
    BETA = "beta",
    CLOSED = "closed"
}
export declare const ProjectStageLabels: Record<ProjectStage, string>;
export declare const ProjectStageHelper: {
    values: () => string[];
    pretty: (value: ProjectStage) => string;
};
export declare enum CommunityVetted {
    ACCEPTED = "accepted",
    REJECTED = "rejected",
    UNVETTED = "unvetted",
    SKIPPED = "skipped",
    PROJECT_HUNT_QUEUE = "project_hunt_queue",
    VETTING_QUEUE = "vetting_queue",
    CURRENTLY_VETTING = "currently_vetting"
}
export declare const CommunityVettedLabels: Record<CommunityVetted, string>;
export declare const CommunityVettedHelper: {
    values: () => string[];
    pretty: (value: CommunityVetted) => string;
};
export declare enum ArchitectApproval {
    APPROVED = "approved",
    UNAPPROVED = "unapproved",
    DISQUALIFIED = "disqualified",
    HIDDEN = "hidden"
}
export declare const ArchitectApprovalLabels: Record<ArchitectApproval, string>;
export declare const ArchitectApprovalHelper: {
    values: () => string[];
    pretty: (value: ArchitectApproval) => string;
};
export declare enum Accessibility {
    PUBLIC = "public",
    PAID = "paid",
    EXCLUSIVE = "exclusive",
    CLOSED = "closed"
}
export declare const AccessibilityLabels: Record<Accessibility, string>;
export declare const AccessibilityHelper: {
    values: () => string[];
    pretty: (value: Accessibility) => string;
};
/** Featured level of a listed project; shown as an emoji in its channel name (see the bot's ProjectMessageBuilder). */
export declare enum ProjectTier {
    NORMAL = "normal",
    STAR = "star",
    FLAME = "flame"
}
export declare const ProjectTierLabels: Record<ProjectTier, string>;
export declare const ProjectTierHelper: {
    values: () => string[];
    pretty: (value: ProjectTier) => string;
};
export declare function createEnumHelper<T extends Record<string, string>>(enumObj: T, labels: Record<T[keyof T], string>): {
    values: () => string[];
    pretty: (value: T[keyof T]) => Record<T[keyof T], string>[T[keyof T]];
};
//# sourceMappingURL=types.d.ts.map