import { ProjectListEntry } from "../projects/types.js";
import { FilterGroup } from "../types/filter.js";
export interface ProjectList {
    id: number;
    name: string;
    channel_id: string;
    filters: FilterGroup;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}
export interface ProjectListWithEntries extends ProjectList {
    entries: ProjectListEntry[];
}
//# sourceMappingURL=types.d.ts.map