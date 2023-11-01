import { constTypeFrame, constTypeInput } from "../../const";
import { field } from "../../entities/form/field";
import { RepresentationField } from "../../entities/form/representationField";
import { setPropertDto } from "../../object/ObjectManagment";
import { setEventForInformationInputQuadro } from "../../popper/PopperEvent";
import { setDependency } from "../../table-dependency/TableDependency";
import { setEventListenerTypeCheckbox, setEventListenerTypeCurrency, setEventListenerTypeSimple } from "./ElementsInputEvent";
import { FieldCheckbox } from "./Field/FieldCheckbox";
import { FieldCommon } from "./Field/FieldCommon";
import { FieldSelect } from "./Field/FieldSelect";
import { FieldStrategy } from "./Field/FieldStrategy";
import { FieldTextArea } from "./Field/FieldTextArea";
import { formulaGetValuePropert, formulaLine, formulaMath, formulaSUM } from "./formulas/Formulas";

export function createField(field:field,frame:{type:string,objectDto:string,line?:number}):HTMLDivElement|HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement{
  
    let element:HTMLSelectElement|HTMLInputElement|HTMLTextAreaElement
    let fieldStrategy:FieldStrategy = new FieldStrategy();

    checkTypeField(field.type)
    
    //! Esses if's podem ser substituidos por factory abstract, quando possível tentar implementar!
    if(isSimple()){
        fieldStrategy.setStrategy(new FieldCommon())
    }
    
    if(field.type == constTypeInput.SELECT) {
        fieldStrategy.setStrategy(new FieldSelect())
    }

    if(isCheckBox()){
        fieldStrategy.setStrategy(new FieldCheckbox())
    }

    if(field.type == constTypeInput.TEXT_AREA) {
        fieldStrategy.setStrategy(new FieldTextArea())
    }
    
    element = fieldStrategy.create(field);

    if(isSimple()){
        setEventListenerTypeSimple(element,field)
    }

    if(isCheckBox()){
        setEventListenerTypeCheckbox(element as HTMLInputElement, field)
    }

    if(isCurrency()){
        setEventListenerTypeCurrency(element as HTMLInputElement, field)
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
        const formGroup = createGroupOfInput(field)
        formGroup.appendChild(element)
        return formGroup as HTMLDivElement
    }

    function isSimple(){
            
        let condition =  
        field.type == constTypeInput.TEXT ||
        field.type == constTypeInput.NUMBER || 
        field.type == constTypeInput.DATE ||
        field.type == constTypeInput.CURRENCY
        
        return condition;
    }
        
    function isCheckBox(){
        return field.type == constTypeInput.CHECKBOX
    }

    function isCurrency(){
        return field.type == constTypeInput.CURRENCY
    }

    return element as HTMLSelectElement|HTMLInputElement
}

function checkTypeField(type: string){

    let types = [
        "text",
        "number",
        "select",
        "checkbox",
        "date",
        "currency",
        "textarea"
    ]

    if(types.indexOf(type) == -1){
        throw new Error(`Field type "${type}" is not allowed`);
    }
}

export function createFieldTypeInputBasic(field:field): HTMLInputElement{

    const input = document.createElement('input');

    if(field?.disable){
        input.setAttribute("disabled","")
    }

    input.type = field.type;
    
    if(field.type == "currency"){
        input.type = "text";
    }
    
    if (field.width > 0){
        input.style.width = `${field.width}px`  
    }

    input.classList.add("r-i-control")
    
    return input;
}

export function createFieldTypeTextArea(field:field):HTMLTextAreaElement{
    
    const input = document.createElement('textarea');
    
    if(field?.disable){
        input.setAttribute("disabled","")
    }
    
    input.setAttribute("rows", String(field.textarea?.rows))

    if(field.textarea?.cols){
        input.setAttribute("cols", String(field.textarea?.cols))
    }
    else {
        input.style.width = "100%";
    }

    return input;
}

export function createFieldCheckbox(field:field):HTMLInputElement{  
    
    var input = document.createElement("input")
    
    input.type = "checkbox";

    if(field.value == field.checkbox!.on){
        input.checked = true
    }
    
    return input;
}

function createGroupOfInput(field:field):HTMLDivElement{
    
    const div = document.createElement('div');
    div.classList.add('r-g-i-i');

    const label = document.createElement('label');
    label.setAttribute('for',field.id)    
    label.textContent = field.description

    if (field.requerid == true){
      label.textContent = label.textContent
      label.append(createSpanLabelIsRequerid().cloneNode(true))
    }
    
    div.appendChild(label)
    
    return div;
}

export function createSpanLabelIsRequerid():HTMLSpanElement{

    const span = document.createElement('span'); 
    span.innerText = " *"
    span.style.color = "red";

    return span
}

export function createFieldSelect(field:field):HTMLSelectElement{  
    
    const select = document.createElement('select');
    
    setAtributesDataDefault(select,field)
    
    field.combo?.forEach(item => {
          
        const option = document.createElement('option')
        option.text = item["representation"]
        option.value = item["value"]
        select.appendChild(option)
        
    })
    return select
}

export function setAtributesDataDefault(node:HTMLElement,field:field){
    node.setAttribute('maxlength',`${field.maxLength}`); 
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

