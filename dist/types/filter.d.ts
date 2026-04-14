export type FilterRule = {
    field: string;
    operator: '=' | '!=';
    value: string;
};
export type FilterGroup = {
    all?: (FilterRule | FilterGroup)[];
    any?: (FilterRule | FilterGroup)[];
};
//# sourceMappingURL=filter.d.ts.map