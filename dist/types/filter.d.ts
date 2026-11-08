import { Accessibility, ArchitectApproval, CommunityVetted, ProjectFormat, ProjectStage } from "../projects/types.js";
export type FilterRule = {
    field: "format";
    operator: FilterOperator;
    value: ProjectFormat;
} | {
    /** tags = any of the project's tags; primary_tags = its primary ones. Value = tag name. */
    field: "tags" | "primary_tags";
    operator: TagFilterOperator;
    value: string;
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
export type TagFilterOperator = 'has' | '!has';
export type FilterField = "architect_approval" | "community_vetted" | "project_stage" | "accessibility" | "format" | "tags" | "primary_tags";
export type FilterValue = ArchitectApproval | CommunityVetted | ProjectStage | Accessibility | ProjectFormat | string;
//# sourceMappingURL=filter.d.ts.map