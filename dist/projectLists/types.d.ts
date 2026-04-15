import { ProjectListEntry } from "../projectListEntries/types.js";
import { FilterGroup } from "../types/filter.js";
export interface ProjectList {
    id: number;
    name: string;
    channel_id: string | null;
    filters: FilterGroup;
    is_active: boolean;
}
export interface ProjectListWithRelations extends ProjectList {
    entries: ProjectListEntry[];
    tags: ProjectListTag[];
}
export interface ProjectListTag {
    id: number;
    project_list_id: number;
    name: string;
    filters: FilterGroup;
    created_at: string;
    updated_at: string;
}
//# sourceMappingURL=types.d.ts.map