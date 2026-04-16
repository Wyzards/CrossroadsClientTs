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
    // whatever other required fields for creation
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
    name?: string; // optional here, Laravel will validate if present
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
}

export interface ProjectLink {
    id: number;
    url: string;
    label: string;
}

export enum ProjectType {
    MMO = "mmo",
    SMP = "smp",
    MAP = "map",
    RPG = "rpg",
    OTHER = "other"
}

export const ProjectTypeLabels: Record<ProjectType, string> = {
    [ProjectType.MMO]: "MMO",
    [ProjectType.SMP]: "SMP",
    [ProjectType.MAP]: "Map",
    [ProjectType.RPG]: "RPG",
    [ProjectType.OTHER]: "Other"
}

export const ProjectTypeHelper = createEnumHelper(ProjectType, ProjectTypeLabels);

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
}

export const CommunityVettedLabels: Record<CommunityVetted, string> = {
    [CommunityVetted.ACCEPTED]: "Passed",
    [CommunityVetted.REJECTED]: "Rejected",
    [CommunityVetted.UNVETTED]: "Unvetted",
    [CommunityVetted.SKIPPED]: "Skipped",
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

export function createEnumHelper<T extends Record<string, string>>(
    enumObj: T,
    labels: Record<T[keyof T], string>
) {
    return {
        values: () => Object.values(enumObj),
        pretty: (value: T[keyof T]) => labels[value] ?? value,
    };
}