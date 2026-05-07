import { UserBadgeXp, XpEventDefinition } from "../badges/types.js";
import { NotFoundError } from "../error.js";
import { HttpClient } from "../httpClient.js"

export class XpApi {
    constructor(private http: HttpClient) { }

    triggerXpEvent(userId: number, eventId: number): Promise<UserBadgeXp> {
        return this.http.post<UserBadgeXp>(
            `/xp-events/trigger`,
            {
                user_id: userId,
                xp_event_definition_id: eventId
            }
        );
    }

    getXpEventDefinitions(): Promise<XpEventDefinition[]> {
        return this.http.get<XpEventDefinition[]>(
            `/xp-event-definitions`
        );
    }

    async getXpEventDefinition(id: number): Promise<XpEventDefinition | null> {
        try {
            return await this.http.get<XpEventDefinition>(
                `/xp-event-definitions/${id}`
            );
        } catch (err) {
            if (err instanceof NotFoundError) return null;
            throw err;
        }
    }

    createXpEventDefinition(data: {
        name: string
        badge_id: number
        xp_amount: number
        cooldown_seconds: number
    }): Promise<XpEventDefinition> {
        return this.http.post<XpEventDefinition>(
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
}