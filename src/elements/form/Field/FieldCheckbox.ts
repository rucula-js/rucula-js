import { FieldInput } from "./FieldInput";
import { field } from "../../../entities/form/field";

export class FieldCheckbox implements FieldInput{
    create(field:field):HTMLInputElement|HTMLSelectElement {
        return createFieldCheckbox(field) as HTMLInputElement
    }
}

function createFieldCheckbox(field:field):HTMLInputElement{  
    
    var input = document.createElement("input")
    
    input.type = "checkbox";

    if(field.value == field.checkbox!.on){
        input.checked = true
    }
    
    return input;
}