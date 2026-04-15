import { HttpClient } from "../httpClient.js";
import { FilterGroup } from "../types/filter.js";
import { ProjectListTag, ProjectListWithRelations } from "./types";

export class ProjectListsApi {
    constructor(private http: HttpClient) { }

    list(): Promise<ProjectListWithRelations[]> {
        return this.http.get<ProjectListWithRelations[]>("/project-lists");
    }

    getById(id: number): Promise<ProjectListWithRelations> {
        return this.http.get<ProjectListWithRelations>(`/project-lists/${id}`);
    }

    create(payload: {
        name: string;
        channel_id: string | null;
        filters?: FilterGroup;
        is_active?: boolean;
    }): Promise<ProjectListWithRelations> {
        return this.http.post<ProjectListWithRelations>("/project-lists", payload);
    }

    // TODO: Make project use string | null for channel and not optional

    update(id: number, payload: {
        name?: string;
        channel_id?: string | null;
        filters?: FilterGroup;
        is_active?: boolean;
    }): Promise<ProjectListWithRelations> {
        return this.http.put<ProjectListWithRelations>(`/project-lists/${id}`, payload);
    }

    delete(id: number): Promise<void> {
        return this.http.delete(`/project-lists/${id}`);
    }

    getTags(listId: number): Promise<ProjectListTag[]> {
        return this.http.get<ProjectListTag[]>(
            `/project-lists/${listId}/tags`
        );
    }

    createTag(
        listId: number,
        payload: {
            name: string;
            filters: FilterGroup;
        }
    ): Promise<ProjectListTag> {
        return this.http.post<ProjectListTag>(
            `/project-lists/${listId}/tags`,
            payload
        );
    }

    updateTag(
        listId: number,
        tagId: number,
        payload: {
            name?: string;
            filters?: FilterGroup;
        }
    ): Promise<ProjectListTag> {
        return this.http.put<ProjectListTag>(
            `/project-lists/${listId}/tags/${tagId}`,
            payload
        );
    }

    deleteTag(listId: number, tagId: number): Promise<void> {
        return this.http.delete(
            `/project-lists/${listId}/tags/${tagId}`
        );
    }

    evaluateTags(
        listId: number,
        projectId: number
    ): Promise<ProjectListTag[]> {
        return this.http.get<ProjectListTag[]>(
            `/project-lists/${listId}/evaluate-tags/${projectId}`
        );
    }

    evaluateTagsBulk(
        listId: number,
        payload: {
            project_ids: number[];
        }
    ): Promise<Record<number, ProjectListTag[]>> {
        return this.http.post<Record<number, ProjectListTag[]>>(
            `/project-lists/${listId}/evaluate-tags-bulk`,
            payload
        );
    }
}