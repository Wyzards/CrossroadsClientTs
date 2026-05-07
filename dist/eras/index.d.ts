import { HttpClient } from "../httpClient.js";
import { CrossroadsUser } from "../users/types.js";
import { Era } from "./type.js";
export declare class ErasApi {
    private http;
    constructor(http: HttpClient);
    getEras(): Promise<Era[]>;
    getEra(id: number): Promise<Era | null>;
    createEra(data: {
        name: string;
        role_id: string;
    }): Promise<Era>;
    updateEra(id: number, data: Partial<{
        name: string;
        role_id: string | null;
    }>): Promise<Era>;
    activateEra(id: number): Promise<CrossroadsUser[]>;
}
//# sourceMappingURL=index.d.ts.map