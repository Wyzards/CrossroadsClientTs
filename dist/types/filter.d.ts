import { Accessibility, ArchitectApproval, CommunityVetted, ProjectStage, ProjectType } from "../projects/types.js";
export type FilterRule = {
    field: FilterField;
    operator: '=' | '!=';
    value: FilterValue;
};
export type FilterGroup = {
    all?: (FilterRule | FilterGroup)[];
    any?: (FilterRule | FilterGroup)[];
};
export type FilterField = "architect_approval" | "community_vetted" | "project_stage" | "accessibility" | "type";
export type FilterValue = ArchitectApproval | CommunityVetted | ProjectStage | Accessibility | ProjectType;
//# sourceMappingURL=filter.d.ts.map