import { field } from "../../../entities/form/field";
export declare let fieldMenuContext: {
    init: () => void;
    info: {
        set: (fieldInfo: {
            identity: string;
            field: field;
        }) => void;
        get: (identity: string) => {
            identity: string;
            field: field;
        } | undefined;
    };
};
