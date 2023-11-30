import { FileEvent } from "./FileEvent";

export class FileEventCommon extends FileEvent{

    protected setEventListener(): void {
        this.input.addEventListener('input',() => {
            this.set()
        })
    }
}

