import { FieldInput } from "./FieldInput";
import { setAtributesDataDefault } from "../ElementsInput";
import { FileEventCommon } from "../event/FileEventCommon";

export class FieldSelect extends FieldInput{
    
    create() {

        const select = document.createElement('select');
    
        this.input = select;

        setAtributesDataDefault(select,this.field)
        
        this.field.combo?.forEach(item => {
            
            const option = document.createElement('option')
            option.text = item["representation"]
            option.value = item["value"]
            select.appendChild(option)
            
        })
        this.setEvents();
        
        return select
    }

    protected setEvents(): void {
        new FileEventCommon(this.input, this.field)
    }
}
