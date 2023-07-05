import { Injectable } from '@angular/core';
import { CreatePopperService } from './popper/createPopper';
import { createButtonOrLinkService } from './buttons/createButtonOrLink.service';
import { field } from './entities/form/field';
import { window } from './entities/form/window';
import { frame } from './entities/form/frame';
import { ComponentsDOMFactoryService } from './elements/components-DOM.component.service'
import { TableDependencyService } from './table-dependency/table-dependency.service.component';
import { FactoryObjectService } from './factory-object/factory-object.service.component';
import { ConsoleService } from './console/console.service.component';
import { ConfigurationBaseGlobalService } from './configuration-base-global/configuration-base-global.component.service';

@Injectable({
    providedIn: 'root',
})
export class FormDynamicService {

   constructor( private componentsDOM?:ComponentsDOMFactoryService, 
                private buttonOrLinkService?:createButtonOrLinkService, 
                private cps?:CreatePopperService,
                private tableDependency?: TableDependencyService,
                private factoryObject?:FactoryObjectService,
                private consoleService?:ConsoleService,
                private configlobal?:ConfigurationBaseGlobalService){}
    
    private form!:HTMLElement;
    private window!:window;
    private frameInFocu!:frame; 
        
    domCreateForm(window:window){
      this.configlobal?.setValues(window)
      this.tableDependency?.createTableDependency(window.frames!)
      this.factoryObject!.JoinChield = window.joinChield
      this.factoryObject?.createObject(window.frames)
      this.window = window;
      this.form = this.componentsDOM!.getElementFormDynamic();
      this.createFrames()
      this.createButtons()
      this.setEvents()
      this.consoleService!.set() 
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
      const frameElement = this.componentsDOM!.createFrame(frame)
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
        _fieldsElements.push(this.createFieldInput(field) as HTMLDivElement) 
      })
      return _fieldsElements;
    }
    private createQuadroList(frame:frame){
      const line = this.componentsDOM!.createFrame(frame)
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
          th.append(this.componentsDOM!.createSpanLabelIsRequerid().cloneNode(true))
        }
        this.componentsDOM!.alignColumnOfTable(field,th)
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
        this.componentsDOM!.alignColumnOfTable(field,td)
        tr.appendChild(td)
      })
      return tbody;
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
      this.eventKeyDownKeyUpLineFrame(element as HTMLElement)
      this.lineClone.set(element.getAttribute("data-objecdto")!,(element as HTMLElement).cloneNode(true) as HTMLElement)
    }); 
  }
  private eventKeyDownKeyUpLineFrame(element:HTMLElement){
    element.addEventListener('keydown',(event)=> {
      this.crudLineQuadro(event)
    })
      element.addEventListener('keyup',(event)=> {
          this.keyEvents = []
    })
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
  private createButtons(){
    if(this.window.type.toLocaleUpperCase() == "CRUD"){
      this.buttonOrLinkService!.prepareButtonsCRUD(this.window.button)
    }
  }
  private createFieldInput(field:field, isTypeLine:boolean = false):HTMLDivElement|HTMLInputElement|HTMLSelectElement{
    let element:HTMLSelectElement|HTMLInputElement
    switch(field.type){
      case 'text':
      case 'number':
        element = this.createInput(field);
        break;
      case 'select':
        element = this.componentsDOM!.createFieldSelect(field);
        break;
        case 'checkbox':
          element = this.componentsDOM!.createFieldCheckbox(field)
          break;
      default:
          throw new Error(`Field type "${field.type}" is not allowed`);     
    }
    this.setEventListenerForInput(element)

    if(isTypeLine == false){
      this.addAtributesSetAndNameTypeBlock(element,field)
    }
    if(isTypeLine == true){
      this.addAtributesSetAndNameTypeLine(element,field)
    }
    this.factoryObject!.setPropertDto(element);
    this.tableDependency?.setDependency(element)
    
    if(isTypeLine == false){
      const formGroup = this.componentsDOM!.createGroupOfInput(field)
      formGroup.appendChild(element)
      return formGroup;
    }
    return element; 
  }
  private createInput(field:field){
    const input = this.componentsDOM!.createFieldTypeInputBasic(field)
    this.componentsDOM!.setAtributesDataDefault(input,field)
    return input
  }
  private setEventListenerForInput(element:HTMLSelectElement | HTMLInputElement){
    element.addEventListener('focusout',(e) => {
        this.factoryObject!.setPropertDto(e.target as HTMLInputElement);
        this.tableDependency?.setDependency(e.target as HTMLInputElement)
    })
  }
  private addAtributesSetAndNameTypeBlock(node:HTMLElement,field:field){
    node.setAttribute('name',`${this.frameInFocu.type}.${this.frameInFocu.objectDto}.${String(field.propertDto)}`);
    node.setAttribute('set',`${this.frameInFocu.objectDto}.${String(field.propertDto)}`);
  }
  private addAtributesSetAndNameTypeLine(node:HTMLElement,field:field){
    node.setAttribute('name',`${this.frameInFocu.type}.${this.frameInFocu.objectDto}.${String(field.propertDto)}.0`);
    node.setAttribute('set',`${this.frameInFocu.objectDto}.${String(field.propertDto)}.0`);
  }
  private crudLineQuadro(event:Event){

    const key = (event as KeyboardEvent).key;
    
    if(this.keyEvents.filter(c=> c == key).length == 0) this.keyEvents.push(key)
    this.keyEvents.sort()

    let nextLine = null;
    let previousLine = null;
    
    let input:HTMLInputElement = event.target as HTMLInputElement 
    let currentLineElement:HTMLElement = (event.currentTarget as HTMLElement)

    if(this.keyEvents[0] == "ArrowUp"){
      previousLine = (currentLineElement.previousSibling as HTMLTableRowElement)

      let split = input.getAttribute("name")!.split(".")
      let type = split[0] 
      let object = split[1]
      let propert = split[2]
      
      var atribute =`input[name^="${type}.${object}.${propert}."]`;
      let varttt = previousLine?.querySelector(atribute);
      (varttt as HTMLInputElement)?.focus()
    }
    
    if(this.keyEvents[0] == "ArrowDown"){
      nextLine = (currentLineElement.nextSibling as HTMLTableRowElement)

      let split = input.getAttribute("name")!.split(".")
      let type = split[0] 
      let object = split[1]!
      let propert = split[2]!
      
      var atribute =`input[name^="${type}.${object}.${propert}."]`;
      let varttt = nextLine?.querySelector(atribute);
      (varttt as HTMLInputElement)?.focus()
    }
    if (this.keyEvents[0] == undefined || this.keyEvents[1] == undefined) return

    if (this.keyEvents[0] == "Control" && this.keyEvents[1] ==  "Enter"){
        event.preventDefault();
        var newLine = this.createNewLine(currentLineElement.getAttribute('data-objecdto')!)
        currentLineElement.after(newLine)
        newLine.querySelector("input")?.focus()
    }
    if (this.keyEvents[0] == "0" && this.keyEvents[1] == "Control"){
      event.preventDefault();
      let nodeSuperiorIsHeader = currentLineElement.previousSibling == undefined ? true:false;
      let nextSibling = currentLineElement.nextSibling?true:undefined;
      let previousSibling = currentLineElement.previousSibling?true:undefined;

      if( nodeSuperiorIsHeader && nextSibling == undefined){
          let newLineForDelete = this.createNewLine(currentLineElement.getAttribute('data-objecdto')!)
          currentLineElement.parentNode!.appendChild(newLineForDelete)
          newLineForDelete.querySelector("input")?.focus();
          currentLineElement.remove();
      }
      if(nodeSuperiorIsHeader == false || nextSibling){
        if(previousSibling){
          (currentLineElement.previousSibling as HTMLElement).querySelector("input")?.focus();
        }
        if(nextSibling){
          (currentLineElement.nextSibling as HTMLElement).querySelector("input")?.focus();
        }
        currentLineElement.remove();
      }
      const input = currentLineElement.querySelector("input") as HTMLInputElement;
      this.factoryObject!.deleteLine(input)
      this.tableDependency!.deleteLine(input)

      this.keyEvents = []
    }
  }
  private createNewLine(ObjectdtoLine:string):HTMLElement{

    var clone:HTMLElement = (this.lineClone.get(ObjectdtoLine) as HTMLElement).cloneNode(true) as HTMLElement;

    clone.childNodes.forEach(item => {
        let atributeName = (item.firstChild as HTMLElement).getAttribute('name')?.split(".")! ;

        (item.firstChild as HTMLElement).setAttribute('name',
        `${atributeName[0]}.${atributeName[1]}.${atributeName[2]}.${Number(atributeName[3])+1}`);
        
        (item.firstChild as HTMLElement).setAttribute('set',
        `${atributeName[1]}.${atributeName[2]}.${Number(atributeName[3])+1}`)
        this.setEventListenerForInput(item.firstChild as HTMLInputElement)
    })
      this.lineClone.set(ObjectdtoLine,(clone as HTMLElement).cloneNode(true) as HTMLElement)
      this.eventKeyDownKeyUpLineFrame(clone as HTMLElement)
      this.tableDependency?.createNewLine(clone.querySelector("input")!)
      clone.querySelectorAll("select, input[type='checkbox']").forEach((element)=> {
      this.tableDependency?.setDependency(element as HTMLInputElement|HTMLSelectElement)
    })
    return clone as HTMLElement;
  }
}