
import { FieldInput } from "./FieldInput";
import { field } from "../../entities/form/field";
import * as unitElement from '../../elements/ElementsForm'

export class FieldCommon implements FieldInput{
    create(field:field): HTMLInputElement|HTMLSelectElement {
        const input = unitElement.createFieldTypeInputBasic(field)
        unitElement.setAtributesDataDefault(input,field)
        return input as HTMLInputElement
    }
}