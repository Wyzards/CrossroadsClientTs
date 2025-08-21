export interface CrossroadsUser {
    id: number;
    minecraftUuid?: string;
    discordId?: string;
}

export interface CreateCrossroadsUserPayload {
    minecraftUuid?: string;
    discordId?: string;
}