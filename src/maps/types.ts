export interface Map {
    id: number;
    name: string;
    imageName: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateMapPayload {
    name: string;
    imageName: string;
}

export interface MapByImageNameResponse extends Map { }