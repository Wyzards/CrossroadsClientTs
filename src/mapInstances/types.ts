export interface MapInstance {
    id: number;
    mapId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateMapInstancePayload {
    mapId: number;
}

export interface SecondaryUser {
    id: number;
    username: string;
}