import { FieldInput } from "./FieldInput";
import { field } from "../../../entities/form/field";

export class FieldTextArea implements FieldInput{
    create(field:field): HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement {
        return createFieldTypeTextArea(field) as HTMLTextAreaElement;
    }
}

function createFieldTypeTextArea(field:field):HTMLTextAreaElement{
    
    const input = document.createElement('textarea');
    
    if(field?.disable){
        input.setAttribute("disabled","")
    }
    
    input.setAttribute("rows", String(field.textarea?.rows))

    if(field.textarea?.cols){
        input.setAttribute("cols", String(field.textarea?.cols))
    }
    else {
        input.style.width = "100%";
    }

    return input;
}