import { TestBed } from '@angular/core/testing';
import { FormDynamicComponent } from './form-dynamic.component';
import {ObjectsDOMBaseService} from './objects-DOM-base.component.service'



describe('ObjectsDOMBaseService',() => {
  let service: ObjectsDOMBaseService;
  
  beforeEach(() => { service = new ObjectsDOMBaseService(); });

  it('#LabelIsRequerid should return HTMLSpanElement', () => {

    const span = document.createElement('span'); 
    span.innerText = "*"
    span.style.color = "#871515";
    expect(service.DOMLabelIsRequerid())
    .toEqual(span)
  });

  it('#NameWindow should return HTMLHeadingElement with text windows ', () => {
    const h2 = document.createElement('h2')
    h2.textContent = "windows";
    expect(service.DOMNameWindow("windows"))
    .toEqual(h2)
  });

  it('#DOMcreateDivBlockElement should return HTMLHeadingElement with text windows ', () => {
    let DOMQuadro = service.DOMcreateDivBlockElement(
      {
        name : "Quadro",
        type: "block",
        id: "46d66c9d-c830-4c0b-90d7-ea7a6d0cfde9",
        objectDto: "quadroDto",
        child: "campoDto",
        campo: []
      });
    expect(DOMQuadro.outerHTML)
    .toEqual(`<div class="quadro-block" data-objectdto="quadroDto" data-chield="campoDto"><h3>Quadro</h3></div>`)
  });

} )