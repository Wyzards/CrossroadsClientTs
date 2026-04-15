import { ProjectListEntry } from "../projectListEntries/types.js";
import { Project } from "../projects/types.js";
import { FilterGroup } from "../types/filter.js";
export interface ProjectList {
    id: number;
    name: string;
    channel_id: string | null;
    filters: FilterGroup;
    is_active: boolean;
}
export interface ProjectListWithEntries extends ProjectList {
    entries: ProjectListEntry[];
}
export interface ProjectListEntryWithProject extends ProjectListEntry {
    project: Project;
}
//# sourceMappingURL=types.d.ts.map