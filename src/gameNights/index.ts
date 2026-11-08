import { NotFoundError } from "../error.js";
import { HttpClient } from "../httpClient.js";
import { CreateGameNightPayload, GameNight, GameNightStatus } from "./types.js";

export class GameNightsApi {
    constructor(private http: HttpClient) { }

    /** Filter by status and/or by a Discord user who attended. */
    list(filter: { status?: GameNightStatus, discordId?: string } = {}): Promise<GameNight[]> {
        const params: Record<string, string> = {};
        if (filter.status) params.status = filter.status;
        if (filter.discordId) params.discord_id = filter.discordId;
        return this.http.get<GameNight[]>(`/game-nights`, { params });
    }

    /** The running game night, or null. */
    async active(): Promise<GameNight | null> {
        try {
            return await this.http.get<GameNight>(`/game-nights/active`);
        } catch (err) {
            if (err instanceof NotFoundError) return null;
            throw err;
        }
    }

    get(id: number): Promise<GameNight> {
        return this.http.get<GameNight>(`/game-nights/${id}`);
    }

    /** Throws (409) if one is already active. */
    create(payload: CreateGameNightPayload): Promise<GameNight> {
        return this.http.post<GameNight>(`/game-nights`, payload);
    }

    end(id: number): Promise<GameNight> {
        return this.http.put<GameNight>(`/game-nights/${id}`, { status: "ended" });
    }

    cancel(id: number): Promise<GameNight> {
        return this.http.put<GameNight>(`/game-nights/${id}`, { status: "cancelled" });
    }

    /** Idempotent: re-adding someone keeps their first join time. */
    addAttendees(id: number, discordIds: string[]): Promise<GameNight> {
        return this.http.post<GameNight>(`/game-nights/${id}/attendees`, { discord_ids: discordIds });
    }

    markRsvps(id: number, discordIds: string[]): Promise<GameNight> {
        return this.http.post<GameNight>(`/game-nights/${id}/rsvps`, { discord_ids: discordIds });
    }
}
