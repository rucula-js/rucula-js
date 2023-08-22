
import { FieldInput } from "./FieldInput";
import { field } from "../../../entities/form/field";
import { createFieldTypeInputBasic, setAtributesDataDefault } from "../ElementsInput";

export class FieldCommon implements FieldInput{
    create(field:field): HTMLInputElement|HTMLSelectElement {
        const input = createFieldTypeInputBasic(field)
        setAtributesDataDefault(input,field)
        return input as HTMLInputElement
    }
}