import { NotFoundError } from "../error.js";
import { HttpClient } from "../httpClient.js";
import {
    Badge,
    BadgeProgression,
    CreateBadgePayload,
    ProgressionCurveType,
    SystemChannels,
    UpdateBadgePayload,
    UserBadge
} from "./types.js";

export class BadgesApi {
    constructor(private http: HttpClient) { }

    getBadges(): Promise<Badge[]> {
        return this.http.get<Badge[]>(`/badges`);
    }

    async getBadge(id: number): Promise<Badge | null> {
        try {
            return await this.http.get<Badge>(`/badges/${id}`);
        } catch (err) {
            if (err instanceof NotFoundError) return null;
            throw err;
        }
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

    getBadgeProgression(badgeId: number): Promise<BadgeProgression> {
        return this.http.get<BadgeProgression>(
            `/badges/${badgeId}/progression`
        );
    }

    updateBadgeProgression(badgeId: number, data: { curve_type: ProgressionCurveType, base_xp: number, growth_factor: number }) {
        return this.http.put<BadgeProgression>(
            `/badges/${badgeId}/progression`,
            data
        );
    }

    getSystemChannels(): Promise<SystemChannels> {
        return this.http.get<SystemChannels>(`/system/channels`);
    }

    setSystemChannels(data: SystemChannels): Promise<SystemChannels> {
        return this.http.post<SystemChannels>(`/system/channels`, data);
    }
}