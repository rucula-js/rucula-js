import { field } from "../../entities/form/field";

export interface FieldInput{
    create(field:field):HTMLInputElement|HTMLSelectElement;
}