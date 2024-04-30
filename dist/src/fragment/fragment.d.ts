import { entityConfiguration, fragmentField, fragmentObject } from "../object/ObjectAliases";
export declare let fragment: {
    objects: {
        add: (object: fragmentObject) => void;
        getForFieldIdentity: (identity: string) => fragmentObject;
        getForIdentity: (identity: string) => fragmentObject;
        getForAlias: (alias: string) => fragmentObject;
    };
    fields: {
        add: (field: fragmentField) => void;
        remove: (fragment: fragmentField) => void;
        removeLine: (objectIDentity: string, line: number) => void;
        getForIdentity: (identity: string) => fragmentField;
        getForAliasAndPropert: (config: entityConfiguration) => fragmentField | undefined;
    };
};
