import { HttpClient } from "../httpClient.js";
import { CrossroadsUser, CreateCrossroadsUserPayload, UserProfile, LeaderboardType, LeaderboardResponse } from "./types";
export declare class CrossroadsUsersApi {
    private http;
    constructor(http: HttpClient);
    create(payload: CreateCrossroadsUserPayload): Promise<CrossroadsUser>;
    list(): Promise<CrossroadsUser[]>;
    get(id: number): Promise<CrossroadsUser>;
    delete(id: number): Promise<unknown>;
    findByMinecraftUuid(uuid: string): Promise<CrossroadsUser | null>;
    findByDiscordId(discordId: string): Promise<CrossroadsUser | null>;
    getProfile(userId: number): Promise<UserProfile | null>;
    getLeaderboard(viewerUserId: number, type: LeaderboardType): Promise<LeaderboardResponse>;
}
//# sourceMappingURL=index.d.ts.map