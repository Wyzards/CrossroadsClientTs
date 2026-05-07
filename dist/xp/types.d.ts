import { Badge } from "../badges/types.js";
export interface XpEventDefinition {
    id: number;
    name: string;
    xp_amount: number;
    cooldown_seconds: number;
    badge: Badge;
}
export interface UserXpEvent {
    user_id: number;
    xp_event_definition_id: number;
    xp_amount: number;
}
export interface TriggerXpEventRequest {
    user_id: number;
    xp_event_definition_id: number;
}
//# sourceMappingURL=types.d.ts.map