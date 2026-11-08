import { HttpClient } from "../httpClient.js";
import { CreateGameNightPayload, GameNight, GameNightStatus } from "./types.js";
export declare class GameNightsApi {
    private http;
    constructor(http: HttpClient);
    /** Filter by status and/or by a Discord user who attended. */
    list(filter?: {
        status?: GameNightStatus;
        discordId?: string;
    }): Promise<GameNight[]>;
    /** The running game night, or null. */
    active(): Promise<GameNight | null>;
    get(id: number): Promise<GameNight>;
    /** Throws (409) if one is already active. */
    create(payload: CreateGameNightPayload): Promise<GameNight>;
    end(id: number): Promise<GameNight>;
    cancel(id: number): Promise<GameNight>;
    /** Idempotent: re-adding someone keeps their first join time. */
    addAttendees(id: number, discordIds: string[]): Promise<GameNight>;
    markRsvps(id: number, discordIds: string[]): Promise<GameNight>;
}
//# sourceMappingURL=index.d.ts.map