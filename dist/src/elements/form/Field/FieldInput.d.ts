import { field } from "../../../entities/form/field";
export declare abstract class FieldInput {
    protected floatLabel: boolean;
    protected field: field;
    input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    constructor(field: field);
    protected abstract create(): void;
    protected abstract setEvents(): void;
    protected setWidth(): void;
    exec(): void;
}
