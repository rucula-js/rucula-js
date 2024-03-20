import { constIdBaseWindow } from "../../../const";
import { field } from "../../../entities/form/field";
import { managmentObject } from "../../../object/ObjectManagment";
import { windowBaseDOM } from "../../window-base/WindowBase";
import { eventsCustom } from "../Field/EventsFieldsCustom";

export abstract class FileEvent{
    
    protected input: HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement
    protected field?: field //? This property is used to support some events
    
    protected ruculaForm = windowBaseDOM.getPrincipalElementRucula()

    constructor(input: HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement,field: field) {

        this.input = input
        this.field = field
        this.setEventListener()
    }

    dispatchEvent(prefixEvent:string){

        let identity = this.input.getAttribute("identity")!;
        
        let fragment = managmentObject.fragment.getFragmentTypeField(identity)
         
        let eventName = `${prefixEvent}.${fragment.config.alias}.${fragment.config.propertDto}.${fragment.config.line}`
        
        let event = eventsCustom.field().get(eventName)
        
        console.log(this.ruculaForm)
        this.ruculaForm?.dispatchEvent(event)
        
    }
    
    protected abstract setEventListener():void;
    
    protected set(): void {

        let identity = this.input.getAttribute("identity")!

        managmentObject.object.field.setValueContextIdentity(identity,this.input.value)
    }
}  