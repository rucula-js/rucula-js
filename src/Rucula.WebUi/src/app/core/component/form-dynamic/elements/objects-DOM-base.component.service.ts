import { Injectable } from '@angular/core';
import { frame } from '../entities/form/frame';


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
  DOMcreateDivBlockElement(frame:frame):HTMLDivElement{
    const div = document.createElement('div');
    div.classList.add("quadro-block")
    div.setAttribute('data-objectDto',frame.objectDto)
    div.setAttribute('data-chield',frame.child!)
    const h4 = document.createElement('h4');
    h4.textContent = frame.name
    div.appendChild(h4)
    return div
  }
 }
