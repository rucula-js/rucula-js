import { field } from "../../../entities/form/field";
import { getConfigurationGlobal } from "../../../global/GlobalConfig";

export abstract class FieldInput{
    
    protected floatLabel = getConfigurationGlobal().floatLabel

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