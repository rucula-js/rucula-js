import { Injectable } from '@angular/core';
import { eventFieldService } from './eventField';
import { quadro } from './entities/form/quadro';


@Injectable({
    providedIn: 'root',
})
export class ObjectsDOMBaseService {

  constructor(private eventFieldService?:eventFieldService){}

  DOMFormDynamic():HTMLFormElement{
    const form = document.getElementById('form-dynamic') as HTMLFormElement;
    return form;
  }
  DOMLabelIsRequerid():HTMLSpanElement{
    const span = document.createElement('span'); 
    span.innerText = "*"
    span.style.color = "#871515";
    return span
  }
  DOMcreateDivBlockElement(quadro:quadro):HTMLDivElement{
    const div = document.createElement('div');
    div.classList.add("quadro-block")
    div.setAttribute('data-objectDto',quadro.objectDto)
    div.setAttribute('data-chield',quadro.child!)
    const h3 = document.createElement('h3');
    h3.textContent = quadro.name
    div.appendChild(h3)
    return div
  }
 }
