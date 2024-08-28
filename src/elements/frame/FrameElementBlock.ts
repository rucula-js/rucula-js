import { buttonsDOM } from "../../buttons/Button";
import { frame } from "../../entities/form/frame";
import { ManagmentObject } from "../../object/ObjectManagment";
import { Field } from "../form/Field";
import { fieldMenuContext } from "../form/Field/fieldMenuContext";
import { FrameElement } from "./FrameElement";
import { FrameEvent } from "./FrameEvent";
    
export class FrameElementBlock extends FrameElement{
    
    constructor(managmentObject:ManagmentObject,field:Field, frameEvent:FrameEvent) {
        super(managmentObject,field,frameEvent);
    }
    create(frame:frame){
    
        this.managmentObject.configFieldBlock(frame)
        
        const frameElement = this.createbase(frame)
        
        const div = document.createElement("div");
        
        div.classList.add("r-q-i")
        if(frame.vertical){
            div.style.flexDirection = "column"
        }
        
        frame.fields?.forEach(field => {
                    
            if(field?.button){
                let buttonElement = buttonsDOM.createButtonOrLink(field.button)
                let groupElement = this.field.createGroupOfButton(buttonElement as HTMLButtonElement|HTMLAnchorElement) as HTMLDivElement
                div.appendChild(groupElement)
                return
            }
            
            let fieldElement = this.field.create(field)
            let groupElement = this.field.createGroupOfInput(field, fieldElement) as HTMLDivElement
            div.appendChild(groupElement)
    
            fieldMenuContext.info.set({
                identity: field.identity,
                field: field
            })
        })
    
        this.setValuesDefined(frame, div);
        frameElement.appendChild(div)
        
        if(frame.requerid == false){
            this.managmentObject.tableDependency.moveNotResolvedToImbernate(frame.alias)
            this.frameEvent.managedFrame(div)
            this.frameEvent.cleanRequeridDependency(div)
        }
    
        return frameElement
    }
}