import { HttpClient } from "../httpClient.js";
import { FilterGroup } from "../types/filter.js";
import { ProjectList, ProjectListWithEntries } from "./types";

export class ProjectListsApi {
    constructor(private http: HttpClient) { }

    list(): Promise<ProjectList[]> {
        return this.http.get<ProjectList[]>("/project-lists");
    }

    getById(id: number): Promise<ProjectListWithEntries> {
        return this.http.get<ProjectListWithEntries>(`/project-lists/${id}`);
    }

    create(payload: {
        name: string;
        channel_id?: string | null;
        filters?: FilterGroup;
        is_active?: boolean;
    }): Promise<ProjectList> {
        return this.http.post<ProjectList>("/project-lists", payload);
    }

    update(id: number, payload: {
        name?: string;
        channel_id?: string | null;
        filters?: FilterGroup;
        is_active?: boolean;
    }): Promise<ProjectList> {
        return this.http.put<ProjectList>(`/project-lists/${id}`, payload);
    }

    delete(id: number): Promise<void> {
        return this.http.delete(`/project-lists/${id}`);
    }
}