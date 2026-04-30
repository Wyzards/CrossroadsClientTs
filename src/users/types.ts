import { Era } from "../badges/types.js";

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