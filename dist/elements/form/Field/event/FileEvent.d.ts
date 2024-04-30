import { field } from "../../../../entities/form/field";
export declare abstract class FileEvent {
    protected input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    protected field: field;
    protected ruculaForm: HTMLElement;
    constructor(input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, field: field);
    dispatchEvent(prefixEvent: string): void;
    protected abstract setEventListener(): void;
    protected set(): void;
}
