import { KeyEventAdd, KeyEventClear, KeyEventGetIndex } from "../../../global/KeyEvents";
import { frameLineDOM } from "./FrameLine";

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

    let identity = inputTargetEvent.getAttribute("identity")

    let inputs = currentLineElement.querySelectorAll('input')

    let positionInput = 0;

    for (let index = 0; index < inputs.length; index++) {
        
        if (inputs[index].getAttribute("identity") == identity){

            positionInput = index
            break
        }
    }

    if(KeyEventGetIndex(0) == "ArrowUp"){
        
        event.preventDefault();

        previousLine = (currentLineElement.previousSibling as HTMLTableRowElement)

        let inputs = previousLine?.querySelectorAll('input')
        
        if(inputs){
            inputs[positionInput]?.focus()
        }
    }

    if(KeyEventGetIndex(0) == "ArrowDown"){
        
        event.preventDefault();
        nextLine = (currentLineElement.nextSibling as HTMLTableRowElement)
        
        let inputs = nextLine?.querySelectorAll('input')
        
        if(inputs){
            inputs[positionInput]?.focus()
        }
    }

    if (KeyEventGetIndex(0) == undefined || KeyEventGetIndex(1) == undefined){
        return
    } 

    if (KeyEventGetIndex(0) == "Control" && KeyEventGetIndex(1) ==  "Enter"){
        event.preventDefault();
        let newline = frameLineDOM.addLine(inputTargetEvent.getAttribute("identity")!)
        currentLineElement.after(newline);
    }
    if (KeyEventGetIndex(0) == "0" && KeyEventGetIndex(1) == "Control"){
        event.preventDefault();
        frameLineDOM.removeLine(currentLineElement,inputTargetEvent);
    }
    
    KeyEventClear();
}