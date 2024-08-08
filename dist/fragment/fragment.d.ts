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
        /**
        * @param {string} identity
        * @return {fragmentField}
        */
        getForIdentity: (identity: string) => fragmentField;
        /**
         * @param {entityConfiguration} config
         * @return {fragmentField}
        */
        getForAliasAndPropert: (config: entityConfiguration) => fragmentField;
    };
};
