import { HttpClient } from "../httpClient.js";
import { Badge, UserProfile, Era, SystemChannels, CreateBadgePayload, UpdateBadgePayload, UserBadge, UserXpEvent } from "./types.js";
export declare class BadgesApi {
    private http;
    constructor(http: HttpClient);
    getProfile(userId: number): Promise<UserProfile | null>;
    getBadges(): Promise<Badge[]>;
    createBadge(data: CreateBadgePayload): Promise<Badge>;
    updateBadge(id: number, data: UpdateBadgePayload): Promise<Badge>;
    assignBadge(userId: number, badgeId: number): Promise<UserBadge>;
    removeBadge(userId: number, badgeId: number): Promise<boolean>;
    triggerXpEvent(userId: number, eventId: number): Promise<UserXpEvent>;
    recalculateUserXp(userId: number): Promise<boolean>;
    recalculateBadgeXp(badgeId: number): Promise<boolean>;
    getEras(): Promise<Era[]>;
    createEra(name: string): Promise<Era>;
    activateEra(id: number): Promise<Era>;
    getSystemChannels(): Promise<SystemChannels>;
    setSystemChannels(data: SystemChannels): Promise<SystemChannels>;
}
//# sourceMappingURL=index.d.ts.map