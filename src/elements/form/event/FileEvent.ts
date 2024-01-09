import { constIdBaseWindow } from "../../../const";
import { field } from "../../../entities/form/field";
import { RepresentationField } from "../../../entities/form/representationField";
import { setPropertDto } from "../../../object/ObjectManagment";
import { setDependency } from "../../../table-dependency/TableDependency";

export abstract class FileEvent{
    
    protected input: HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement
    protected field?: field //? This property is used to support some events
    
    protected ruculaForm = document.getElementById(constIdBaseWindow.FORM_RUCULA_JS)
    
    constructor(input: HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement,field: field) {

        this.input = input
        this.field = field
        this.setEventListener()
    }

    protected abstract setEventListener():void;
    
    protected set(): void {
        
        let representation = RepresentationField.prepareINPUTToField(this.input);
        setPropertDto(representation);
        setDependency(representation)
    }
    
    protected getRepresentation(){
        return RepresentationField.prepareINPUTToField(this.input);
    }

}  