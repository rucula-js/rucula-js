import { FieldInput } from "./FieldInput";
import { field } from "../../../entities/form/field";
import { createFieldCheckbox } from "../ElementsInput";

export class FieldCheckbox implements FieldInput{
    create(field:field):HTMLInputElement|HTMLSelectElement {
        return createFieldCheckbox(field) as HTMLInputElement
    }
}