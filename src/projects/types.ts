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
    role: string;
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