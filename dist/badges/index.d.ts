import { HttpClient } from "../httpClient.js";
import { Badge, UserProfile, Era, SystemChannels, CreateBadgePayload, UpdateBadgePayload, UserBadge, XpEventDefinition, UserBadgeXp } from "./types.js";
export declare class BadgesApi {
    private http;
    constructor(http: HttpClient);
    getProfile(userId: number): Promise<UserProfile | null>;
    getBadges(): Promise<Badge[]>;
    createBadge(data: CreateBadgePayload): Promise<Badge>;
    updateBadge(id: number, data: UpdateBadgePayload): Promise<Badge>;
    assignBadge(userId: number, badgeId: number): Promise<UserBadge>;
    removeBadge(userId: number, badgeId: number): Promise<boolean>;
    triggerXpEvent(userId: number, eventId: number): Promise<UserBadgeXp>;
    getXpEventDefinitions(): Promise<XpEventDefinition[]>;
    createXpEventDefinition(data: {
        name: string;
        badge_id: number;
        xp_amount: number;
        cooldown_seconds: number;
    }): Promise<XpEventDefinition>;
    updateXpEventDefinition(id: number, data: Partial<{
        name: string;
        badge_id: number;
        xp_amount: number;
        cooldown_seconds: number;
    }>): Promise<XpEventDefinition>;
    deleteXpEventDefinition(id: number): Promise<boolean>;
    getEras(): Promise<Era[]>;
    createEra(data: {
        name: string;
        role_id: string;
    }): Promise<Era>;
    updateEra(id: number, data: Partial<{
        name: string;
        role_id: string | null;
    }>): Promise<Era>;
    activateEra(id: number): Promise<Era>;
    getSystemChannels(): Promise<SystemChannels>;
    setSystemChannels(data: SystemChannels): Promise<SystemChannels>;
}
//# sourceMappingURL=index.d.ts.map