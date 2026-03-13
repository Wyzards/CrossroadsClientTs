import { HttpClient } from "../httpClient.js";
import { CrossroadsUser, CreateCrossroadsUserPayload } from "./types";
export declare class CrossroadsUsersApi {
    private http;
    constructor(http: HttpClient);
    create(payload: CreateCrossroadsUserPayload): Promise<CrossroadsUser>;
    list(): Promise<CrossroadsUser[]>;
    get(id: number): Promise<CrossroadsUser>;
    delete(id: number): Promise<unknown>;
    findByMinecraftUuid(uuid: string): Promise<CrossroadsUser>;
    findByDiscordId(discordId: string): Promise<CrossroadsUser>;
}
//# sourceMappingURL=index.d.ts.map