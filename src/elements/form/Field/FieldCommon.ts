
import { FieldInput } from "./FieldInput";
import { field } from "../../../entities/form/field";
import { setAtributesDataDefault } from "../ElementsInput";
import { constAttrInput, constTypeInput } from "../../../const";

export class FieldCommon implements FieldInput{
    create(field:field): HTMLInputElement|HTMLSelectElement {
        const input = createFieldTypeInputBasic(field)
        setAtributesDataDefault(input,field)
        return input as HTMLInputElement
    }
}

function createFieldTypeInputBasic(field:field): HTMLInputElement{

    const input = document.createElement('input');

    input.setAttribute(constAttrInput.ATTR_TYPE,field.type)

    if(field?.disable){
        input.setAttribute("disabled","")
    }

    input.type = field.type;
    
    if(field.type == "currency"){
        input.type = "text";
    }
    
    if (field.width > 0){
        input.style.width = `${field.width}px`  
    }
    if (field.width === undefined && allowsStandardWidth() ){
        input.classList.add("r-input-width-default")
    }
    
    input.classList.add("r-i-control")
    

    function allowsStandardWidth():boolean{
        
        let condition = 
            input.type == constTypeInput.TEXT ||
            input.type == constTypeInput.NUMBER ||
            input.type == constTypeInput.CHECKBOX

            return condition;
        }

    return input;
}