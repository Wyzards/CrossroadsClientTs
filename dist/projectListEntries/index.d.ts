import { HttpClient } from "../httpClient.js";
import { ProjectListEntry } from "./types";
export declare class ProjectListEntriesApi {
    private http;
    constructor(http: HttpClient);
    getForList(listId: number): Promise<ProjectListEntry[]>;
    sync(payload: {
        project_list_id: number;
        entries: {
            project_id: number;
            thread_channel_id: string;
        }[];
    }): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map