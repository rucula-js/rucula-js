import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { button } from './button';
import { campo } from './campo';
import { dynamicForm } from './dynamicForm';
import { quadro } from './quadro';

@Injectable({
    providedIn: 'root',
})
export class FormDynamicService {
    private form!:HTMLElement;
    private dynamicForm!:dynamicForm;
    private ObjectDtoInFocu!:string; 

    setForm(dynamic:dynamicForm){
      this.dynamicForm = dynamic;
      this.form = document.getElementById('form-dynamic')!;
      const janelaName = document.createElement('h2')
      janelaName.textContent = this.dynamicForm.tela
      this.form.appendChild(janelaName)
      this.prepareQuadro()
      this.createButtons()
      this.setEvents()
      this.GetDto()
    }
    private prepareQuadro(){
      this.dynamicForm.quadro?.forEach(quadro => {
        this.ObjectDtoInFocu = quadro.objectDto // Essa cara ajuda na ramificação ObjectDto.PropertDto
        if (quadro.type=='block'){
          this.createQuadroBlock(quadro);
        }
        if (quadro.type=='line'){
           this.createQuadroList(quadro);
        }
      })
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
      const h3 = document.createElement('h3');
      h3.textContent = quadro.name
      div.appendChild(h3)
      return div
    }

    private createQuadroBlock(quadro:quadro){
      const _quadro = this.createDivBlockElement(quadro) // cria o elemento do bloco
      const _fields = this.preparefield(quadro.campo!);  // cria um array de elementos de entrada
      _fields.forEach(field => {
        _quadro.appendChild(field)
      })
      this.form.appendChild(_quadro)
    }
    private createDivBlockElement(quadro:quadro):HTMLDivElement{
      const div = document.createElement('div');
      div.classList.add("quadro-block")
      div.setAttribute('data-objectDto',quadro.objectDto)
      const h3 = document.createElement('h3');
      h3.textContent = quadro.name
      div.appendChild(h3)
      return div
    }
    private preparefield(fields:Array<campo>):Array<HTMLDivElement>{
      let _fields: Array<HTMLDivElement> = new Array<HTMLDivElement>();
      fields.forEach(field => {
        _fields.push(this.createField(field)) 
      })
      return _fields;
    }
    private prepareLineHeaderTable(fields:Array<campo>):HTMLTableRowElement{
      
      let tr = document.createElement('tr');
      fields.forEach(field =>{
        const th = document.createElement('th');
        th.textContent = field.description
        if (field.required == true){
          th.textContent = th.textContent+"*"
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
      return _element!;
    }
    private createField(field:campo):HTMLDivElement{
      let _element
      switch(field.type){
        case 'text':
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
  private createFieldInput(field:campo){
    const input = document.createElement('input');
      input.type = field.type;

      if (field.maxlength != undefined && field.maxlength > 0){
        input.style.width = `${field.maxlength *8}px`  
      }else{
        input.style.width = "20px"  
      }
      this.setAtributesData(input,field)
      this.ObjectDtoInFocu
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
    node.setAttribute('maxlength',String(field.maxlength));  
    node.setAttribute('data-id',field.id);
    node.setAttribute('data-maxlength',String(field.maxlength));
    node.setAttribute('data-max',String(field.max));
    node.setAttribute('data-min',String(field.min));
    node.setAttribute('data-required',String(field.required));
    node.setAttribute('data-disable',String(field.disable));
    node.setAttribute('data-objectDto',this.ObjectDtoInFocu);
    node.setAttribute('data-propertDto',String(field.propertDto));
  }
  createformGroup(field:campo):HTMLDivElement{
    const div = document.createElement('div');
    div.classList.add('form-group-item');

    const label = document.createElement('label');
    label.setAttribute('for',field.id)
    
    label.textContent = field.description
    if (field.required == true){
      label.textContent = label.textContent+"*"
    }
    div.appendChild(label)
    return div;
  }
  private keyEvents:Array<string> = new Array<string>();
  private lineClone!:HTMLElement; // como pode conter mais de uma tela de linha, é importante ser um arra map
  
  setEvents(){
    const line =  document.querySelectorAll('.quadro-list table tr')
    line[1].addEventListener('keydown',(event)=> {
        this.crudLineQuadro(event)
    })
    line[1]?.addEventListener('keyup',(event)=> {
          this.keyEvents = []
    })
    this.lineClone = (line[1] as HTMLElement).cloneNode(true) as HTMLElement
  }
  private crudLineQuadro(event:Event){
    
    const current = (event.currentTarget as HTMLElement)
    const key = (event as KeyboardEvent).key;
    if(this.keyEvents.filter(c=> c==key).length == 0){
      this.keyEvents.push(key)
    }
    this.keyEvents.sort()
    if (this.keyEvents[0] == "Alt" && this.keyEvents[1] == "Control" && this.keyEvents[2] ==  "l"){
        var clone = this.createNewLine() 
        current.after(clone)
    }
    if (this.keyEvents[0] == "Alt" && this.keyEvents[1] == "Control" && this.keyEvents[2] ==  "d"){
      if (document.querySelectorAll('.quadro-list table tr').length == 2){
        (event.currentTarget as HTMLElement).after(this.createNewLine());
        (event.currentTarget as HTMLElement).remove()
      }else{
        (event.currentTarget as HTMLElement).remove()
      }
      this.keyEvents = []
    }
  }
  private createNewLine():HTMLElement{
    var clone = this.lineClone.cloneNode(true);
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

  GetDto(){
    let con =  document.querySelectorAll('[data-propertdto]')
    let ObjectMap : Array<KeyValue<string,KeyValue<string,any>>> = new Array<KeyValue<string,KeyValue<string,any>>>();
    con.forEach((item) => {
      ObjectMap.push({
        key:item.getAttribute('data-objectdto')!,
        value:
        {
          key:item.getAttribute('data-propertdto')!,
          value:
          (item as HTMLInputElement|HTMLSelectElement).value
        }
      })
    })
  }
}