import { HttpClient } from "../httpClient.js";
import { ProjectListEntry } from "./types";

export class ProjectListEntriesApi {
    constructor(private http: HttpClient) { }

    getForList(listId: number): Promise<ProjectListEntry[]> {
        return this.http.get<ProjectListEntry[]>(
            `/project-list-entries/list/${listId}`
        );
    }

    sync(payload: {
        project_list_id: number;
        entries: {
            project_id: number;
            thread_channel_id: string;
        }[];
    }): Promise<void> {
        return this.http.post("/project-list-entries/sync", payload);
    }
}