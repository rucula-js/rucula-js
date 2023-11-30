
import { FieldInput } from "./FieldInput";
import { constAttrInput, constTypeInput } from "../../../const";
import { FileEventCommon } from "../event/FileEventCommon";
import { FileEventCurrency } from "../event/FileEventCurrency";

export class FieldCommon extends FieldInput{
    
    create(){
        

        const input = document.createElement('input');
        
        this.input = input;

        input.setAttribute(constAttrInput.ATTR_TYPE,this.field.type)

        if(this.field?.disable){
            input.setAttribute("disabled","")
        }

        input.type = this.field.type;
        
        if(this.field.type == "currency"){
            input.type = "text";
        }
        
        if (this.field.width > 0){
            input.style.width = `${this.field.width}px`  
        }
        if (this.field.width === undefined && allowsStandardWidth() ){
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
        this.setEvents()
    }

    protected setEvents(): void {

        new FileEventCommon(this.input, this.field);
        
        if(this.input.type == constTypeInput.CURRENCY){
            new FileEventCurrency(this.input, this.field);    
        }
    }
}
