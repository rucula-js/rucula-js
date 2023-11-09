import { constTypeInput } from "../const"

export function convertValueType(value:string, type:string):string|number|boolean{   
    
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

}