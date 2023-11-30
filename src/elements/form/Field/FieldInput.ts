import { field } from "../../../entities/form/field";

export abstract class FieldInput{
    
    protected field:field
    public input!: HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement

    constructor(field:field) {
        this.field = field;
    }

    protected abstract create():void;
    protected abstract setEvents():void;
    
    exec(){
        this.create();
    }
}