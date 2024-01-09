import { constPrefixEventField } from "../../../const";
import { getCustomEvent } from "../Field/EventsFieldsCustom";
import { FileEvent } from "./FileEvent";

export class FileEventCommon extends FileEvent{

    protected setEventListener(): void {

        this.input.addEventListener('focus',() => {
            
            let representation = this.getRepresentation();
            let beforeEventName = `${constPrefixEventField.BEFORE}.${representation.objectDto}.${representation.propertDto}`
            let before = getCustomEvent(beforeEventName)
            this.ruculaForm?.dispatchEvent(before)                        
            this.set()
        })

        this.input.addEventListener('input',() => {
            
            let representation = this.getRepresentation();
            let inputEventName = `${constPrefixEventField.INPUT}.${representation.objectDto}.${representation.propertDto}`
            let input = getCustomEvent(inputEventName)
            this.ruculaForm?.dispatchEvent(input)
            this.set()
        })

        this.input.addEventListener('focusout',() => {
            
            let representation = this.getRepresentation();
            let afterEventName  = `${constPrefixEventField.AFTER}.${representation.objectDto}.${representation.propertDto}`
            let after = getCustomEvent(afterEventName)
            this.ruculaForm?.dispatchEvent(after)
            this.set()
        })

    }
}

