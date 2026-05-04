import { UserBadgeXp, XpEventDefinition } from "../badges/types.js";
import { HttpClient } from "../httpClient.js";
export declare class XpApi {
    private http;
    constructor(http: HttpClient);
    triggerXpEvent(userId: number, eventId: number): Promise<UserBadgeXp>;
    getXpEventDefinitions(): Promise<XpEventDefinition[]>;
    getXpEventDefinition(id: number): Promise<XpEventDefinition>;
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
}
//# sourceMappingURL=index.d.ts.map