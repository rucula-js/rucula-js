import { field } from "../../entities/form/field";
export declare let fieldDOM: {
    create: (field: field) => HTMLInputElement | HTMLSelectElement;
    createSpanLabelIsRequerid: () => HTMLSpanElement;
    createGroupOfInput: (field: field, element: HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement) => HTMLDivElement;
    createGroupOfButton: (element: HTMLButtonElement | HTMLAnchorElement) => HTMLDivElement;
    dependency: {
        focusFieldsWithDependency: () => void;
        cleanFocusDependency: (input: HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement) => void;
    };
};
