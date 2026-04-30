import { NotFoundError } from "../error.js";
import { HttpClient } from "../httpClient.js";
import {
    Badge,
    UserProfile,
    Era,
    SystemChannels,
    CreateBadgePayload,
    UpdateBadgePayload,
    UserBadge,
    UserXpEvent,
    XpEventDefinition,
    UserBadgeXp
} from "./types.js";

export class BadgesApi {
    constructor(private http: HttpClient) { }

    // ========================
    // Profile
    // ========================

    async getProfile(userId: number): Promise<UserProfile | null> {
        try {
            return await this.http.get<UserProfile>(`/crossroads-users/${userId}/profile`);
        } catch (err) {
            if (err instanceof NotFoundError) return null;
            throw err;
        }
    }

    // ========================
    // Badges
    // ========================

    getBadges(): Promise<Badge[]> {
        return this.http.get<Badge[]>(`/badges`);
    }

    createBadge(data: CreateBadgePayload): Promise<Badge> {
        return this.http.post<Badge>(`/badges`, data);
    }

    updateBadge(id: number, data: UpdateBadgePayload): Promise<Badge> {
        return this.http.put<Badge>(`/badges/${id}`, data);
    }

    // ========================
    // User Badges
    // ========================

    assignBadge(userId: number, badgeId: number): Promise<UserBadge> {
        return this.http.post(
            `/crossroads-users/${userId}/badges/${badgeId}`,
            {}
        );
    }

    removeBadge(userId: number, badgeId: number): Promise<boolean> {
        return this.http.delete(
            `/crossroads-users/${userId}/badges/${badgeId}`
        );
    }

    // ========================
    // XP
    // ========================

    triggerXpEvent(userId: number, eventId: number): Promise<UserBadgeXp> {
        return this.http.post(
            `/xp-events/trigger`,
            {
                user_id: userId,
                xp_event_definition_id: eventId
            }
        );
    }

    // ----------------------------
    // XP EVENT DEFINITIONS
    // ----------------------------

    getXpEventDefinitions(): Promise<XpEventDefinition[]> {
        return this.http.get(
            `/xp-event-definitions`
        );
    }

    createXpEventDefinition(data: {
        name: string
        badge_id: number
        xp_amount: number
        cooldown_seconds: number
    }): Promise<XpEventDefinition> {
        return this.http.post(
            `/xp-event-definitions`,
            data
        );
    }

    updateXpEventDefinition(
        id: number,
        data: Partial<{
            name: string
            badge_id: number
            xp_amount: number
            cooldown_seconds: number
        }>
    ): Promise<XpEventDefinition> {
        return this.http.put(
            `/xp-event-definitions/${id}`,
            data
        );
    }

    deleteXpEventDefinition(id: number): Promise<boolean> {
        return this.http.delete(
            `/xp-event-definitions/${id}`
        );
    }

    // ========================
    // Eras
    // ========================

    getEras(): Promise<Era[]> {
        return this.http.get<Era[]>(`/eras`);
    }

    createEra(name: string): Promise<Era> {
        return this.http.post<Era>(`/eras`, { name });
    }

    activateEra(id: number): Promise<Era> {
        return this.http.post<Era>(`/eras/${id}/activate`, {});
    }

    // ========================
    // System Channels
    // ========================

    getSystemChannels(): Promise<SystemChannels> {
        return this.http.get(`/system/channels`);
    }

    setSystemChannels(data: SystemChannels): Promise<SystemChannels> {
        return this.http.post(`/system/channels`, data);
    }
}