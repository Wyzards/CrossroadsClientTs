import { HttpClient } from "../httpClient.js";
import { Map, CreateMapPayload } from "./types";
export declare class MapsApi {
    private http;
    constructor(http: HttpClient);
    getByImageName(imageName: string): Promise<Map>;
    deleteByImageName(imageName: string): Promise<unknown>;
    list(): Promise<Map[]>;
    create(payload: CreateMapPayload): Promise<Map>;
    get(id: number): Promise<Map>;
}
//# sourceMappingURL=index.d.ts.map