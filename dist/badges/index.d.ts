import { HttpClient } from "../httpClient.js";
import { Badge, CreateBadgePayload, SystemChannels, UpdateBadgePayload, UserBadge } from "./types.js";
export declare class BadgesApi {
    private http;
    constructor(http: HttpClient);
    getBadges(): Promise<Badge[]>;
    createBadge(data: CreateBadgePayload): Promise<Badge>;
    updateBadge(id: number, data: UpdateBadgePayload): Promise<Badge>;
    assignBadge(userId: number, badgeId: number): Promise<UserBadge>;
    removeBadge(userId: number, badgeId: number): Promise<boolean>;
    getSystemChannels(): Promise<SystemChannels>;
    setSystemChannels(data: SystemChannels): Promise<SystemChannels>;
}
//# sourceMappingURL=index.d.ts.map