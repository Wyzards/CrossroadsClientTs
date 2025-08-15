import { AxiosInstance } from "axios";
import { Map, CreateMapPayload } from "./types";

export class MapsApi {
    constructor(private http: AxiosInstance) { }

    getByImageName(imageName: string) {
        return this.http.get<Map>(`/maps/by-image-name/${imageName}`);
    }

    deleteByImageName(imageName: string) {
        return this.http.delete(`/maps/by-image-name/${imageName}`);
    }

    list() {
        return this.http.get<Map[]>(`/maps`);
    }

    create(payload: CreateMapPayload) {
        return this.http.post<Map>(`/maps`, payload);
    }

    get(id: number) {
        return this.http.get<Map>(`/maps/${id}`);
    }
}