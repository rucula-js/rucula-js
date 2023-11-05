import { formatCurrencyForNumber, formatNumberWithLocalization } from "../../Helpers/CurrencyHelper";
import { field } from "../../entities/form/field";
import { RepresentationField } from "../../entities/form/representationField";
import { setPropertDto } from "../../object/ObjectManagment";
import { setDependency } from "../../table-dependency/TableDependency";

export function setEventListenerTypeSimple(element:HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement, field?:field){
    
    element.addEventListener('input',(e) => {
        let input = e.target as HTMLInputElement | HTMLTextAreaElement
        
        set(input)
    })
}

export function setEventListenerTypeCheckbox(element:HTMLInputElement, field:field){
    
    element.addEventListener('change',(e) => {    
        setValue(e.target as HTMLInputElement)
    })

    function setValue(input:HTMLInputElement){

        if (input.checked == true){
            input.value = field.checkbox!.on
        }

        if (input.checked == false){
            input.value = field.checkbox!.off
        }

        set(input)
    }
}

export function setEventListenerTypeCurrency(element:HTMLInputElement, field:field){
    
    element.addEventListener('focusout',(e) => {
        SetValue(e.target as HTMLInputElement)
    })

    function SetValue(input:HTMLInputElement){

        let valueFormated = formatCurrencyForNumber(input.value);
        input.value = String(valueFormated);
        
        set(input);

        input.value = formatNumberWithLocalization(input.value)
    }
    
}

function set(input:HTMLInputElement|HTMLTextAreaElement){

    let representation = RepresentationField.prepareINPUTToField(input);
    setPropertDto(representation);
    setDependency(representation)

}