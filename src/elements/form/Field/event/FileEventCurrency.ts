import { formatCurrencyForNumber, formatNumberWithLocalization } from "../../../../Helpers/CurrencyHelper";
import { FileEvent } from "./FileEvent";

export class FileEventCurrency extends FileEvent{

    protected setEventListener(): void {
        
        this.input.addEventListener('focusout',(e) => {
            
            let element = e.target as HTMLInputElement;

            let valueFormated = formatCurrencyForNumber(element.value);
            this.input.value = String(valueFormated);
            
            this.set();
            
            this.input.value = formatNumberWithLocalization(element.value)  
        })
    }
}

