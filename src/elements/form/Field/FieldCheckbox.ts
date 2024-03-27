import { FieldInput } from "./FieldInput";
import { FileEventCheckBox } from "./event/FileEventCheckBox";

export class FieldCheckbox extends FieldInput{
    
    create(){
        
        var input = document.createElement("input")
    
        this.input = input;
        
        input.type = "checkbox";
    
        if(this.field.value == this.field.checkbox!.on){
            input.checked = true
        }

        this.setEvents()
        return input;
    }
    protected setEvents(): void {
        new FileEventCheckBox(this.input, this.field)
    }

}



