import { Injectable } from '@angular/core';
import { CreatePopperService } from './DOM/createPopper';
import { createButtonOrLinkService } from './DOM/window/createButtonOrLink.service';
import { campo } from './entities/form/campo';
import { dynamicForm } from './entities/form/dynamicForm';
import { quadro } from './entities/form/quadro';
import {ObjectsDOMBaseService} from './objects-DOM-base.component.service'

@Injectable({
    providedIn: 'root',
})
export class FormDynamicService {

   constructor(private ObjectsDOMBaseService?:ObjectsDOMBaseService, private buttonOrLinkService?:createButtonOrLinkService, private cps?:CreatePopperService){}
    private form!:HTMLElement;
    private dynamicForm!:dynamicForm;
    private quadroInFocu!:quadro; 
        
    domCreateForm(dynamic:dynamicForm){
      this.dynamicForm = dynamic;
      this.SetWindowTitle();
      this.form = this.ObjectsDOMBaseService!.DOMFormDynamic();
      this.prepareQuadro()
      this.createButtons()
      this.setEvents()
    }

    private SetWindowTitle(){
      const windowTitle = document.getElementById("window-title")
      windowTitle!.textContent = this.dynamicForm.tela
    }
    private prepareQuadro(){
      /*
        block: são quadros que não contem contagem de linhas 
        line: são quadros que contém contagem de linhas 
      */
      this.dynamicForm.quadro?.forEach(quadro => {
        this.quadroInFocu = quadro //  guarda o quadro em foco no
        if (quadro.type=='block'){
          this.createQuadroBlock(quadro);
        }
        if (quadro.type=='line'){
           this.createQuadroList(quadro);
        }
      })
    }
    private createQuadroBlock(quadro:quadro){
      const _quadro = this.ObjectsDOMBaseService!.DOMcreateDivBlockElement(quadro) // cria o elemento do bloco
      const _fields = this.createElementFormItem(quadro.campo!);  // cria um array de elementos de entrada
      
      _fields.forEach(field => {
        _quadro.appendChild(field)
      })
      this.form.appendChild(_quadro)
    }
    
    private createElementFormItem(fields:Array<campo>):Array<HTMLDivElement>{
      let _fields: Array<HTMLDivElement> = new Array<HTMLDivElement>();
      fields.forEach(field => {
        _fields.push(this.createField(field)) 
      })
      return _fields;
    }
    private createQuadroList(quadro:quadro){
      const line = this.createQuadroListElement(quadro)
      const table = document.createElement('table');
      table.classList.add("table-form")

      
      quadro.line?.forEach(line => {
        const header = this.prepareLineHeaderTable(line.campo!);
        table.appendChild(header)

        const detail = this.prepareLineDetailTable(line.campo!);
        table.appendChild(detail)
      })
      line.appendChild(table)

      this.form.appendChild(line)
    }
    private createQuadroListElement(quadro:quadro){
      const div = document.createElement('div');
      div.classList.add('quadro-list')
      div.setAttribute('data-objectDto',quadro.objectDto)
      div.setAttribute('data-chield',quadro.child!)
      const h4 = document.createElement('h4');
      h4.textContent = quadro.name
      div.appendChild(h4)
      return div
    }
    private prepareLineHeaderTable(fields:Array<campo>):HTMLTableRowElement{
      
      let tr = document.createElement('tr');
      fields.forEach(field =>{
        const th = document.createElement('th');
        th.textContent = field.description
        if (field.required == true){
          th.textContent = th.textContent
          th.append(this.ObjectsDOMBaseService!.DOMLabelIsRequerid().cloneNode(true))
        }
        if (field.type == "text"){
          th.style.textAlign = "left"
        }
        if (field.type == "number"){
          th.style.textAlign = "right"
        }
        tr.appendChild(th)
      })
      return tr;
    }
    private prepareLineDetailTable(fields:Array<campo>):HTMLTableRowElement{
      
      let tr = document.createElement('tr');
      tr.setAttribute('data-objecdto',this.quadroInFocu.objectDto)
      fields.forEach(field =>{
        const td = document.createElement('td');
        td.appendChild(this.createFieldTypeLine(field))
        tr.appendChild(td)
      })
      return tr;
    }

    private createFieldTypeLine(field:campo):HTMLInputElement | HTMLSelectElement{
      let _element:HTMLInputElement | HTMLSelectElement
      switch(field.type){
        case 'text':
          _element = this.createFieldInputTypeLine(field);
          break;
        case 'number':
            _element = this.createFieldInputTypeLine(field);
            break;
        case 'select':
          _element = this.createFieldSelect(field);
          _element.setAttribute('name',`${this.quadroInFocu.type}.${this.quadroInFocu.objectDto}.${String(field.propertDto)}.0`);

          break;
      }
      return _element!;
    }
    private createField(field:campo):HTMLDivElement{
      let _element
      switch(field.type){
        case 'text':
        case 'number':
          _element = this.createFieldInput(field);
          break;
        case 'select':
          _element = this.createFieldSelect(field);
          _element.setAttribute('name',`${this.quadroInFocu.type}.${this.quadroInFocu.objectDto}.${String(field.propertDto)}`);
          break;
      }
      const formgroup = this.createformGroup(field)
      formgroup.appendChild(_element as HTMLElement)
      return formgroup;
  }
  createformGroup(field:campo):HTMLDivElement{
    const div = document.createElement('div');
    div.classList.add('form-group-item');

    const label = document.createElement('label');
    label.setAttribute('for',field.id)
    
    label.textContent = field.description
    if (field.required == true){
      label.textContent = label.textContent
      label.append(this.ObjectsDOMBaseService!.DOMLabelIsRequerid().cloneNode(true))
    }
    div.appendChild(label)
    return div;
  }
  private createFieldInput(field:campo){
    const input = document.createElement('input');
      input.type = field.type;
      if (field.maxlength != undefined && field.maxlength > 0){
        input.style.width = `${field.maxlength *8}px`  
      }else{
        input.style.width = "20px"  
      }
      input.classList.add("form-control")

      this.setAtributesData(input,field)
      input.setAttribute('name',`${this.quadroInFocu.type}.${this.quadroInFocu.objectDto}.${String(field.propertDto)}`);
      input.setAttribute('set',`${this.quadroInFocu.objectDto}.${String(field.propertDto)}`);
      return input
  }
  private createFieldInputTypeLine(field:campo){
    const input = document.createElement('input');
      input.type = field.type;

      if (field.maxlength != undefined && field.maxlength > 0){
        input.style.width = `${field.maxlength *8}px`  
      }else{
        input.style.width = "50px"  
      }
      this.setAtributesData(input,field)
      input.setAttribute('name',`${this.quadroInFocu.type}.${this.quadroInFocu.objectDto}.${String(field.propertDto)}.0`);
      input.setAttribute('set',`${this.quadroInFocu.objectDto}.${String(field.propertDto)}.0`);
      return input
  }

  private createFieldSelect(field:campo):HTMLSelectElement{
      const select = document.createElement('select');
      this.setAtributesData(select,field)
        field.combo?.forEach(item => {
          const option = document.createElement('option')
          option.text = item
          select.appendChild(option)
        })
      return select
  }
  private setAtributesData(node:HTMLElement,field:campo){
    node.setAttribute('data-max',String(field.max));
    node.setAttribute('data-min',String(field.min));
    node.setAttribute('data-required',String(field.required));
    node.setAttribute('data-disable',String(field.disable));
    node.setAttribute('data-childdto',`${this.quadroInFocu.child}`);
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
      
      var field = this.dynamicForm.quadro!
      .find( c => c.objectDto == atribute[1])?.campo?.find( c=>c.propertDto == atribute[2]);

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
    if(this.dynamicForm.type.toLocaleUpperCase() == "CRUD"){
      this.buttonOrLinkService!.prepareButtonsCRUD()
    }
  }
}