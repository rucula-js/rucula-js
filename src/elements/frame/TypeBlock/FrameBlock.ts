import { buttonsDOM } from "../../../buttons/Button";
import { frame } from "../../../entities/form/frame";
import { exportManagmentObject, exportTableDependency } from "../../../exports";
import { fieldDOM } from "../../form/ElementsInput";
import { fieldMenuContext } from "../../form/Field/fieldMenuContext";
import { createFrame } from "../ElementFrame";
import { frameEvent } from "../FrameEvent";
import { frameValues } from "../FrameValues";

export function createFrameBlock(frame:frame){
    
    exportManagmentObject.frame.configFieldBlock(frame)
    
    const frameElement = createFrame(frame)
    
    const div = document.createElement("div");
    
    div.classList.add("r-q-i")
    if(frame.vertical){
        div.style.flexDirection = "column"
    }
    
    frame.fields?.forEach(field => {
                
        if(field?.button){
            let buttonElement = buttonsDOM.createButtonOrLink(field.button)
            let groupElement = fieldDOM.createGroupOfButton(buttonElement as HTMLButtonElement|HTMLAnchorElement) as HTMLDivElement
            div.appendChild(groupElement)
            return
        }
        
        let fieldElement = fieldDOM.create(field)
        let groupElement = fieldDOM.createGroupOfInput(field, fieldElement) as HTMLDivElement
        div.appendChild(groupElement)

        fieldMenuContext.info.set({
            identity: field.identity,
            field: field
        })
    })

    frameValues.setValuesDefined(frame, div);
    frameElement.appendChild(div)
    
    if(frame.requerid == false){
        exportTableDependency.moveNotResolvedToImbernate(frame.alias)
        frameEvent.managedFrame(div)
        frameEvent.cleanRequeridDependency(div)
    }

    return frameElement
}