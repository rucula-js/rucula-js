import { field } from "../../entities/form/field";
import { representationField } from "../../entities/form/representationField";
import { getValuePropertTypeObject, setPropertDto, sumPropert } from "../../object/ObjectManagment";
import { setEventForInformationInputQuadro } from "../../popper/PopperEvent";
import { setDependency } from "../../table-dependency/TableDependency";
import { setEventListenerForInput } from "./ElementsInputEvent";
import { FieldCheckbox } from "./Field/FieldCheckbox";
import { FieldCommon } from "./Field/FieldCommon";
import { FieldSelect } from "./Field/FieldSelect";
import { FieldStrategy } from "./Field/FieldStrategy";
import { formulaGetValuePropert, formulaLine, formulaMath, formulaSUM } from "./formulas/Formulas";

export function createField(field:field,frame:{type:string,objectDto:string,line?:number}):HTMLDivElement|HTMLSelectElement|HTMLInputElement{
  
    let element:HTMLSelectElement|HTMLInputElement
    let fieldStrategy:FieldStrategy = new FieldStrategy();
    checkTypeField(field.type)
    if( field.type == "text" || 
        field.type == "number" || 
        field.type == "date" ||
        field.type == "currency"
        ) fieldStrategy.setStrategy(new FieldCommon())
    if(field.type == "select") fieldStrategy.setStrategy(new FieldSelect())
    if(field.type == "checkbox") fieldStrategy.setStrategy(new FieldCheckbox())
    element = fieldStrategy.create(field);
    setEventListenerForInput(element,field)
    setEventForInformationInputQuadro(element)
    
    addAttributesSetAndName(element,{   
        type:frame.type,
        object:frame.objectDto,
        propert:String(field.propertDto),
        line:frame.line
    })
    let repField = representationField.prepareINPUTToField(element)
    setPropertDto(repField);
    setDependency(repField);
    if( typeof(FieldStrategy) == typeof(FieldCommon))
    setValueOrFormula(field,element as HTMLInputElement,frame)
    if(frame.type == "block"){
        const formGroup = createGroupOfInput(field)
        formGroup.appendChild(element)
        return formGroup as HTMLDivElement
    }
    return element as HTMLSelectElement|HTMLInputElement
}

function checkTypeField(type: string){
    let types = ["text","number","select","checkbox","date","currency"]
    if(types.indexOf(type) == -1)
        throw new Error(`Field type "${type}" is not allowed`);
}

export function createFieldTypeInputBasic(field:field):HTMLInputElement{
    const input = document.createElement('input');
    if(field?.disable) input.setAttribute("disabled","")

    if(field.type == "currency"){
        input.type = "text";
    }else{
        input.type = field.type;
    }
    
    if (field.maxLength != undefined && field.maxLength > 0){
        input.style.width = `${field.maxLength * 10}px`  
    }else{
        input.style.width = "90px"  
    }
    input.classList.add("r-i-control")
    
    return input;
}
export function createFieldCheckbox(field:field):HTMLInputElement{  
    var input = document.createElement("input")
    input.type = "checkbox";
    input.value = field.checkbox!.off
    input.addEventListener('click',(e) =>{
      var check = (e.target as HTMLInputElement); 
      if(check.value == field.checkbox!.on){
        check.value = field.checkbox!.off
      }else{
        check.value = field.checkbox!.on
      }
    })
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

    if(frame.type == "line"){
            name+=`.${frame.line}`;
            set+=`.${frame.line}`;
    }
    node.setAttribute('name',name);
    node.setAttribute('set',set);
}
export function setValueOrFormula(field:field,input:HTMLInputElement,frame:{type:string,objectDto:string,line?:number}){
    if(field.value == undefined && field.formula == undefined) return;

    if(field.value){
        input.value = field.value;        
        let repField = representationField.prepareINPUTToField(input)
        setPropertDto(repField);
        setDependency(repField);
        return;
    }

    field.formula?.forEach(formula => {
        formulaGetValuePropert(formula, input);
        formulaMath(formula, input,frame)
        formulaLine(formula, input,field,frame)
        formulaSUM(formula, input,field,frame)
        let repField = representationField.prepareINPUTToField(input)
        setPropertDto(repField);
        setDependency(repField);
        
    })
    

}

