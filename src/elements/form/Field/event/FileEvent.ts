import { field } from "../../../../entities/form/field";
import { managmentObject } from "../../../../object/ObjectManagment";
import { windowBaseDOM } from "../../../window-base/WindowBase";
import { eventsCustom } from "../../Field/EventsFieldsCustom";

export abstract class FileEvent{
    
    protected input: HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement
    protected field: field //? This property is used to support some events
    
    protected ruculaForm = windowBaseDOM.getElementRoot()

    constructor(input: HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement,field: field) {

        this.input = input
        this.field = field
        this.setEventListener()
    }

    dispatchEvent(prefixEvent:string){

        let identity = this.input.getAttribute("identity")!;
        
        let fragment = managmentObject.fragment.getFragmentForIdentity(identity)
         
        let eventName = fragment.config.line ? `${prefixEvent}.${fragment.config.alias}.${fragment.config.propertDto}.${fragment.config.line}` : `${prefixEvent}.${fragment.config.alias}.${fragment.config.propertDto}`
        
        let event = eventsCustom.field().get(eventName)
        
        this.ruculaForm?.dispatchEvent(event)
        
    }
    
    protected abstract setEventListener():void;
    
    protected set(): void {

        let identity = this.input.getAttribute("identity")!

        managmentObject.object.field.setValueContextIdentity(identity,this.field?.type, this.input.value)
    }
}  