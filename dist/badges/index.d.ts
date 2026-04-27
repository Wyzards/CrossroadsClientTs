import { HttpClient } from "../httpClient.js";
import { Badge, UserProfile, Era } from "./types.js";
export declare class BadgesApi {
    private http;
    constructor(http: HttpClient);
    getProfile(userId: number): Promise<UserProfile | null>;
    getBadges(): Promise<Badge[]>;
    createBadge(data: Partial<Badge>): Promise<Badge>;
    updateBadge(id: number, data: Partial<Badge>): Promise<Badge>;
    assignBadge(userId: number, badgeId: number): Promise<any>;
    removeBadge(userId: number, badgeId: number): Promise<boolean>;
    triggerXpEvent(userId: number, eventId: number): Promise<any>;
    recalculateUserXp(userId: number): Promise<boolean>;
    recalculateBadgeXp(badgeId: number): Promise<boolean>;
    getEras(): Promise<Era[]>;
    createEra(name: string): Promise<Era>;
    activateEra(id: number): Promise<Era>;
    getSystemChannels(): Promise<any>;
    setSystemChannels(data: any): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map