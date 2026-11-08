import { CrossroadsUser } from "../users/types.js";

export type GameNightType = "vetting" | "hunt";
export type GameNightStatus = "active" | "ended" | "cancelled";

export interface GameNightAttendee {
    id: number;
    game_night_id: number;
    user_id: number;
    joined_at: string;
    rsvp: boolean;
    user: CrossroadsUser;
}

export interface GameNight {
    id: number;
    type: GameNightType;
    status: GameNightStatus;
    started_by_user_id: number | null;
    channel_id: string | null;
    discord_event_id: string | null;
    discord_event_name: string | null;
    started_at: string;
    ended_at: string | null;
    attendees?: GameNightAttendee[];
    attendees_count?: number;
}

export interface CreateGameNightPayload {
    type: GameNightType;
    /** "active" (default; only one at a time) or "ended" to record a past game night. */
    status?: "active" | "ended";
    started_by_discord_id?: string;
    channel_id?: string;
    discord_event_id?: string;
    discord_event_name?: string;
    started_at?: string;
    ended_at?: string;
}
