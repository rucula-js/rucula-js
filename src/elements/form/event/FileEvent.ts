import { constIdBaseWindow } from "../../../const";
import { field } from "../../../entities/form/field";
import { managmentObject } from "../../../object/ObjectManagment";
import { tableDependency } from "../../../table-dependency/TableDependency";
import { eventsCustom } from "../Field/EventsFieldsCustom";

export abstract class FileEvent{
    
    protected input: HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement
    protected field?: field //? This property is used to support some events
    
    protected ruculaForm = document.getElementById(constIdBaseWindow.FORM_RUCULA_JS)
    
    constructor(input: HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement,field: field) {

        this.input = input
        this.field = field
        this.setEventListener()
    }

    dispatchEvent(prefixEvent:string){

        let identity = this.input.getAttribute("identity")!;
        let fragment = managmentObject.fragment.getFragmentTypeField(identity)
         
        let eventName = `${prefixEvent}.${fragment.config.alias}.${fragment.config.propertDto}.${fragment.config.line}`
        let before = eventsCustom.field().get(eventName)
        this.ruculaForm?.dispatchEvent(before)          
    }
    
    protected abstract setEventListener():void;
    
    protected set(): void {

        let identity = this.input.getAttribute("identity")!

        tableDependency.set(identity,this.input.value)
        managmentObject.object.field.setValueContextIdentity(identity,this.input.value)
    }
}  