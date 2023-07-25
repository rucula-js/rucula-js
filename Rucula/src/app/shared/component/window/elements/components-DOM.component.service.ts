import { Injectable } from '@angular/core';
import { frame } from '../entities/form/frame';
import { field } from '../entities/form/field';

@Injectable({
    providedIn: 'root',
})
export class ComponentsDOMFactoryService {
    
  getElementFormDynamic():HTMLFormElement{
    const form = document.getElementById('form-dynamic') as HTMLFormElement;
    return form;
  }

  createSpanLabelIsRequerid():HTMLSpanElement{
    const span = document.createElement('span'); 
    span.innerText = "*"
    span.style.color = "red";
    return span
  }
  createFieldTypeInputBasic(field:field):HTMLInputElement{
    const input = document.createElement('input');
    
    if(field?.value)input.value = field?.value;  
    input.type = field.type;
    if (field.maxLength != undefined && field.maxLength > 0){
      input.style.width = `${field.maxLength * 10}px`  
    }else{
      input.style.width = "90px"  
    }
    input.classList.add("form-control")
    return input;
  }
  createFrame(frame:frame){
    const div = document.createElement('div');
    if (frame.type == "block")div.classList.add("quadro-block")
    if (frame.type == "line")div.classList.add('quadro-list')
    div.setAttribute('data-objectDto',frame.objectDto)
    const h5 = document.createElement('h5');
    h5.textContent = frame.name
    div.appendChild(h5)
    return div
  }
  alignColumnOfTable(field:field, cell: HTMLTableCellElement){
    if(field.type == "text")
      cell.style.textAlign = "left"
    if(field.type == "number")
      cell.style.textAlign = "right"
    if(field.type == "select" || field.type == "checkbox")
      cell.style.textAlign = "center"
  }
  createFieldSelect(field:field):HTMLSelectElement{  
    const select = document.createElement('select');
      this.setAtributesDataDefault(select,field)
        field.combo?.forEach(item => {
          const option = document.createElement('option')
          option.text = item["representation"]
          option.value = item["value"]
          select.appendChild(option)
        })
      return select
  }
  createFieldCheckbox(field:field):HTMLInputElement{  
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
  setAtributesDataDefault(node:HTMLElement,field:field){
    node.setAttribute('maxlength',`${field.maxLength}`); 
  }
  createGroupOfInput(field:field):HTMLDivElement{
    const div = document.createElement('div');
    div.classList.add('form-group-item');

    const label = document.createElement('label');
    label.setAttribute('for',field.id)
    
    label.textContent = field.description
    if (field.requerid == true){
      label.textContent = label.textContent
      label.append(this.createSpanLabelIsRequerid().cloneNode(true))
    }
    div.appendChild(label)
    return div;
  }
 }
 
