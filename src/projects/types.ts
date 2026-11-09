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
    pivot: { position: number | null };
}

/** A downloaded attachment. */
export interface ProjectFile {
    id: number;
    name: string;
    data: Buffer;
}

export interface CreateProjectPayload {
    name: string;
    // whatever other required fields for creation
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
    name?: string; // optional here, Laravel will validate if present
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

export enum ProjectStaffRank {
    LEAD = "lead",
    STAFF = "staff"
}

export class ProjectStaffRankHelper {
    static pretty(rank: ProjectStaffRank): string {
        switch (rank) {
            case ProjectStaffRank.LEAD: return "Lead";
            case ProjectStaffRank.STAFF: return "Staff";
        }
    }

    static values(): ProjectStaffRank[] {
        return [
            ProjectStaffRank.LEAD,
            ProjectStaffRank.STAFF,
        ];
    }
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
export enum ProjectFormat {
    SERVER = "server",
    MAP = "map"
}

export const ProjectFormatLabels: Record<ProjectFormat, string> = {
    [ProjectFormat.SERVER]: "Server",
    [ProjectFormat.MAP]: "Map",
}

export const ProjectFormatHelper = createEnumHelper(ProjectFormat, ProjectFormatLabels);

/** How players get in: the project's own address (ip), or a network hub (ip) plus join_instructions. */
export enum JoinMethod {
    DIRECT = "direct",
    NETWORK = "network"
}

export const JoinMethodLabels: Record<JoinMethod, string> = {
    [JoinMethod.DIRECT]: "Direct",
    [JoinMethod.NETWORK]: "Through a network",
}

export const JoinMethodHelper = createEnumHelper(JoinMethod, JoinMethodLabels);

/** Where the project's community lives on Discord. */
export enum DiscordKind {
    OWN = "own",
    NETWORK = "network",
    NONE = "none"
}

export const DiscordKindLabels: Record<DiscordKind, string> = {
    [DiscordKind.OWN]: "Its own server",
    [DiscordKind.NETWORK]: "A network's shared server",
    [DiscordKind.NONE]: "No Discord",
}

export const DiscordKindHelper = createEnumHelper(DiscordKind, DiscordKindLabels);

export enum ProjectStage {
    RELEASED = "released",
    IN_DEVELOPMENT = "in_development",
    ALPHA = "alpha",
    BETA = "beta",
    CLOSED = "closed"
}

export const ProjectStageLabels: Record<ProjectStage, string> = {
    [ProjectStage.RELEASED]: "Released",
    [ProjectStage.IN_DEVELOPMENT]: "In Development",
    [ProjectStage.ALPHA]: "Alpha",
    [ProjectStage.BETA]: "Beta",
    [ProjectStage.CLOSED]: "Closed"
}

export const ProjectStageHelper = createEnumHelper(ProjectStage, ProjectStageLabels);

export enum CommunityVetted {
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    UNVETTED = 'unvetted',
    SKIPPED = 'skipped',
    PROJECT_HUNT_QUEUE = 'project_hunt_queue',
    VETTING_QUEUE = 'vetting_queue',
    CURRENTLY_VETTING = 'currently_vetting'
}

export const CommunityVettedLabels: Record<CommunityVetted, string> = {
    [CommunityVetted.ACCEPTED]: "Passed",
    [CommunityVetted.REJECTED]: "Rejected",
    [CommunityVetted.UNVETTED]: "Unvetted",
    [CommunityVetted.SKIPPED]: "Skipped",
    [CommunityVetted.PROJECT_HUNT_QUEUE]: "Project Hunt Queue",
    [CommunityVetted.VETTING_QUEUE]: "Community Vetting Queue",
    [CommunityVetted.CURRENTLY_VETTING]: "Currently Vetting"
}

export const CommunityVettedHelper = createEnumHelper(CommunityVetted, CommunityVettedLabels);

export enum ArchitectApproval {
    APPROVED = 'approved',
    UNAPPROVED = 'unapproved',
    DISQUALIFIED = 'disqualified',
    HIDDEN = 'hidden'
}

export const ArchitectApprovalLabels: Record<ArchitectApproval, string> = {
    [ArchitectApproval.APPROVED]: "Approved",
    [ArchitectApproval.UNAPPROVED]: "Unapproved",
    [ArchitectApproval.DISQUALIFIED]: "Disqualified",
    [ArchitectApproval.HIDDEN]: "Hidden",
}

export const ArchitectApprovalHelper = createEnumHelper(ArchitectApproval, ArchitectApprovalLabels);

export enum Accessibility {
    PUBLIC = 'public',
    PAID = 'paid',
    EXCLUSIVE = 'exclusive',
    CLOSED = 'closed'
}

export const AccessibilityLabels: Record<Accessibility, string> = {
    [Accessibility.PUBLIC]: "Public",
    [Accessibility.PAID]: "Paid",
    [Accessibility.EXCLUSIVE]: "Exclusive",
    [Accessibility.CLOSED]: "Closed",
}

export const AccessibilityHelper = createEnumHelper(Accessibility, AccessibilityLabels);

/** Featured level of a listed project; shown as an emoji in its channel name (see the bot's ProjectMessageBuilder). */
export enum ProjectTier {
    NORMAL = 'normal',
    STAR = 'star',
    FLAME = 'flame'
}

export const ProjectTierLabels: Record<ProjectTier, string> = {
    [ProjectTier.NORMAL]: "Normal",
    [ProjectTier.STAR]: "Star",
    [ProjectTier.FLAME]: "Flame",
}

export const ProjectTierHelper = createEnumHelper(ProjectTier, ProjectTierLabels);

export function createEnumHelper<T extends Record<string, string>>(
    enumObj: T,
    labels: Record<T[keyof T], string>
) {
    return {
        values: () => Object.values(enumObj),
        pretty: (value: T[keyof T]) => labels[value] ?? value,
    };
}