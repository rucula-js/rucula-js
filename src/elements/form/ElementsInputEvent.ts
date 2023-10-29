import { formatCurrencyForNumber, formatNumberWithLocalization } from "../../Helpers/CurrencyHelper";
import { field } from "../../entities/form/field";
import { RepresentationField } from "../../entities/form/representationField";
import { setPropertDto } from "../../object/ObjectManagment";
import { setDependency } from "../../table-dependency/TableDependency";

export function setEventListenerForInput(element:HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement, field?:field){
    element.addEventListener('focusout',(e) => {
        setValue(e.target as HTMLInputElement)
    })
    function setValue(input:HTMLInputElement){
        if(field?.type == "currency"){
            let valueFormated = formatCurrencyForNumber(input.value);
            input.value = String(valueFormated);
            let field = RepresentationField.prepareINPUTToField(input);
            setPropertDto(field);
            setDependency(field);
            input.value = formatNumberWithLocalization(input.value)
        }
        else{
            let field = RepresentationField.prepareINPUTToField(input);
            setPropertDto(field);
            setDependency(field);    
        } 
    }
}