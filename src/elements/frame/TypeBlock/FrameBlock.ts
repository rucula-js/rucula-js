import { frame } from "../../../entities/form/frame";
import { createField } from "../../form/ElementsInput";
import { createFrame } from "../ElementFrame";

export function createFrameBlock(frame:frame){
    const frameElement = createFrame(frame)
    let sortFields = frame.fields!.sort(c => c.sequence);

    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.flexWrap = "wrap";
    
    sortFields.forEach(field => {
        let f = createField(field,{type:frame.type,objectDto:frame.objectDto}); 
        div.appendChild(f)
    })
    frameElement.appendChild(div)
    return frameElement
}