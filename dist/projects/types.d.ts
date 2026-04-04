import { CrossroadsUser } from "../users/types.js";
export interface Project {
    id: number;
    channel_id?: string;
    guild_id?: string;
    emoji?: string;
    name: string;
    display_name?: string;
    status?: string;
    description?: string;
    ip?: string;
    role_id?: string;
    type?: string;
    version?: string;
}
export interface CreateProjectPayload {
    name: string;
    channel_id?: string;
    guild_id?: string;
    emoji?: string;
    display_name?: string;
    status?: string;
    description?: string;
    ip?: string;
    role_id?: string;
    type?: string;
    version?: string;
}
export interface UpdateProjectPayload {
    channel_id?: string;
    guild_id?: string;
    emoji?: string;
    name?: string;
    display_name?: string;
    status?: string;
    description?: string;
    ip?: string;
    role_id?: string;
    type?: string;
    version?: string;
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
}
export interface ProjectLink {
    id: number;
    url: string;
    label: string;
}
export declare enum ProjectStatus {
    PLAYABLE = "playable",
    IN_DEVELOPMENT = "in_development",
    ARCHIVED = "archived",
    HIDDEN = "hidden"
}
export declare class ProjectStatusHelper {
    static pretty(status: ProjectStatus): string;
    static values(): ProjectStatus[];
}
export declare enum ProjectType {
    MMO = "mmo",
    SMP = "smp",
    MAP = "map",
    RPG = "rpg",
    OTHER = "other"
}
export declare class ProjectTypeHelper {
    static pretty(status: ProjectType): string;
    static values(): ProjectType[];
}
//# sourceMappingURL=types.d.ts.map