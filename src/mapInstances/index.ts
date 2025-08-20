import { HttpClient } from "../httpClient.js";
import { CreateMapInstancePayload, MapInstance, SecondaryUser } from "./types";

export class MapInstancesApi {
    constructor(private http: HttpClient) { }

    async listForUser(userId: number) {
        return this.http.get<MapInstance[]>(`/map-instances/user/${userId}`);
    }

    createForUser(userId: number, payload: CreateMapInstancePayload) {
        return this.http.post<MapInstance>(`/map-instances/user/${userId}`, payload);
    }

    getSecondaryUsers(instanceId: number) {
        return this.http.get<SecondaryUser[]>(`/map-instances/${instanceId}/secondary-users`);
    }

    addSecondaryUser(instanceId: number, userId: number) {
        return this.http.post(`/map-instances/${instanceId}/secondary-users`, { userId });
    }

    removeSecondaryUser(instanceId: number, userId: number) {
        return this.http.delete(`/map-instances/${instanceId}/secondary-users/${userId}`);
    }

    delete(instanceId: number) {
        return this.http.delete(`/map-instances/${instanceId}`);
    }
}