import { constTypeInput } from "../../../const";
import { field } from "../../../entities/form/field";
import { ruculaGlobal } from "../../../global/GlobalConfig";

export abstract class FieldInput{
    
    protected floatLabel = ruculaGlobal.getConfigurationGlobal().floatLabel

    protected field:field
    public input!: HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement

    constructor(field:field) {
        this.field = field;
    }

    protected abstract create():void;
    protected abstract setEvents():void;
    
    protected setWidth(){

        if (this.field.width > 0){
            this.input.style.width = `${this.field.width}px`  
        }
        if (this.field.width === undefined && ( this.input.type == constTypeInput.TEXT ||
                                                this.input.type == constTypeInput.NUMBER ||
                                                this.input.type == constTypeInput.CHECKBOX ||
                                                this.input.type == constTypeInput.SELECT)){
                                                    
            this.input.classList.add("r-input-width-default")
        }
    }

    exec(){
        this.create();
    }
}