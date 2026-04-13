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
    type: ProjectType;
    description?: string;
    ip?: string;
    role_id?: string;
    version?: string;
    discovery_thread_id?: string;
}
export interface ProjectWithRelations extends Project {
    links: ProjectLink[];
    attachments: ProjectAttachment[];
    staff: ProjectStaff[];
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
    type?: ProjectType;
    description?: string;
    ip?: string;
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
    description?: string;
    ip?: string;
    role_id?: string;
    type?: ProjectType;
    version?: string;
    discovery_thread_id?: string;
}
export interface ProjectListEntryWithProject extends ProjectListEntry {
    project: Project;
}
export interface ProjectListWithEntries extends ProjectList {
    entries: ProjectListEntryWithProject[];
}
export interface ProjectList {
    id: number;
    name: string;
    channel_id: string;
    filters: ProjectFilter;
    is_active: boolean;
    created_at: string | Date;
    updated_at: string | Date;
}
export interface ProjectListEntry {
    id: number;
    project_list_id: number;
    project_id: number;
    thread_channel_id: string;
    created_at: string | Date;
    updated_at: string | Date;
}
export type ProjectFilter = {
    all: ProjectFilter[];
} | {
    any: ProjectFilter[];
} | {
    field: ProjectFilterField;
    operator: ProjectFilterOperator;
    value: ProjectFilterValue;
};
export type ProjectFilterValue = ArchitectApproval | CommunityVetted | ProjectStage | Accessibility | ProjectType | string;
export type ProjectFilterField = "architect_approval" | "community_vetted" | "project_stage" | "accessibility" | "type";
export type ProjectFilterOperator = "=" | "!=";
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
}
export interface ProjectLink {
    id: number;
    url: string;
    label: string;
}
export interface ProjectList {
}
export declare enum ProjectType {
    MMO = "mmo",
    SMP = "smp",
    MAP = "map",
    RPG = "rpg",
    OTHER = "other"
}
export declare const ProjectTypeLabels: Record<ProjectType, string>;
export declare const ProjectTypeHelper: {
    values: () => string[];
    pretty: (value: ProjectType) => string;
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
    SKIPPED = "skipped"
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
export declare enum Accessibility {
    PUBLIC = "public",
    PAID = "paid",
    EXCLUSIVE = "exclusive",
    CLOSED = "closed"
}
export declare function createEnumHelper<T extends Record<string, string>>(enumObj: T, labels: Record<T[keyof T], string>): {
    values: () => string[];
    pretty: (value: T[keyof T]) => Record<T[keyof T], string>[T[keyof T]];
};
//# sourceMappingURL=types.d.ts.map