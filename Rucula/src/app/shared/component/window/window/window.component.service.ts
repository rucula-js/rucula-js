import { field } from '../entities/form/field';
import { window } from '../entities/form/window';
import { frame } from '../entities/form/frame';
import { prepareButtons } from '../buttons/Button';
import { eventButton } from '../buttons/EventButton';
import * as console  from '../console/Console'
import * as table  from '../table-dependency/TableDependency';
import * as unitElement from '../elements/ElementsForm'
import * as obj from '../object/ObjectManagment';
import { setWindow } from './Window';
import { setEventListenerForInput, setEvents } from './WindowEvent';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class WindowService {
    
    private form!:HTMLElement;
    private window!:window;
    private frameInFocu!:frame; 
        
    domCreateForm(window:window){
      table.createTableDependency(window.frames!)
      obj.joinChield(window.joinChield)  
      obj.createObject(window.frames)
      setWindow(window);
      this.window = window; //! Essa intrução será removida posteriormente
      this.form = unitElement.getElementFormDynamic();
      this.createFrames()
      this.setUrlrelativeInButtons()
      this.createButtons()
      setEvents()
      console.set() 
    }
    private createFrames(){
      /*
        block: são frames que não contem contagem de linhas 
        line: são frames que contém contagem de linhas 
      */
        this.window.frames?.forEach(frame => {
        this.frameInFocu = frame //  guarda o frames em foco
        
        switch (frame.type) {
          case 'block':
            this.createFrameTypeBlock(frame);
            break;
          case 'line':
              this.createQuadroList(frame);
              break;
          default:
            throw new Error(`Frame type "${frame.type}" is not allowed`); 
        }
      })
    }
    private createFrameTypeBlock(frame:frame){
      const frameElement = unitElement.createFrame(frame)
      const inputs = this.createElementsField(frame.fields!);
      const div = document.createElement("div");
      div.style.display = "flex";
      div.style.flexWrap = "wrap";
      inputs.forEach(c => {
        div.appendChild(c)
      })
      frameElement.appendChild(div)
      this.form.appendChild(frameElement)
    }
    private createElementsField(fields:Array<field>):Array<HTMLDivElement>{
      let _fieldsElements: Array<HTMLDivElement> = new Array<HTMLDivElement>();
      let sortFields = fields.sort(c => c.sequence);
      sortFields.forEach(field => {
        const input = 
        _fieldsElements.push(this.createFieldInput(field) as HTMLDivElement) 
      })
      return _fieldsElements;
    }
    private createQuadroList(frame:frame){
      const line =  unitElement.createFrame(frame)
      const table = document.createElement('table');
      table.classList.add("table-form")
      const header = this.prepareLineHeaderTable(frame.fields!);
      table.appendChild(header)
      const detail = this.prepareLineDetailTable(frame.fields!);
      table.appendChild(detail)
      line.appendChild(table)
      this.form.appendChild(line)
    }
    
    private prepareLineHeaderTable(fields:Array<field>):HTMLTableSectionElement{
      let tr = document.createElement('tr');
      let thead = document.createElement('thead');
      thead.appendChild(tr);
      fields.forEach(field => {
        const th = document.createElement('th');
        th.textContent = field.description
        if(field.requerid == true){
          th.textContent = th.textContent
          th.append(unitElement.createSpanLabelIsRequerid().cloneNode(true))
        }
        unitElement.alignColumnOfTable(field,th)
        tr.appendChild(th)
      })
      return thead;
    }
    private prepareLineDetailTable(fields:Array<field>):HTMLTableSectionElement{
      let tbody = document.createElement('tbody');
      let tr = document.createElement('tr');
      tbody.appendChild(tr);
      tr.setAttribute('data-objecdto',this.frameInFocu.objectDto)
      fields.forEach(field =>{
        const td = document.createElement('td');
        td.appendChild(this.createFieldInput(field, true))
        unitElement.alignColumnOfTable(field,td)
        tr.appendChild(td)
      })
      return tbody;
  }
  private createButtons(){
    if(this.window.type.toLocaleUpperCase() == "CRUD"){
      prepareButtons(this.window.button)
    }
      eventButton(this.window.button)
  }
  private setUrlrelativeInButtons(){
    this.window.button.map(b => {
      if(b.urlrelative == null || b.urlrelative == "") b.urlrelative = this.window.pathController;
    })
  }
  private createFieldInput(field:field, isTypeLine:boolean = false):HTMLDivElement|HTMLInputElement|HTMLSelectElement{
    let element:HTMLSelectElement|HTMLInputElement
    switch(field.type){
      case 'text':
      case 'number':
        element = this.createInput(field);
        break;
      case 'select':
        element = unitElement.createFieldSelect(field);
        break;
        case 'checkbox':
          element = unitElement.createFieldCheckbox(field)
          break;
      default:
          throw new Error(`Field type "${field.type}" is not allowed`);     
    }
    setEventListenerForInput(element)

    if(isTypeLine == false){
      this.addAtributesSetAndNameTypeBlock(element,field)
    }
    if(isTypeLine == true){
      this.addAtributesSetAndNameTypeLine(element,field)
    }
    obj.setPropertDto(element);
    table.setDependency(element)
    
    if(isTypeLine == false){
      const formGroup = unitElement.createGroupOfInput(field)
      formGroup.appendChild(element)
      return formGroup;
    }
    return element; 
  }
  private createInput(field:field){
    const input = unitElement.createFieldTypeInputBasic(field)
    unitElement.setAtributesDataDefault(input,field)
    return input
  }

  private addAtributesSetAndNameTypeBlock(node:HTMLElement,field:field){
    node.setAttribute('name',`${this.frameInFocu.type}.${this.frameInFocu.objectDto}.${String(field.propertDto)}`);
    node.setAttribute('set',`${this.frameInFocu.objectDto}.${String(field.propertDto)}`);
  }
  private addAtributesSetAndNameTypeLine(node:HTMLElement,field:field){
    node.setAttribute('name',`${this.frameInFocu.type}.${this.frameInFocu.objectDto}.${String(field.propertDto)}.0`);
    node.setAttribute('set',`${this.frameInFocu.objectDto}.${String(field.propertDto)}.0`);
  }
}
