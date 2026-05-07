export type CreateBadgePayload = Omit<Badge, 'id'>;
export type UpdateBadgePayload = Partial<CreateBadgePayload>;
export interface Badge {
    id: number;
    name: string;
    description?: string;
    category: BadgeCategory;
    is_xp_based: boolean;
    rarity?: BadgeRarity;
    is_active: boolean;
}
export interface BadgeProgression {
    badge_id: number;
    base_xp: number;
    growth_factor: number;
    curve_type: ProgressionCurveType;
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
export type ProgressionCurveType = 'linear' | 'exponential';
export type BadgeCategory = 'progression' | 'community' | 'achievement' | 'artifact';
export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'legendary';
export interface SystemChannels {
    achievements_channel_id: string;
}
//# sourceMappingURL=types.d.ts.map