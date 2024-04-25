import { constTypeInput } from "../const"
import { field } from "../entities/form/field";

export function convertValueType(value:string, type:string|string[2]):string|number|boolean{   
    
    type = GetType(type)
    
    if(isBoolean()){
        return convertToBoolean()
    }

    if(isNumeric()){
        return convertToNumeric();
    }

    return value;
    
    
    function isNumeric():boolean{
        return  type == constTypeInput.CURRENCY ||
                type == constTypeInput.NUMBER
    }
    
    function isBoolean():boolean{
        return type == constTypeInput.BOOLEAN    
    }
    
    function convertToNumeric():number{
        return Number(value)
    }

    function convertToBoolean():boolean{

        if(value == "true"){
            return true
        }
        else{
            return false;
        }        
    }

    function GetType(type:string|string[2]){
        if(type.length == 2){
            return type[1]
        }
        return type
    }

}

export function alignItem(field:field, item: HTMLTableCellElement | HTMLInputElement){
    
    if(field.type == constTypeInput.TEXT || field.type == undefined || field.type[0] == constTypeInput.SELECT){        
        item.classList.add('r-t-align-left')
    }

    if(field.type == constTypeInput.NUMBER || field.type == constTypeInput.CURRENCY){
        
        item.classList.add('r-t-align-right')
    }

    if(field.type[0] == constTypeInput.CHECKBOX){ 
        item.classList.add('r-t-align-center')

    }
}
