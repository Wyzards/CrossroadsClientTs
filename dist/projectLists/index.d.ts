import { HttpClient } from "../httpClient.js";
import { FilterGroup } from "../types/filter.js";
import { ProjectListTag, ProjectListWithRelations } from "./types";
export declare class ProjectListsApi {
    private http;
    constructor(http: HttpClient);
    list(): Promise<ProjectListWithRelations[]>;
    getById(id: number): Promise<ProjectListWithRelations>;
    create(payload: {
        name: string;
        channel_id: string | null;
        filters?: FilterGroup;
        is_active?: boolean;
    }): Promise<ProjectListWithRelations>;
    update(id: number, payload: {
        name?: string;
        channel_id?: string | null;
        filters?: FilterGroup;
        is_active?: boolean;
    }): Promise<ProjectListWithRelations>;
    delete(id: number): Promise<void>;
    getTags(listId: number): Promise<ProjectListTag[]>;
    createTag(listId: number, payload: {
        name: string;
        filters: FilterGroup;
    }): Promise<ProjectListTag>;
    updateTag(listId: number, tagId: number, payload: {
        name?: string;
        filters?: FilterGroup;
    }): Promise<ProjectListTag>;
    deleteTag(listId: number, tagId: number): Promise<void>;
    evaluateTags(listId: number, projectId: number): Promise<ProjectListTag[]>;
    evaluateTagsBulk(listId: number, payload: {
        project_ids: number[];
    }): Promise<Record<number, ProjectListTag[]>>;
}
//# sourceMappingURL=index.d.ts.map