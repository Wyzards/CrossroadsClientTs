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
}

export interface CreateProjectPayload {
    name: string;
    // whatever other required fields for creation
    channel_id?: string;
    guild_id?: string;
    emoji?: string;
    display_name?: string;
    status?: string;
    description?: string;
    ip?: string;
    role_id?: string;
    type?: string;
}

export interface UpdateProjectPayload {
    channel_id?: string;
    guild_id?: string;
    emoji?: string;
    name?: string; // optional here, Laravel will validate if present
    display_name?: string;
    status?: string;
    description?: string;
    ip?: string;
    role_id?: string;
    type?: string;
}

export interface ProjectStaff {
    id: number;
    userId: number;
    rank: number;
}

export enum ProjectStaffRank {
    LEAD = "lead",
    STAFF = "staff"
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

export enum ProjectStatus {
    PLAYABLE = "playable",
    IN_DEVELOPMENT = "in_development",
    ARCHIVED = "archived",
    HIDDEN = "hidden",
}

export class ProjectStatusHelper {
    static pretty(status: ProjectStatus): string {
        switch (status) {
            case ProjectStatus.PLAYABLE: return "Playable";
            case ProjectStatus.IN_DEVELOPMENT: return "In Development";
            case ProjectStatus.ARCHIVED: return "Archived";
            case ProjectStatus.HIDDEN: return "Hidden";
        }
    }

    static values(): ProjectStatus[] {
        return [
            ProjectStatus.PLAYABLE,
            ProjectStatus.IN_DEVELOPMENT,
            ProjectStatus.ARCHIVED,
            ProjectStatus.HIDDEN,
        ];
    }
}

export enum ProjectType {
    MMO = "mmo",
    SMP = "smp",
    MAP = "map",
    RPG = "rpg",
    OTHER = "other"
}

export class ProjectTypeHelper {
    static pretty(status: ProjectType): string {
        switch (status) {
            case ProjectType.MMO: return "MMO";
            case ProjectType.SMP: return "SMP";
            case ProjectType.MAP: return "Map";
            case ProjectType.RPG: return "RPG";
            case ProjectType.OTHER: return "Other";
        }
    }

    static values(): ProjectType[] {
        return [
            ProjectType.MMO,
            ProjectType.SMP,
            ProjectType.RPG,
            ProjectType.MAP,
            ProjectType.OTHER
        ];
    }
}