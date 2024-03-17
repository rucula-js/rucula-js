import { constInputClass, constPrefixEventField } from "../../../const";
import { fieldDOM } from "../ElementsInput";
import { FileEvent } from "./FileEvent";

export class FileEventCommon extends FileEvent{

    protected setEventListener(): void {

        this.input.addEventListener('focus',() => {
            
            fieldDOM.dependency.cleanFocusDependency(this.input)
            this.dispatchEvent(constPrefixEventField.BEFORE);
            this.set()
        })

        this.input.addEventListener('input',() => {
            this.set()
            this.dispatchEvent(constPrefixEventField.INPUT);
        })

        this.input.addEventListener('focusout',() => {            
            this.dispatchEvent(constPrefixEventField.AFTER);
            this.set()
        })
    }
}

