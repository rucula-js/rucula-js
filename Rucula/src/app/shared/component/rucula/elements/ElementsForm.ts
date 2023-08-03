import { frame } from '../entities/form/frame';
import { field } from '../entities/form/field';

function getForm():HTMLFormElement{
    const form = document.getElementById('form-dynamic') as HTMLFormElement;
    return form;
}
function createFieldTypeInputBasic(field:field):HTMLInputElement{
    const input = document.createElement('input');
    if(field?.value &&  field?.value.substring(0,1) != "=") 
      input.value = field?.value
    
    if(field?.value &&  field?.value.substring(0,1) == "=") input.value = field?.value  
      input.type = field.type;
    if (field.maxLength != undefined && field.maxLength > 0){
      input.style.width = `${field.maxLength * 10}px`  
    }else{
      input.style.width = "90px"  
    }
    input.classList.add("form-control")
    
    return input;
}
function createFieldCheckbox(field:field):HTMLInputElement{  
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
    div.classList.add('form-group-item');

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
function createSpanLabelIsRequerid():HTMLSpanElement{
    const span = document.createElement('span'); 
    span.innerText = "*"
    span.style.color = "red";
    return span
}
function createFieldSelect(field:field):HTMLSelectElement{  
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
function setAtributesDataDefault(node:HTMLElement,field:field){
    node.setAttribute('maxlength',`${field.maxLength}`); 
}

function createFrame(frame:frame){
    const div = document.createElement('div');
    if (frame.type == "block")div.classList.add("quadro-block")
    if (frame.type == "line")div.classList.add('quadro-list')
    div.setAttribute('data-objectDto',frame.objectDto)
    const h5 = document.createElement('h5');
    h5.textContent = frame.name
    div.appendChild(h5)
    return div
}
function alignColumnOfTable(field:field, cell: HTMLTableCellElement){
    if(field.type == "text")
        cell.style.textAlign = "left"
    if(field.type == "number")
        cell.style.textAlign = "right"
    if(field.type == "select" || field.type == "checkbox")
        cell.style.textAlign = "center"
}

function addAttributesSetAndName(node:HTMLElement,type:string, object:string, propert:string){
  let name = `${type}.${object}.${propert}`
  let set = `${object}.${propert}`
  if(type == "line"){
    name+=".0";
    set+=".0";
  }
  node.setAttribute('name',name);
  node.setAttribute('set',set);
}

export {
    getForm,
    createSpanLabelIsRequerid,
    setAtributesDataDefault,
    createFieldTypeInputBasic,
    createGroupOfInput,
    createFieldCheckbox,
    createFieldSelect,
    createFrame,
    alignColumnOfTable,
    addAttributesSetAndName
}