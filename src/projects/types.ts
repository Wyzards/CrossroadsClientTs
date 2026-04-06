import { CrossroadsUser } from "../users/types.js";

export interface Project {
    id: number;
    channel_id?: string;
    guild_id?: string;
    emoji?: string;
    name: string;
    display_name?: string;
    architect_approval: string;
    community_vetted: string;
    project_stage: string;
    accessibility: string;
    description?: string;
    ip?: string;
    role_id?: string;
    type?: string;
    version?: string;
    discovery_thread_id?: string;
}

export interface CreateProjectPayload {
    name: string;
    // whatever other required fields for creation
    channel_id?: string;
    guild_id?: string;
    emoji?: string;
    display_name?: string;
    architect_approval?: string;
    community_vetted?: string;
    project_stage?: string;
    accessibility?: string;
    description?: string;
    ip?: string;
    role_id?: string;
    type?: string;
    version?: string;
    discovery_thread_id?: string;
}

export interface UpdateProjectPayload {
    channel_id?: string;
    guild_id?: string;
    emoji?: string;
    name?: string; // optional here, Laravel will validate if present
    display_name?: string;
    architect_approval?: string;
    community_vetted?: string;
    project_stage?: string;
    accessibility?: string;
    description?: string;
    ip?: string;
    role_id?: string;
    type?: string;
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
    YES = 'yes',
    NO = 'no',
    DISQUALIFIED = 'disqualified'
}

export const ArchitectApprovalLabels: Record<ArchitectApproval, string> = {
    [ArchitectApproval.YES]: "Approved",
    [ArchitectApproval.NO]: "Unapproved",
    [ArchitectApproval.DISQUALIFIED]: "Disqualified",
}

export enum Accessibility {
    PUBLIC = 'public',
    PAID = 'paid',
    EXCLUSIVE = 'exclusive',
    CLOSED = 'closed'
}

export function createEnumHelper<T extends Record<string, string>>(
    enumObj: T,
    labels: Record<T[keyof T], string>
) {
    return {
        values: () => Object.values(enumObj),
        pretty: (value: T[keyof T]) => labels[value] ?? value,
    };
}