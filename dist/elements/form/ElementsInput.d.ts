import { field } from "../../entities/form/field";
export declare let fieldDOM: {
    create: (field: field) => HTMLDivElement | HTMLSelectElement;
    createSpanLabelIsRequerid: () => HTMLSpanElement;
    dependency: {
        focusFieldsWithDependency: () => void;
        cleanFocusDependency: (input: HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement) => void;
    };
};
