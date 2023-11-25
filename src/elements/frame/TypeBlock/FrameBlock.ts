import { frame } from "../../../entities/form/frame";
import { setDefaultInput } from "../../Defaults";
import { createField } from "../../form/ElementsInput";
import { createFrame } from "../ElementFrame";

export function createFrameBlock(frame:frame){
    const frameElement = createFrame(frame)
    
    const div = document.createElement("div");
    
    div.classList.add("r-q-i")
    if(frame.vertical){
        div.style.flexDirection = "column"
    }
    frame.fields?.forEach(field => {
        
        setDefaultInput(field)
        
        let f = createField(field,{type:frame.type,objectDto:frame.objectDto}); 
        div.appendChild(f)
    })
    frameElement.appendChild(div)
    return frameElement
}