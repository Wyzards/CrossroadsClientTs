export interface Project {
    id: number;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProjectPayload {
    name: string;
    description?: string;
    // TODO: Going to require an update payload for setting role, channel id, etc.
}

export interface ProjectStaff {
    id: number;
    userId: number;
    role: string;
}

export interface ProjectAttachment {
    id: number;
    url: string;
    description?: string;
}

export interface ProjectLink {
    id: number;
    url: string;
    label: string;
}