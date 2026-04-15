import { HttpClient } from "../httpClient.js";
import { FilterGroup } from "../types/filter.js";
import { ProjectList, ProjectListWithEntries } from "./types";
export declare class ProjectListsApi {
    private http;
    constructor(http: HttpClient);
    list(): Promise<ProjectList[]>;
    getById(id: number): Promise<ProjectListWithEntries>;
    create(payload: {
        name: string;
        channel_id?: string | null;
        filters?: FilterGroup;
        is_active?: boolean;
    }): Promise<ProjectList>;
    update(id: number, payload: {
        name?: string;
        channel_id?: string | null;
        filters?: FilterGroup;
        is_active?: boolean;
    }): Promise<ProjectList>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map