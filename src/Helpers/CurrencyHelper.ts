import { getLocalization } from "../global/GlobalConfig";

function formatCurrencyForNumber(valueCurrency:string):number{
    valueCurrency = valueCurrency.replace(/[^-0-9,.\s]/g,"")
    let value:string[] = valueCurrency.split(""); 
    let decimal = false;
    for (let i:number = valueCurrency.length-1; i >=0; i--) {

        if((value[i] == "," || value[i] == "." || value[i] == " ") && decimal){ 
            value.splice(i,1,"")
        }
        if((value[i] == "," || value[i] == ".") && decimal == false){
            decimal = true;
            value.splice(i,1,".")
        }
    }
    return Number(value.join(""))
}

function formatNumberWithLocalization(value:number|string):string{
    
    if(typeof value === "string") 
        value = Number(value)
    let localicationConfig = getLocalization();
    return new Intl.NumberFormat(
        localicationConfig.locales, 
        { 
            style: 'currency', 
            currency: localicationConfig.currency,
            maximumFractionDigits:5
        }).format(value)
}
export {
    formatCurrencyForNumber,
    formatNumberWithLocalization
}