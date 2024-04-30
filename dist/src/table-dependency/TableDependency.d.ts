import { field } from "../entities/form/field";
import { fragmentField } from "../object/ObjectAliases";
export declare let tableDependency: {
    removeExpectedDependency: (identity: string) => void;
    createExpectedDependency: (field: field, fragmentField: fragmentField) => string;
    toApplyOrRemoveDependency: (fragment: fragmentField, value: any) => boolean;
    getDependenciesNotResolded: () => {
        identityObject: string;
        isHibernate: boolean;
        fieldsNotResolved: string[];
    }[];
    dependenciesCount: () => number;
    moveImbernateToNotResolved: (identityObject: string) => void;
    moveNotResolvedToImbernate: (identityObject: string) => void;
};
