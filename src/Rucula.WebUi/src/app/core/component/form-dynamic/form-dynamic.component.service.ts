import { Injectable } from '@angular/core';
import { CreatePopperService } from './popper/createPopper';
import { createButtonOrLinkService } from './buttons/createButtonOrLink.service';
import { field } from './entities/form/field';
import { window } from './entities/form/window';
import { frame } from './entities/form/frame';
import {ObjectsDOMBaseService} from './elements/objects-DOM-base.component.service'
import { KeyValuePipe } from '@angular/common';
import { createElement } from 'gridjs';

@Injectable({
    providedIn: 'root',
})
export class FormDynamicService {

   constructor(private ObjectsDOMBaseService?:ObjectsDOMBaseService, private buttonOrLinkService?:createButtonOrLinkService, private cps?:CreatePopperService){}
    private form!:HTMLElement;
    private window!:window;
    private frameInFocu!:frame; 
        
    domCreateForm(window:window){
      this.window = window;
      this.SetWindowTitle();
      this.form = this.ObjectsDOMBaseService!.DOMFormDynamic();
      this.createFrames()
      this.createButtons()
      this.setEvents()
    }
    private SetWindowTitle(){
      const windowTitle = document.getElementById("window-title")
      windowTitle!.textContent = this.window.tela
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
      const _quadro = this.ObjectsDOMBaseService!.DOMcreateDivBlockElement(frame) // cria o elemento do bloco
      const _fields = this.createElementsField(frame.fields!);  // cria um array de elementos de entrada
      _fields.forEach(field => {
        _quadro.appendChild(field)
      })
      this.form.appendChild(_quadro)
    }
    private createElementsField(fields:Array<field>):Array<HTMLDivElement>{
      let _fields: Array<HTMLDivElement> = new Array<HTMLDivElement>();
      fields.forEach(field => {
        _fields.push(this.createFieldTypeBlock(field)) 
      })
      return _fields;
    }
    private createQuadroList(frame:frame){
      const line = this.createQuadroListElement(frame)
      const table = document.createElement('table');
      table.classList.add("table-form")
      const header = this.prepareLineHeaderTable(frame.fields!);
      table.appendChild(header)
      const detail = this.prepareLineDetailTable(frame.fields!);
      table.appendChild(detail)
      line.appendChild(table)
      this.form.appendChild(line)
    }
    private createQuadroListElement(frame:frame){
      const div = document.createElement('div');
      div.classList.add('quadro-list')
      div.setAttribute('data-objectDto',frame.objectDto)
      div.setAttribute('data-chield',frame.child!)
      const h4 = document.createElement('h4');
      h4.textContent = frame.name
      div.appendChild(h4)
      return div
    }
    private prepareLineHeaderTable(fields:Array<field>):HTMLTableRowElement{
      let tr = document.createElement('tr');
      fields.forEach(field => {
        const th = document.createElement('th');
        th.textContent = field.description
        if(field.requerid == true){
          th.textContent = th.textContent
          th.append(this.ObjectsDOMBaseService!.DOMLabelIsRequerid().cloneNode(true))
        }
        this.alignColumnOfTable(field,th)
        tr.appendChild(th)
      })
      return tr;
    }
    private prepareLineDetailTable(fields:Array<field>):HTMLTableRowElement{
      
      let tr = document.createElement('tr');
      tr.setAttribute('data-objecdto',this.frameInFocu.objectDto)
      fields.forEach(field =>{
        const td = document.createElement('td');
        td.appendChild(this.createFieldTypeLine(field))
        this.alignColumnOfTable(field,td)
        tr.appendChild(td)
      })
      return tr;
    }
    private alignColumnOfTable(field:field, cell: HTMLTableCellElement){
      if(field.type == "text")
        cell.style.textAlign = "left"
      if(field.type == "number")
        cell.style.textAlign = "right"
      if(field.type == "select" || field.type == "checkbox")
        cell.style.textAlign = "center"
    }
    private createFieldTypeBlock(field:field):HTMLDivElement{
      let element
      switch(field.type){
        case 'text':
        case 'number':
          element = this.createFieldInputTypeBlock(field);
          break;
        case 'select':
          element = this.createFieldSelect(field);
          this.setAtributesDataSetAndNameTypeBlock(element,field)
          break;
          case 'checkbox':
            break;
        default:
            throw new Error(`Field type "${field.type}" is not allowed`);     
      }
      const formgroup = this.createformGroup(field)
      formgroup.appendChild(element as HTMLElement)
      return formgroup;
  }
  private createFieldTypeLine(field:field):HTMLInputElement | HTMLSelectElement{
    let element:HTMLInputElement | HTMLSelectElement
    switch(field.type){
      case 'text':
      case 'number':
        element = this.createFieldInputTypeLine(field);
          break;
      case 'select':
        element = this.createFieldSelect(field);
        this.setAtributesDataSetAndNameTypeLine(element,field)
        break;
      case 'checkbox':
        element = this.createFieldCheckbox(field)
        this.setAtributesDataSetAndNameTypeLine(element,field)
        break;
      default:
          throw new Error(`Field type "${field.type}" is not allowed`); 
    }
    return element!;
  }
  createformGroup(field:field):HTMLDivElement{
    const div = document.createElement('div');
    div.classList.add('form-group-item');

    const label = document.createElement('label');
    label.setAttribute('for',field.id)
    
    label.textContent = field.description
    if (field.requerid == true){
      label.textContent = label.textContent
      label.append(this.ObjectsDOMBaseService!.DOMLabelIsRequerid().cloneNode(true))
    }
    div.appendChild(label)
    return div;
  }
  
  private createFieldTypeInputBasic(field:field):HTMLInputElement{
      const input = document.createElement('input');
      input.type = field.type;
      if (field.maxLength != undefined && field.maxLength > 0){
        input.style.width = `${field.maxLength * 10}px`  
      }else{
        input.style.width = "90px"  
      }
      input.classList.add("form-control")
      return input;
  }
  private createFieldInputTypeBlock(field:field){
      const input = this.createFieldTypeInputBasic(field)
      this.setAtributesDataDefault(input,field)
      this.setAtributesDataSetAndNameTypeBlock(input,field)
      return input
  }
  private createFieldInputTypeLine(field:field){
      const input = this.createFieldTypeInputBasic(field)
      this.setAtributesDataDefault(input,field)
      this.setAtributesDataSetAndNameTypeLine(input,field)
      return input
  }

  private createFieldSelect(field:field):HTMLSelectElement{  
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
  private createFieldCheckbox(field:field):HTMLInputElement{  

    var input = document.createElement("input")
    input.type = "checkbox";
    input.id = field.id;
    
    return input;
  }
  private setAtributesDataDefault(node:HTMLElement,field:field){
    node.setAttribute('data-max',String(field.max));
    node.setAttribute('data-min',String(field.min));
    node.setAttribute('data-required',String(field.requerid));
    node.setAttribute('data-disable',String(field.disable));
    node.setAttribute('data-childdto',`${this.frameInFocu.child}`);
    node.setAttribute('maxlength',`${field.maxLength}`); 
  }
  private setAtributesDataSetAndNameTypeBlock(node:HTMLElement,field:field){
    node.setAttribute('name',`${this.frameInFocu.type}.${this.frameInFocu.objectDto}.${String(field.propertDto)}`);
    node.setAttribute('set',`${this.frameInFocu.objectDto}.${String(field.propertDto)}`);
  }
  private setAtributesDataSetAndNameTypeLine(node:HTMLElement,field:field){
    node.setAttribute('name',`${this.frameInFocu.type}.${this.frameInFocu.objectDto}.${String(field.propertDto)}.0`);
    node.setAttribute('set',`${this.frameInFocu.objectDto}.${String(field.propertDto)}.0`);
  }
  private keyEvents:Array<string> = new Array<string>();
  private lineClone:Map<string,HTMLElement> = new  Map<string,HTMLElement>(); // como pode conter mais de uma tela de linha, é importante ser um arra map

  setEvents(){
    this.setEventForCreationLine()
    this.setEventForInformationInputQuadro()
  }
  private setEventForCreationLine(){
    const line =  document.querySelectorAll('.quadro-list table tr[data-objecdto]')
    line.forEach((element) => {
      
      element.addEventListener('keydown',(event)=> {
        this.crudLineQuadro(event)
      })
        element.addEventListener('keyup',(event)=> {
            this.keyEvents = []
      })
      this.lineClone.set(element.getAttribute("data-objecdto")!,(element as HTMLElement).cloneNode(true) as HTMLElement)
    }); 
  }
  private setEventForInformationInputQuadro(){
    const line =  document.querySelectorAll('#box-window input,#box-window select')
    line.forEach((element) => {
      element.addEventListener('keydown',(event)=> {
        this.createPopper(event)
      })
        element.addEventListener('keyup',(event)=> {
            this.keyEvents = []
      })
    });
    const boxWindow =  document.getElementById('box-window')
    boxWindow?.addEventListener('click',()=>{
      var tooltip = document.getElementById("tooltip")!
      tooltip.style.display = 'none';
    })
  }
  private createPopper(event:Event){
    const current = (event.currentTarget as HTMLElement)
    const key = (event as KeyboardEvent).key;
    if(this.keyEvents.filter(c=> c==key).length == 0){
      this.keyEvents.push(key)
    }
    this.keyEvents.sort()
    if (this.keyEvents[0] == "Alt" && this.keyEvents[1] == "h"){
     
      var atribute = current.getAttribute('name')!.split('.');
      
      var field = this.window.frames!
      .find( c => c.objectDto == atribute[1])?.fields?.find( c=>c.propertDto == atribute[2]);

      var tooltip = document.getElementById("tooltip")!
      
      tooltip.textContent = String(field!.information)
      if (field!.information == "" || field!.information == undefined){
        tooltip.innerHTML = "Campo sem informação &#128542";
      }
      let arrow = document.createElement('div') 
      arrow.setAttribute("id","arrow");
      arrow.setAttribute("data-popper-arrow","");
      tooltip.appendChild(arrow)
      tooltip.style.display = "inline-block"
      this.cps?.createPopper(current,tooltip)
    }
  }
  private crudLineQuadro(event:Event){
    const current = (event.currentTarget as HTMLElement)
    const key = (event as KeyboardEvent).key;
    if(this.keyEvents.filter(c=> c==key).length == 0){
      this.keyEvents.push(key)
    }
    this.keyEvents.sort()
    if (this.keyEvents[0] == "Alt" && this.keyEvents[1].toLowerCase() ==  "a"){
        var clone = this.createNewLine(current.getAttribute('data-objecdto')!)
        current.after(clone)
    }
    if (this.keyEvents[0] == "Alt" && this.keyEvents[1] ==  "d"){
      if (document.querySelectorAll('.quadro-list table tr').length == 2){
        (event.currentTarget as HTMLElement).after(this.createNewLine(current.getAttribute('data-objectdto')!));
        (event.currentTarget as HTMLElement).remove()
      }else{
        (event.currentTarget as HTMLElement).remove()
      }
      this.keyEvents = []
    }
  }
  private createNewLine(ObjectdtoLine:string):HTMLElement{

    var clone = (this.lineClone.get(ObjectdtoLine) as HTMLElement).cloneNode(true);
    (clone as HTMLElement).childNodes.forEach(item => {
         let atributeName = (item.firstChild as HTMLElement).getAttribute('name')?.split(".")!;
         let atributeSet = (item.firstChild as HTMLElement).getAttribute('set')?.split(".")!;

         (item.firstChild as HTMLElement).setAttribute('name',
          `${atributeName[0]}.${atributeName[1]}.${atributeName[2]}.${Number(atributeName[3])+1}`);
          
          (item.firstChild as HTMLElement).setAttribute('set',
          `${atributeName[1]}.${atributeName[2]}.${Number(atributeName[3])+1}`)

    })
    this.lineClone.set(ObjectdtoLine,(clone as HTMLElement).cloneNode(true) as HTMLElement)

    clone.addEventListener('keydown',(event)=> this.crudLineQuadro(event))
    clone.addEventListener('keyup',(event)=> {
      this.keyEvents = [] 
    })
    return clone as HTMLElement;
  }
  private createButtons(){
    if(this.window.type.toLocaleUpperCase() == "CRUD"){
      this.buttonOrLinkService!.prepareButtonsCRUD(this.window.button)
    }
  }
}