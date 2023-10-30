import { formatCurrencyForNumber, formatNumberWithLocalization } from "../../Helpers/CurrencyHelper";
import { field } from "../../entities/form/field";
import { RepresentationField } from "../../entities/form/representationField";
import { setPropertDto } from "../../object/ObjectManagment";
import { setDependency } from "../../table-dependency/TableDependency";

export function setEventListenerForInput(element:HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement, field?:field){
    
    element.addEventListener('input',(e) => {
        
        setValue(e.target as HTMLInputElement)
    })
    
    function setValue(input:HTMLInputElement){

        if(field?.type == "currency"){

            setValueTypeCurrency();
            return;
        }

        if(field?.type == "checkbox"){
            
            if (input.checked == true){
                input.value = field.checkbox!.on
            }

            if (input.checked == false){
                input.value = field.checkbox!.off
            }
        }

        set();
        
        function setValueTypeCurrency(){

            let valueFormated = formatCurrencyForNumber(input.value);
            input.value = String(valueFormated);
            
            set();
            
            input.value = formatNumberWithLocalization(input.value)
        }

        function set(){
            
            let representation = RepresentationField.prepareINPUTToField(input);
            setPropertDto(representation);
            setDependency(representation)
        }
    }
}