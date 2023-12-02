import { constGroupFormat, constTypeFrame, constTypeInput } from "../../const";
import { field } from "../../entities/form/field";
import { RepresentationField } from "../../entities/form/representationField";
import { setPropertDto } from "../../object/ObjectManagment";
import { setEventForInformationInputQuadro } from "../../popper/PopperEvent";
import { setDependency } from "../../table-dependency/TableDependency";
import { FieldCheckbox } from "./Field/FieldCheckbox";
import { FieldCommon } from "./Field/FieldCommon";
import { FieldRadio } from "./Field/FieldRadio";
import { FieldSelect } from "./Field/FieldSelect";
import { FieldStrategy } from "./Field/FieldStrategy";
import { FieldTextArea } from "./Field/FieldTextArea";
import { formulaGetValuePropert, formulaLine, formulaMath, formulaSUM } from "./formulas/Formulas";

export function createField(field:field,frame:{type:string,objectDto:string,line?:number}):HTMLDivElement|HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement{
  
    let element:HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement
    let fieldStrategy:FieldStrategy = new FieldStrategy();

    checkTypeField(field.type)
    
    if(isSimple()){
        fieldStrategy.setStrategy(new FieldCommon(field))
    }
    
    if(field.type == constTypeInput.SELECT) {
    fieldStrategy.setStrategy(new FieldSelect(field))
    }

    if(isCheckBox()){
        fieldStrategy.setStrategy(new FieldCheckbox(field))
    }

    if(isTextArea()){
        fieldStrategy.setStrategy(new FieldTextArea(field))
    }
    
    if(isRadio()) {
        fieldStrategy.setStrategy(new FieldRadio(field))
    }

    element = fieldStrategy.create();

    if(field.maxLength){
        element.setAttribute('maxlength',`${field.maxLength}`);
    }
    
    setEventForInformationInputQuadro(element)

    addAttributesSetAndName(element,{   
        type:frame.type,
        object:frame.objectDto,
        propert:String(field.propertDto),
        line:frame.line
    })

    let repField = RepresentationField.prepareINPUTToField(element)
    setPropertDto(repField);
    setDependency(repField);

    if( typeof(FieldStrategy) == typeof(FieldCommon)){    
        setValueOrFormula(field,element as HTMLInputElement,frame)
    }

    if(frame.type == constTypeFrame.BLOCK){
        return  createGroupOfInput(field,element) as HTMLDivElement
    }
    
    function isSimple(){
            
        let condition =  
        field.type == constTypeInput.NUMBER || 
        field.type == constTypeInput.TEXT || 
        field.type == constTypeInput.DATE ||
        field.type == constTypeInput.CURRENCY
        
        return condition;
    }

    function isRadio(){
        return field.type[0]  == constTypeInput.RADIO
    }

    function isCheckBox(){
        return field.type[0] == constTypeInput.CHECKBOX
    }
    
    function isTextArea(){
        return field.type == constTypeInput.TEXT_AREA
    }

    return element as HTMLSelectElement|HTMLInputElement
}

function checkTypeField(type: string|string[2]){

    let option = type;
    
    if(Array.isArray(type)){
        option = type[1]
    }
    
    let types = [
        "text",
        "number",
        "select",
        "checkbox",
        "date",
        "currency",
        "textarea",
        "bool",
        "radio"
    ]

    if(types.indexOf(option) == -1){
        throw new Error(`Field type "${option}" is not allowed`);
    }
}

function createGroupOfInput(field:field, element:HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement):HTMLDivElement{
    
    const div = document.createElement('div');
    div.classList.add('r-g-i-i');

    const label = document.createElement('label');

    label.textContent = field.description
    
    if (field.requerid == true){
      label.textContent = label.textContent
      label.append(createSpanLabelIsRequerid().cloneNode(true))
    }
    
    if(field.groupFormat == undefined){
        label.classList.add('r-label-block')
        div.appendChild(label)
        div.appendChild(element)
    }

    if(field.groupFormat == constGroupFormat.DOWN){
        label.classList.add('r-label-block')
        div.appendChild(element)
        div.appendChild(label)
    }

    if(field.groupFormat  == constGroupFormat.LEFT){
        label.classList.add('r-label-inline')
        element.style.marginRight = "8px"
        div.appendChild(element)   
        div.appendChild(label)
    }
    
    if(field.groupFormat  == constGroupFormat.RIGTH){
        label.classList.add('r-label-inline')
        element.style.marginLeft = "8px"
        div.appendChild(label)
        div.appendChild(element)
    }

    return div;
}

export function createSpanLabelIsRequerid():HTMLSpanElement{

    const span = document.createElement('span'); 
    span.innerText = " *"
    span.style.color = "red";

    return span
}


function addAttributesSetAndName(node:HTMLElement,frame:{type:string, object:string, propert:string,line?:number}){
    
    let name = `${frame.type}.${frame.object}.${frame.propert}`
    let set = `${frame.object}.${frame.propert}`

    if(frame.type == constTypeFrame.LINE){
        name+=`.${frame.line}`;
        set+=`.${frame.line}`;
    }

    node.setAttribute('name',name);
    node.setAttribute('set',set);
}

export function setValueOrFormula(field:field,input:HTMLInputElement,frame:{type:string,objectDto:string,line?:number}){
    
    if(field.value == undefined && field.formula == undefined){
        return;
    } 

    if(field.value){
        
        input.value = field.value;        
        let repField = RepresentationField.prepareINPUTToField(input)
        setPropertDto(repField);
        setDependency(repField);
        
        return;
    }

    field.formula?.forEach(formula => {

        formulaGetValuePropert(formula, input);
        formulaMath(formula, input,frame)
        formulaLine(formula, input,field,frame)
        formulaSUM(formula, input,field,frame)
        let repField = RepresentationField.prepareINPUTToField(input)
        setPropertDto(repField);
        setDependency(repField);
        
    })
}

