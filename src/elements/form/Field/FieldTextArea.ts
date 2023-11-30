import { FileEventCommon } from "../event/FileEventCommon";
import { FieldInput } from "./FieldInput";

export class FieldTextArea extends FieldInput{
    
    create() {

        const input = document.createElement('textarea');
        
        this.input = input;
        
        if(this.field?.disable){
            input.setAttribute("disabled","")
        }
        
        input.setAttribute("rows", String(this.field.textarea?.rows))

        if(this.field.textarea?.cols){
            input.setAttribute("cols", String(this.field.textarea?.cols))
        }
        else {
            input.style.width = "100%";
        }

        return input;
    }
    
    protected setEvents(): void {
        new FileEventCommon(this.input, this.field)
    }
}