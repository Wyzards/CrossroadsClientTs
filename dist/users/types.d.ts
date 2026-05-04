import { UserBadge, UserBadgeXp, UserSubscription } from "../badges/types.js";
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
    subscription: UserSubscription | null;
}
//# sourceMappingURL=types.d.ts.map