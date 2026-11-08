import { ProjectListEntry } from "../projectListEntries/types.js";
import { FilterGroup } from "../types/filter.js";
export interface ProjectList {
    id: number;
    name: string;
    channel_id: string | null;
    filters: FilterGroup;
    /** When on, every featured tag is also a forum tag of this list (generated, id null). */
    featured_tags: boolean;
    is_active: boolean;
}
export interface ProjectListWithRelations extends ProjectList {
    entries: ProjectListEntry[];
    tags: ProjectListTag[];
}
export interface ProjectListTag {
    /** Null for tags generated from featured tags; those can't be edited here. */
    id: number | null;
    featured?: boolean;
    project_list_id: number;
    name: string;
    filters: FilterGroup;
    created_at: string;
    updated_at: string;
}
//# sourceMappingURL=types.d.ts.map