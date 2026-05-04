import { HttpClient } from "../httpClient.js";
import {
    Badge,
    CreateBadgePayload,
    SystemChannels,
    UpdateBadgePayload,
    UserBadge
} from "./types.js";

export class BadgesApi {
    constructor(private http: HttpClient) { }

    getBadges(): Promise<Badge[]> {
        return this.http.get<Badge[]>(`/badges`);
    }

    createBadge(data: CreateBadgePayload): Promise<Badge> {
        return this.http.post<Badge>(`/badges`, data);
    }

    updateBadge(id: number, data: UpdateBadgePayload): Promise<Badge> {
        return this.http.put<Badge>(`/badges/${id}`, data);
    }

    assignBadge(userId: number, badgeId: number): Promise<UserBadge> {
        return this.http.post<UserBadge>(
            `/crossroads-users/${userId}/badges/${badgeId}`,
            {}
        );
    }

    removeBadge(userId: number, badgeId: number): Promise<boolean> {
        return this.http.delete(
            `/crossroads-users/${userId}/badges/${badgeId}`
        );
    }

    getSystemChannels(): Promise<SystemChannels> {
        return this.http.get<SystemChannels>(`/system/channels`);
    }

    setSystemChannels(data: SystemChannels): Promise<SystemChannels> {
        return this.http.post<SystemChannels>(`/system/channels`, data);
    }
}