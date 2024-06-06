declare let exportTableDependency: {
    removeExpectedDependency: (identity: string) => void;
    createExpectedDependency: (field: import("./entities/form/field").field, fragmentField: import("./object/ObjectAliases").fragmentField) => string;
    toApplyOrRemoveDependency: (fragment: import("./object/ObjectAliases").fragmentField, value: any) => boolean;
    getDependenciesNotResolded: () => {
        identityObject: string;
        isHibernate: boolean;
        fieldsNotResolved: string[];
    }[];
    dependenciesCount: () => number;
    moveImbernateToNotResolved: (identityObject: string) => void;
    moveNotResolvedToImbernate: (identityObject: string) => void;
};
export { exportTableDependency };
