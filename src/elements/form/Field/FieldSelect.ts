import { FieldInput } from "./FieldInput";
import { field } from "../../../entities/form/field";
import { setAtributesDataDefault } from "../ElementsInput";

export class FieldSelect implements FieldInput{
    create(field:field): HTMLInputElement|HTMLSelectElement {
        return createFieldSelect(field) as HTMLSelectElement;
    }
}

export function createFieldSelect(field:field):HTMLSelectElement{  
    
    const select = document.createElement('select');
    
    setAtributesDataDefault(select,field)
    
    field.combo?.forEach(item => {
          
        const option = document.createElement('option')
        option.text = item["representation"]
        option.value = item["value"]
        select.appendChild(option)
        
    })
    return select
}