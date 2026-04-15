import { ProjectListEntry } from "../projectListEntries/types.js";
import { Accessibility, ArchitectApproval, CommunityVetted, Project, ProjectStage, ProjectType } from "../projects/types.js";
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
export type ProjectFilter = {
    all: ProjectFilter[];
} | {
    any: ProjectFilter[];
} | {
    field: ProjectFilterField;
    operator: ProjectFilterOperator;
    value: ProjectFilterValue;
};
export type ProjectFilterValue = ArchitectApproval | CommunityVetted | ProjectStage | Accessibility | ProjectType | string;
export type ProjectFilterField = "architect_approval" | "community_vetted" | "project_stage" | "accessibility" | "type";
export type ProjectFilterOperator = "=" | "!=";
//# sourceMappingURL=types.d.ts.map