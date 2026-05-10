import { Badge, UserBadge, UserBadgeXp } from "../badges/types.js";
import { Era } from "../eras/type.js";
export interface CrossroadsUser {
    id: number;
    minecraftUuid?: string;
    discordId?: string;
    era: Era | null;
}
export interface CreateCrossroadsUserPayload {
    minecraftUuid?: string;
    discordId?: string;
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
    locked_achievements: Badge[];
    subscription: UserSubscription | null;
    progression_badges: Badge[];
}
export interface UserSubscription {
    started_at: string;
    total_months: number;
    current_streak: number;
    is_active: boolean;
}
//# sourceMappingURL=types.d.ts.map