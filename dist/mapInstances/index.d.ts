import { HttpClient } from "../httpClient.js";
import { CrossroadsUser } from "../users/types.js";
import { CreateMapInstancePayload, MapInstance } from "./types";
export declare class MapInstancesApi {
    private http;
    constructor(http: HttpClient);
    listForUser(userId: number): Promise<MapInstance[]>;
    createForUser(userId: number, payload: CreateMapInstancePayload): Promise<MapInstance>;
    getSecondaryUsers(instanceId: number): Promise<CrossroadsUser[]>;
    addSecondaryUser(instanceId: number, userId: number): Promise<any>;
    removeSecondaryUser(instanceId: number, userId: number): Promise<unknown>;
    delete(instanceId: number): Promise<unknown>;
}
//# sourceMappingURL=index.d.ts.map