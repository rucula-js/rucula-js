import { constInputClass, constPrefixEventField } from "../../../const";
import { FileEvent } from "./FileEvent";

export class FileEventCommon extends FileEvent{

    protected setEventListener(): void {

        this.input.addEventListener('focus',() => {
            this.input.classList.remove(constInputClass.FOCUS_IN_INPUT_WITH_DEPENDENCY)
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

