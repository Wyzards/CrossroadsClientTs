import { HttpClient } from "../httpClient.js";

export type AnnouncementConnectionStatus = "waiting" | "choosing" | "done" | "cancelled";

export interface FollowedChannel {
    channel_id: string;
    name: string | null;
    webhook_channel_id: string | null;
    webhook_id: string | null;
}

/** One "Connect announcements" attempt: the bot joins the project's server, follows picked channels, leaves. */
export interface AnnouncementConnection {
    id: number;
    guild_id: string;
    guild_name: string | null;
    application_id: number | null;
    project_id: number | null;
    requested_by_discord_id: string;
    status: AnnouncementConnectionStatus;
    followed: FollowedChannel[] | null;
    created_at: string;
    updated_at: string;
}

export class AnnouncementConnectionsApi {
    constructor(private http: HttpClient) { }

    /** Newest first. */
    list(filter: { guild_id?: string, application_id?: number, project_id?: number, status?: AnnouncementConnectionStatus[] } = {}): Promise<AnnouncementConnection[]> {
        const params: Record<string, string> = {};
        if (filter.guild_id) params.guild_id = filter.guild_id;
        if (filter.application_id) params.application_id = String(filter.application_id);
        if (filter.project_id) params.project_id = String(filter.project_id);
        if (filter.status) params.status = filter.status.join(",");
        return this.http.get<AnnouncementConnection[]>("/announcement-connections", { params });
    }

    /** Cancels any open attempt for the same application/project. */
    start(payload: { guild_id: string, guild_name?: string | null, application_id?: number, project_id?: number, requested_by_discord_id: string, status?: "waiting" | "choosing" }): Promise<AnnouncementConnection> {
        return this.http.post<AnnouncementConnection>("/announcement-connections", payload);
    }

    update(id: number, payload: { status?: AnnouncementConnectionStatus, guild_name?: string | null, followed?: FollowedChannel[] | null }): Promise<AnnouncementConnection> {
        return this.http.put<AnnouncementConnection>(`/announcement-connections/${id}`, payload);
    }
}
