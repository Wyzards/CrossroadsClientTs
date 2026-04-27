import { Accessibility, ArchitectApproval, CommunityVetted, ProjectStage, ProjectType } from "../projects/types.js";
export type FilterRule = {
    field: "type";
    operator: FilterOperator;
    value: ProjectType;
} | {
    field: "project_stage";
    operator: FilterOperator;
    value: ProjectStage;
} | {
    field: "community_vetted";
    operator: FilterOperator;
    value: CommunityVetted;
} | {
    field: "architect_approval";
    operator: FilterOperator;
    value: ArchitectApproval;
} | {
    field: "accessibility";
    operator: FilterOperator;
    value: Accessibility;
};
export type FilterGroup = {
    all?: (FilterRule | FilterGroup)[];
    any?: (FilterRule | FilterGroup)[];
};
export type FilterOperator = '=' | '!=';
export type FilterField = "architect_approval" | "community_vetted" | "project_stage" | "accessibility" | "type";
export type FilterValue = ArchitectApproval | CommunityVetted | ProjectStage | Accessibility | ProjectType;
//# sourceMappingURL=filter.d.ts.map