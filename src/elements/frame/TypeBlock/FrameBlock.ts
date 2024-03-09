import { frame } from "../../../entities/form/frame";
import { fieldDOM } from "../../form/ElementsInput";
import { createFrame } from "../ElementFrame";

export function createFrameBlock(frame:frame){
    const frameElement = createFrame(frame)
    
    const div = document.createElement("div");
    
    div.classList.add("r-q-i")
    if(frame.vertical){
        div.style.flexDirection = "column"
    }
    
    frame.fields?.forEach(field => {
                
        let fieldElement = fieldDOM.create(field)
        div.appendChild(fieldElement)
    })

    frameElement.appendChild(div)
    return frameElement
}