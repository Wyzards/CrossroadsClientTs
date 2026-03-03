import { HttpClient } from "../httpClient.js";
import { CrossroadsUser, CreateCrossroadsUserPayload } from "./types";

export class CrossroadsUsersApi {
    constructor(private http: HttpClient) { }

    create(payload: CreateCrossroadsUserPayload) {
        return this.http.post<CrossroadsUser>(`/crossroads-users`, {
            minecraft_uuid: payload.minecraftUuid,
            discord_id: payload.discordId
        });
    }

    list() {
        return this.http.get<CrossroadsUser[]>(`/crossroads-users`);
    }

    get(id: number) {
        return this.http.get<CrossroadsUser>(`/crossroads-users/${id}`);
    }

    delete(id: number) {
        return this.http.delete(`/crossroads-users/${id}`);
    }

    findByMinecraftUuid(uuid: string) {
        return this.http.get<CrossroadsUser>(`/crossroads-users/minecraft/${uuid}`);
    }

    findByDiscordId(discordId: string) {
        return this.http.get<CrossroadsUser>(`/crossroads-users/discord/${discordId}`);
    }
}