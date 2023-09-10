import { FieldInput } from "./FieldInput";
import { field } from "../../../entities/form/field";

export class FieldStrategy{
    private field!:FieldInput;
    public setStrategy(field:FieldInput){
        this.field = field;
    }
    public create(field:field):HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement{
        return this.field.create(field);
    }
}