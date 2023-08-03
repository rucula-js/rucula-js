import { FieldInput } from "./FieldInput";
import { field } from "../../entities/form/field";
import {createFieldCheckbox} from '../../elements/ElementsForm'

export class FieldCheckbox implements FieldInput{
    create(field:field):HTMLInputElement|HTMLSelectElement {
        return createFieldCheckbox(field) as HTMLInputElement
    }
}