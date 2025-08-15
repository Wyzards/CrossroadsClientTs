export interface CrossroadsUser {
    id: number;
    minecraftUuid?: string;
    discordId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCrossroadsUserPayload {
    minecraftUuid?: string;
    discordId?: string;
}