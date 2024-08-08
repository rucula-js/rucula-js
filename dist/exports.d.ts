export declare let exportTableDependency: {
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
export declare let exportManagmentObject: {
    frame: {
        initObjects: (frames: import("./entities/form/frame").frame[]) => void;
        configFieldBlock: (frame: import("./entities/form/frame").frame) => void;
        addLine: (frame: import("./entities/form/frame").frame) => void;
    };
    field: {
        type: (identityField: string) => string;
    };
    object: {
        field: {
            convertAliasToIdenty: (config: string) => string;
            setValueContextAlias: (config: string, value: any) => void;
            setValueContextIdentity: (identity: string, type: string, value: any) => void;
        };
        object: {
            objectFull: () => any;
            objectSeparate: () => any;
            objectUnique: (alias: string) => any;
            objectUniqueLine: (alias: string, line: number) => any;
            count: (identity: string) => number;
            removeLine: (identity: string, line: number) => void;
            getPropert: (config: string) => any;
        };
    };
    fragment: {
        getFragmentForIdentity: (identity: string) => import("./object/ObjectAliases").fragmentField;
        removeFragmentsLine: (objectIDentity: string, line: number) => void;
        removeFragment: (identity: string) => void;
    };
};
export declare let exportPaginationEvents: {
    headerSearch: (gridSearch: boolean) => void;
    fotter: (gridFooter: boolean) => void;
};
