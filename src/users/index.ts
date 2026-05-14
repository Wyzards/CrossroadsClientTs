import { NotFoundError } from "../error.js";
import { HttpClient } from "../httpClient.js";
import { CrossroadsUser, CreateCrossroadsUserPayload, UserProfile, LeaderboardType, LeaderboardEntry } from "./types";

export class CrossroadsUsersApi {
    constructor(private http: HttpClient) { }

    create(payload: CreateCrossroadsUserPayload): Promise<CrossroadsUser> {
        return this.http.post<CrossroadsUser>(`/crossroads-users`, {
            minecraft_uuid: payload.minecraftUuid,
            discord_id: payload.discordId
        });
    }

    list(): Promise<CrossroadsUser[]> {
        return this.http.get<CrossroadsUser[]>(`/crossroads-users`);
    }

    get(id: number): Promise<CrossroadsUser> {
        return this.http.get<CrossroadsUser>(`/crossroads-users/${id}`);
    }

    delete(id: number) {
        return this.http.delete(`/crossroads-users/${id}`);
    }

    async findByMinecraftUuid(uuid: string): Promise<CrossroadsUser | null> {
        try {
            return await this.http.get<CrossroadsUser>(`/crossroads-users/minecraft/${uuid}`);
        } catch (err) {
            if (err instanceof NotFoundError) return null;
            throw err;
        }
    }

    async findByDiscordId(discordId: string): Promise<CrossroadsUser | null> {
        try {
            return await this.http.get<CrossroadsUser>(`/crossroads-users/discord/${discordId}`);
        } catch (err) {
            if (err instanceof NotFoundError) return null;
            throw err;
        }
    }

    async getProfile(userId: number): Promise<UserProfile | null> {
        try {
            return await this.http.get<UserProfile>(`/crossroads-users/${userId}/profile`);
        } catch (err) {
            if (err instanceof NotFoundError) return null;
            throw err;
        }
    }

    async getLeaderboard(type: LeaderboardType): Promise<LeaderboardEntry[]> {
        return this.http.get<LeaderboardEntry[]>(`/crossroads-users/leaderboard/${type}`);
    }
}