import { Injectable } from '@angular/core';
import { campo } from './campo';
import { dynamicForm } from './dynamicForm';
import { quadro } from './quadro';

@Injectable({
    providedIn: 'root',
})
export class FormDynamicService {
    private form!:HTMLElement;
    private dynamicForm!:dynamicForm; 

    setForm(dynamic:dynamicForm){
      this.dynamicForm = dynamic;
      this.form = document.getElementById('form-dynamic')!;
      const janelaName = document.createElement('h2')
      janelaName.textContent = this.dynamicForm.tela
      this.form.appendChild(janelaName)
      this.prepareQuadro()
      this.setEvents()
    }
    private prepareQuadro(){
      this.dynamicForm.quadro?.forEach(quadro => {
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
      input.setAttribute('maxlength',String(field.maxlength));  
      input.setAttribute('data-id',field.id);
      input.setAttribute('data-maxlength',String(field.maxlength));
      input.setAttribute('data-max',String(field.max));
      input.setAttribute('data-min',String(field.min));
      input.setAttribute('data-required',String(field.required));
      input.setAttribute('data-disable',String(field.disable));
      input.setAttribute('data-propertDto',String(field.propertDto));
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
      input.setAttribute('maxlength',String(field.maxlength));  
      input.setAttribute('data-id',field.id);
      input.setAttribute('data-maxlength',String(field.maxlength));
      input.setAttribute('data-max',String(field.max));
      input.setAttribute('data-min',String(field.min));
      input.setAttribute('data-required',String(field.required));
      input.setAttribute('data-disable',String(field.disable));
      input.setAttribute('data-propertDto',String(field.propertDto));

      return input
  }

  private createFieldSelect(field:campo):HTMLSelectElement{
      const select = document.createElement('select');
        field.combo?.forEach(item => {
          const option = document.createElement('option')
          option.text = item
          select.appendChild(option)
        })
      return select
  }

  createformGroup(field:campo):HTMLDivElement{
    const div = document.createElement('div');
    div.classList.add('form-group-item');

    const label = document.createElement('label');
    label.setAttribute('for',field.id)
    label.textContent = field.description
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
      console.log(document.querySelectorAll('.quadro-list table tr').length )
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
}