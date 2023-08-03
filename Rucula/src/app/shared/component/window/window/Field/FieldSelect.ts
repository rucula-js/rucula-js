import { FieldInput } from "./FieldInput";
import { field } from "../../entities/form/field";
import {createFieldSelect} from '../../elements/ElementsForm'

export class FieldSelect implements FieldInput{
    create(field:field): HTMLInputElement|HTMLSelectElement {
        return createFieldSelect(field) as HTMLSelectElement;
    }

}