import { CrossroadsUser } from "../users/types.js"

export type CreateBadgePayload = Omit<Badge, 'id'>
export type UpdateBadgePayload = Partial<CreateBadgePayload>;

export interface Badge {
    id: number
    name: string
    description?: string
    category: BadgeCategory
    is_xp_based: boolean
    rarity?: BadgeRarity;
    is_active: boolean
}

export interface BadgeProgression {
    badge_id: number
    base_xp: number
    growth_factor: number
    curve_type: ProgressionCurveType
}

export type ProgressionCurveType = 'linear' | 'exponential';

export type BadgeCategory = 'progression' | 'community' | 'achievement' | 'artifact';

export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'legendary';

export interface UserBadge {
    id: number
    earned_at: string
    badge: Badge
}

export interface UserBadgeXp {
    id: number
    total_xp: number
    level: number
    last_calculated_at: string,
    badge: Badge
}



export interface UserSubscription {
    started_at: string
    total_months: number
    current_streak: number
    is_active: boolean
}

export interface XpEventDefinition {
    id: number
    name: string
    xp_amount: number
    cooldown_seconds: number
    badge: Badge
}

export interface UserXpEvent {
    user_id: number
    xp_event_definition_id: number
    xp_amount: number
}

export interface TriggerXpEventRequest {
    user_id: number
    xp_event_definition_id: number
}

export interface SystemChannels {
    achievements_channel_id: string;
}