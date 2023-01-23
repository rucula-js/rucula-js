import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { button } from './button';
import { campo } from './campo';
import { dynamicForm } from './dynamicForm';
import { quadro } from './quadro';
import { eventFieldService } from './eventField';
import {ObjectsDOMBaseService} from './objects-DOM-base.component.service'
@Injectable({
    providedIn: 'root',
})
export class FormDynamicService {

   constructor(private eventFieldService?:eventFieldService, private ObjectsDOMBaseService?:ObjectsDOMBaseService){}
    private form!:HTMLElement;
    private dynamicForm!:dynamicForm;
    private quadroInFocu!:quadro; 
    private ModelObjectDto!:Array<KeyValue<string,any>>
    
    setForm(dynamic:dynamicForm){

      this.dynamicForm = dynamic;
      this.form = this.ObjectsDOMBaseService!.DOMFormDynamic();
      this.form.appendChild(this.ObjectsDOMBaseService!.DOMNameWindow(this.dynamicForm.tela))
      this.prepareQuadro()
      this.createButtons()
      this.setEvents()
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
      const h3 = document.createElement('h3');
      h3.textContent = quadro.name
      div.appendChild(h3)
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
          break;
      }
      _element!.setAttribute("data-row","0") // indica a numero da primeira linha 
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
      this.eventFieldService?.SetEvent(input)

      if (field.maxlength != undefined && field.maxlength > 0){
        input.style.width = `${field.maxlength *8}px`  
      }else{
        input.style.width = "20px"  
      }
      this.setAtributesData(input,field)
      return input
  }
  private createFieldInputTypeLine(field:campo){
    const input = document.createElement('input');
    this.eventFieldService?.SetEvent(input)
      input.type = field.type;

      if (field.maxlength != undefined && field.maxlength > 0){
        input.style.width = `${field.maxlength *8}px`  
      }else{
        input.style.width = "50px"  
      }
      this.setAtributesData(input,field)
      return input
  }

  private createFieldSelect(field:campo):HTMLSelectElement{
      const select = document.createElement('select');
      this.eventFieldService?.SetEvent(select)
      this.setAtributesData(select,field)
        field.combo?.forEach(item => {
          const option = document.createElement('option')
          option.text = item
          select.appendChild(option)
        })
      return select
  }
  private setAtributesData(node:HTMLElement,field:campo){
    node.setAttribute( `data-${this.quadroInFocu.objectDto}`,"")
    if (this.quadroInFocu.type == "block"){
      node.setAttribute( `data-${this.quadroInFocu.type}.${this.quadroInFocu.objectDto}.${String(field.propertDto)}._.ruc`,"")
    }
    node.setAttribute('data-max',String(field.max));
    node.setAttribute('data-min',String(field.min));
    node.setAttribute('data-required',String(field.required));
    node.setAttribute('data-disable',String(field.disable));
    node.setAttribute('data-objecdto',`${this.quadroInFocu.objectDto}`);
    node.setAttribute('data-propertdto',`${String(field.propertDto)}`);
    node.setAttribute('data-childdto',`${this.quadroInFocu.child}`);
  }
  private keyEvents:Array<string> = new Array<string>();
  private lineClone:Map<string,HTMLElement> = new  Map<string,HTMLElement>(); // como pode conter mais de uma tela de linha, é importante ser um arra map
  
  setEvents(){
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
  private crudLineQuadro(event:Event){
    const current = (event.currentTarget as HTMLElement)
    const key = (event as KeyboardEvent).key;
    if(this.keyEvents.filter(c=> c==key).length == 0){
      this.keyEvents.push(key)
    }
    this.keyEvents.sort()
    if (this.keyEvents[0] == "Alt" && this.keyEvents[1] == "Control" && this.keyEvents[2] ==  "l"){
        var clone = this.createNewLine(current.getAttribute('data-objecdto')!)
        current.after(clone)
    }
    if (this.keyEvents[0] == "Alt" && this.keyEvents[1] == "Control" && this.keyEvents[2] ==  "d"){
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
    clone.addEventListener('keydown',(event)=> this.crudLineQuadro(event))
    clone.addEventListener('keyup',(event)=> {
      this.keyEvents = [] 
    })
    return clone as HTMLElement;
  }

  private createButtons(){
    if(this.dynamicForm.type.toLocaleUpperCase() == "CRUD"){
      this.prepareButtonsCRUD()
    }
  }

  private prepareButtonsCRUD(){
    const boxActions = document.getElementById("box-actions")
    boxActions?.appendChild(this.createButtonOrLink({action:"new",link:"",icon:"bi bi-plus-lg",text:"",type:"button",}))
    boxActions?.appendChild(this.createButtonOrLink({action:"save",link:"",icon:"bi bi-save",text:"",type:"button",color:"#81e8fa"}))
    boxActions?.appendChild(this.createButtonOrLink({action:"alter",link:"",icon:"bi bi-wrench",text:"",type:"button",color:"#81e8fa"}))
    boxActions?.appendChild(this.createButtonOrLink({action:"delete",link:"",icon:"bi bi bi-trash3",text:"",type:"button",color:"#81e8fa"}))
    boxActions?.appendChild(this.createButtonOrLink({action:"cancel",link:"",icon:"bi bi-x-lg",text:"",type:"button"}))
    boxActions?.appendChild(this.createButtonOrLink({action:"",link:"https://developer.mozilla.org/pt-BR/docs/Web/CSS/text-align",icon:"",text:"Doc",type:"link",color:""}))
  }

  private createButtonOrLink (button:button):HTMLButtonElement|HTMLAnchorElement{
    let  buttonOrLink:HTMLButtonElement|HTMLAnchorElement
    
    if(button.type != "button" && button.type != "link"){
      throw new Error("tipo do botão deve ser button ou link");
    }
    if(button.type == "button"){
      buttonOrLink = document.createElement('button')  
      buttonOrLink!.classList.add("btn-crud")
      buttonOrLink.textContent = button.text+""
    }
    if(button.type == "link"){
      buttonOrLink = document.createElement('a')
      buttonOrLink.textContent = button.text+""
      buttonOrLink.href = `${button.link}`
      buttonOrLink!.classList.add("btn-link")
      buttonOrLink!.setAttribute('target',"_blank")
    }
    buttonOrLink!.setAttribute("id",`${button.type}-${button.action}`);

    if (button.color){
      buttonOrLink!.style.backgroundColor = button.color
    }

    if (button.icon){
      let  icon = document.createElement('i')
      button.icon.split(" ").forEach(item => 
        icon.classList.add(item)
      )
      buttonOrLink!.appendChild(icon)
    }
    return buttonOrLink!
  }

  private objectDtoMap:Array<string> = new Array<string> ();
  private objectDtoList:Array<Object> = new Array<Object> ();
  
  GetDto(){
    var input:HTMLInputElement|HTMLSelectElement;
    this.ModelObjectDto = new Array<KeyValue<string,any>>()
    let quadro = document.querySelectorAll('.form-group-item input , .form-group-item select')

    quadro.forEach((item) => {
      input = (item as HTMLInputElement|HTMLSelectElement)
      this.ModelObjectDto.push({key:`${input.getAttribute('data-objecdto')!}:${input.getAttribute('data-propertdto')!}`,value:{value:input.value}})
    })
    this.ModelObjectDto.sort();    

    let quadroList =  document.querySelectorAll('.quadro-list .table-form')
    
    quadroList.forEach((table) => {
      table.childNodes.forEach( (tr,numberLine) => {
        tr.childNodes.forEach(item => {
          if(item.nodeName == "TD"){
            input = (item.firstChild as HTMLInputElement|HTMLSelectElement)
            this.ModelObjectDto.push({key:`${input.getAttribute('data-objecdto')!}:${input.getAttribute('data-propertdto')!}`,value:{value:input.value,row:numberLine}})
          }
        });
      });
    });
    
    let obj:any = {};

    let propertTypeList:Map<string, Array<Object>> = new Map<string, Array<Object>>();
    
    this.ModelObjectDto.forEach((i,index) => {
      if (this.objectDtoMap.indexOf(i.key.split(":")[0],) == -1){
        this.objectDtoMap.push(i.key.split(":")[0])
      }
    })  
    this.objectDtoMap.forEach(objectDtoMap =>{

      this.ModelObjectDto.filter(c => c.key.split(":")[0]== objectDtoMap && c.value["row"] == undefined)
        .forEach(element => {
          const keyValue = element.key.split(":")
          obj[keyValue[1]] = element.value["value"]  
      });
         
      obj = {}
      
      let lastObject = "";

      let ObjectList =  this.ModelObjectDto
      .filter(c => c.key.split(":")[0]== objectDtoMap && c.value["row"] >= 1)
      .sort(c => c.key && c.value["row"]);
        
      for (let index = 0; index < ObjectList.length; index++) {
          
        const keyValue = ObjectList[index].key.split(":")
        
        
        if (index == 0 && lastObject != ""){ // entende que acabou as propriedades do ultimo ObjetoDto, assim é preciso salva-lo
          lastObject =  keyValue[0] 
          var value =  propertTypeList.get(objectDtoMap)
          console.log(value)
          value?.push(obj)
          propertTypeList.set(objectDtoMap,value!)
          obj = {}
        }

        if (index == 0){
          lastObject =  keyValue[0] 
          obj = {}
        }

        if (index == ObjectList.length -1){  
          obj[keyValue[1]] = ObjectList[index].value["value"] 
          var value =  propertTypeList.get(objectDtoMap)
          console.log(value)
          value?.push(obj)
          propertTypeList.set(objectDtoMap,value!)
          obj = {}
          break // sai do loop
        }
        
        if (index > 0){
          if (ObjectList[index].value["row"] >  ObjectList[index-1].value["row"]){  
            var value =  propertTypeList.get(objectDtoMap)
            value?.push(obj)
            propertTypeList.set(objectDtoMap,value!)
            obj = {}
          }
        }
        obj[keyValue[1]] = ObjectList[index].value["value"] 
      }
    })
    console.log(propertTypeList)
  }
 }
