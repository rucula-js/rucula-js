import { RepresentationField } from "../../../entities/form/representationField";
import { KeyEventAdd, KeyEventClear, KeyEventGetIndex } from "../../../global/KeyEvents";
import { addLine, removeLine } from "./FrameLine";

'use strict';

let currentLineElement:HTMLElement
let inputTargetEvent:HTMLInputElement

export function eventKeyDownKeyUpLineFrame(element:HTMLElement){
    element.addEventListener('keydown',(event)=> {
        crudLineQuadro(event)
    })
      element.addEventListener('keyup',(event)=> {
        KeyEventClear();
    })
}
function crudLineQuadro(event:Event){

    const key = (event as KeyboardEvent).key;
    KeyEventAdd(key)

    let nextLine = null;
    let previousLine = null;

    inputTargetEvent = event.target as HTMLInputElement
    currentLineElement = (event.currentTarget as HTMLElement)

    if(KeyEventGetIndex(0) == "ArrowUp"){
        event.preventDefault();
        previousLine = (currentLineElement.previousSibling as HTMLTableRowElement)

        let split = inputTargetEvent.getAttribute("name")!.split(".")
        let type = split[0]
        let object = split[1]
        let propert = split[2]

        var atribute =`input[name^="${type}.${object}.${propert}."]`;
        let varttt = previousLine?.querySelector(atribute);
        (varttt as HTMLInputElement)?.focus()
    }

    if(KeyEventGetIndex(0) == "ArrowDown"){
        event.preventDefault();
        nextLine = (currentLineElement.nextSibling as HTMLTableRowElement)

        let split = inputTargetEvent.getAttribute("name")!.split(".")
        let type = split[0]
        let object = split[1]!
        let propert = split[2]!

        var atribute =`input[name^="${type}.${object}.${propert}."]`;
        let varttt = nextLine?.querySelector(atribute);
        (varttt as HTMLInputElement)?.focus()
    }

    if (KeyEventGetIndex(0) == undefined || KeyEventGetIndex(1) == undefined) return

    if (KeyEventGetIndex(0) == "Control" && KeyEventGetIndex(1) ==  "Enter"){
        event.preventDefault();
        currentLineElement.after(addLine(RepresentationField.prepareINPUTToField(inputTargetEvent)));
    }
    if (KeyEventGetIndex(0) == "0" && KeyEventGetIndex(1) == "Control"){
        event.preventDefault();
        removeLine(currentLineElement,inputTargetEvent);
    }
    KeyEventClear();
}