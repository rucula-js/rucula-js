import { FileEvent } from "./FileEvent";

export class FileEventCheckBox extends FileEvent{

    protected setEventListener(): void {

        this.input.addEventListener('change',(e) => {    
            let element = e.target as HTMLInputElement
    
            if (element.checked == true){
                element.value = this.field!.checkbox!.on
            }
    
            if (element.checked == false){
                element.value = this.field!.checkbox!.off
            }
            this.set()
        })
    }
}

