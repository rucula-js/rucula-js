import { constPrefixEventField } from "../../../const";
import { eventsCustom } from "../Field/EventsFieldsCustom";
import { FileEvent } from "./FileEvent";

export class FileEventCommon extends FileEvent{

    protected setEventListener(): void {

        this.input.addEventListener('focus',() => {
            
            let representation = this.getRepresentation();
            let beforeEventName = `${constPrefixEventField.BEFORE}.${representation.objectDto}.${representation.propertDto}.${representation.lineNumber}`
            let before = eventsCustom.field().get(beforeEventName)
            this.ruculaForm?.dispatchEvent(before)                        
            this.set()
        })

        this.input.addEventListener('input',() => {
            
            let representation = this.getRepresentation();
            let inputEventName = `${constPrefixEventField.INPUT}.${representation.objectDto}.${representation.propertDto}.${representation.lineNumber}`
            let input = eventsCustom.field().get(inputEventName)
            this.ruculaForm?.dispatchEvent(input)
            this.set()
        })

        this.input.addEventListener('focusout',() => {
            
            let representation = this.getRepresentation();
            let afterEventName  = `${constPrefixEventField.AFTER}.${representation.objectDto}.${representation.propertDto}.${representation.lineNumber}`
            let after = eventsCustom.field().get(afterEventName)
            this.ruculaForm?.dispatchEvent(after)
            this.set()
        })

    }
}

