import { FieldInput } from "./FieldInput";
import { field } from "../../../entities/form/field";
import { createFieldTypeTextArea } from "../ElementsInput";

export class FieldTextArea implements FieldInput{
    create(field:field): HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement {
        return createFieldTypeTextArea(field) as HTMLTextAreaElement;
    }

}