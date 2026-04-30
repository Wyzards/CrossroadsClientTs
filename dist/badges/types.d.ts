import { CrossroadsUser } from "../users/types.js";
export interface Era {
    id: number;
    name: string;
    is_active: boolean;
    started_at: string | null;
    ended_at: string | null;
    role_id: string | null;
}
export type CreateBadgePayload = Omit<Badge, 'id'>;
export type UpdateBadgePayload = Partial<CreateBadgePayload>;
export interface Badge {
    id: number;
    name: string;
    description?: string;
    category: 'progression' | 'community' | 'achievement' | 'artifact';
    is_xp_based: boolean;
    rarity?: 'common' | 'uncommon' | 'rare' | 'legendary';
    is_active: boolean;
}
export interface UserBadge {
    id: number;
    earned_at: string;
    badge: Badge;
}
export interface UserBadgeXp {
    id: number;
    total_xp: number;
    level: number;
    last_calculated_at: string;
    badge: Badge;
}
export interface UserProfile {
    user: CrossroadsUser;
    era: Era | null;
    badges: {
        artifact: UserBadge[];
        achievement: UserBadge[];
        community: UserBadge[];
        progression: UserBadge[];
    };
    progression: UserBadgeXp[];
    subscription: UserSubscription | null;
}
export interface UserSubscription {
    started_at: string;
    total_months: number;
    current_streak: number;
    is_active: boolean;
}
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
export interface SystemChannels {
    achievements_channel_id: string;
}
//# sourceMappingURL=types.d.ts.map