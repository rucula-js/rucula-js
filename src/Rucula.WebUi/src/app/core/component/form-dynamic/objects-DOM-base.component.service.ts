import { Injectable } from '@angular/core';
import { quadro } from './entities/form/quadro';


@Injectable({
    providedIn: 'root',
})
export class ObjectsDOMBaseService {
  DOMFormDynamic():HTMLFormElement{
    const form = document.getElementById('form-dynamic') as HTMLFormElement;
    return form;
  }
  DOMLabelIsRequerid():HTMLSpanElement{
    const span = document.createElement('span'); 
    span.innerText = "*"
    span.style.color = "red";
    return span
  }
  DOMcreateDivBlockElement(quadro:quadro):HTMLDivElement{
    const div = document.createElement('div');
    div.classList.add("quadro-block")
    div.setAttribute('data-objectDto',quadro.objectDto)
    div.setAttribute('data-chield',quadro.child!)
    const h4 = document.createElement('h4');
    h4.textContent = quadro.name
    div.appendChild(h4)
    return div
  }
 }
