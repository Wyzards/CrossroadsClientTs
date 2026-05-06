import { HttpClient } from "../httpClient.js";
import { Badge, BadgeProgression, CreateBadgePayload, ProgressionCurveType, SystemChannels, UpdateBadgePayload, UserBadge } from "./types.js";
export declare class BadgesApi {
    private http;
    constructor(http: HttpClient);
    getBadges(): Promise<Badge[]>;
    getBadge(id: number): Promise<Badge | null>;
    createBadge(data: CreateBadgePayload): Promise<Badge>;
    updateBadge(id: number, data: UpdateBadgePayload): Promise<Badge>;
    assignBadge(userId: number, badgeId: number): Promise<UserBadge>;
    removeBadge(userId: number, badgeId: number): Promise<boolean>;
    getBadgeProgression(badgeId: number): Promise<BadgeProgression>;
    updateBadgeProgression(badgeId: number, data: {
        curve_type: ProgressionCurveType;
        base_xp: number;
        growth_rate: number;
    }): Promise<BadgeProgression>;
    getSystemChannels(): Promise<SystemChannels>;
    setSystemChannels(data: SystemChannels): Promise<SystemChannels>;
}
//# sourceMappingURL=index.d.ts.map