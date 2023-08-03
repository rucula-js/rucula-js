import { getWindow } from './Window';
import * as table  from '../table-dependency/TableDependency';
import * as obj from '../object/ObjectManagment';
import { create } from '../popper/Popper';

'use strict';

let keyEvents:Array<string> = new Array<string>();
let lineClone:Map<string,HTMLElement> = new  Map<string,HTMLElement>(); // como pode conter mais de uma tela de linha, é importante ser um arra map

export function setEvents(){
    setEventForCreationLine()
    setEventForInformationInputQuadro()
}
export function setEventListenerForInput(element:HTMLSelectElement | HTMLInputElement){
    element.addEventListener('focusout',(e) => {
        obj.setPropertDto(e.target as HTMLInputElement);
        table.setDependency(e.target as HTMLInputElement)
    })
}
function  setEventForCreationLine(){
    const line =  document.querySelectorAll('.quadro-list table tr[data-objecdto]')
    line.forEach((element) => {
      eventKeyDownKeyUpLineFrame(element as HTMLElement)
      lineClone.set(element.getAttribute("data-objecdto")!,(element as HTMLElement).cloneNode(true) as HTMLElement)
    }); 
}
function eventKeyDownKeyUpLineFrame(element:HTMLElement){
    element.addEventListener('keydown',(event)=> {
      crudLineQuadro(event)
    })
      element.addEventListener('keyup',(event)=> {
          keyEvents = []
    })
}
function setEventForInformationInputQuadro(){
    const line =  document.querySelectorAll('#box-window input,#box-window select')
    line.forEach((element) => {
      element.addEventListener('keydown',(event)=> {
        createPopper(event)
      })
        element.addEventListener('keyup',(event)=> {
            keyEvents = []
      })
    });
    const boxWindow =  document.getElementById('box-window')
    boxWindow?.addEventListener('click',()=>{
      var tooltip = document.getElementById("tooltip")!
      tooltip.style.display = 'none';
    })
}
function  createPopper(event:Event){
    const current = (event.currentTarget as HTMLElement)
    const key = (event as KeyboardEvent).key;
    if(keyEvents.filter(c=> c==key).length == 0){
      keyEvents.push(key)
    }
    keyEvents.sort()
    if (keyEvents[0] == "Alt" && keyEvents[1] == "h"){
     
      var atribute = current.getAttribute('name')!.split('.');
      
      
      var field = getWindow().frames!.find( c => c.objectDto == atribute[1])?.fields?.find(c=>c.propertDto == atribute[2]);

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
      create(current,tooltip)
    }
}
function crudLineQuadro(event:Event){

    const key = (event as KeyboardEvent).key;
    
    if(keyEvents.filter(c=> c == key).length == 0) keyEvents.push(key)
    keyEvents.sort()

    let nextLine = null;
    let previousLine = null;
    
    let input:HTMLInputElement = event.target as HTMLInputElement 
    let currentLineElement:HTMLElement = (event.currentTarget as HTMLElement)

    if(keyEvents[0] == "ArrowUp"){
      previousLine = (currentLineElement.previousSibling as HTMLTableRowElement)

      let split = input.getAttribute("name")!.split(".")
      let type = split[0] 
      let object = split[1]
      let propert = split[2]
      
      var atribute =`input[name^="${type}.${object}.${propert}."]`;
      let varttt = previousLine?.querySelector(atribute);
      (varttt as HTMLInputElement)?.focus()
    }
    
    if(keyEvents[0] == "ArrowDown"){
      nextLine = (currentLineElement.nextSibling as HTMLTableRowElement)

      let split = input.getAttribute("name")!.split(".")
      let type = split[0] 
      let object = split[1]!
      let propert = split[2]!
      
      var atribute =`input[name^="${type}.${object}.${propert}."]`;
      let varttt = nextLine?.querySelector(atribute);
      (varttt as HTMLInputElement)?.focus()
    }
    if (keyEvents[0] == undefined || keyEvents[1] == undefined) return

    if (keyEvents[0] == "Control" && keyEvents[1] ==  "Enter"){
        event.preventDefault();
        var newLine = createNewLine(currentLineElement.getAttribute('data-objecdto')!)
        currentLineElement.after(newLine)
        newLine.querySelector("input")?.focus()
    }
    if (keyEvents[0] == "0" && keyEvents[1] == "Control"){
      event.preventDefault();
      let nodeSuperiorIsHeader = currentLineElement.previousSibling == undefined ? true:false;
      let nextSibling = currentLineElement.nextSibling?true:undefined;
      let previousSibling = currentLineElement.previousSibling?true:undefined;

      if( nodeSuperiorIsHeader && nextSibling == undefined){
          let newLineForDelete = createNewLine(currentLineElement.getAttribute('data-objecdto')!)
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
      obj.deleteLine(input)
      table.deleteLine(input)

      keyEvents = []
    }
}
function createNewLine(ObjectdtoLine:string):HTMLElement{

    var clone:HTMLElement = (lineClone.get(ObjectdtoLine) as HTMLElement).cloneNode(true) as HTMLElement;

    clone.childNodes.forEach(item => {
        let atributeName = (item.firstChild as HTMLElement).getAttribute('name')?.split(".")! ;

        (item.firstChild as HTMLElement).setAttribute('name',
        `${atributeName[0]}.${atributeName[1]}.${atributeName[2]}.${Number(atributeName[3])+1}`);
        
        (item.firstChild as HTMLElement).setAttribute('set',
        `${atributeName[1]}.${atributeName[2]}.${Number(atributeName[3])+1}`)
        setEventListenerForInput(item.firstChild as HTMLInputElement)
    })
        lineClone.set(ObjectdtoLine,(clone as HTMLElement).cloneNode(true) as HTMLElement)
        eventKeyDownKeyUpLineFrame(clone as HTMLElement)
        table.createNewLine(clone.querySelector("input")!)
        clone.querySelectorAll("select, input[type='checkbox']").forEach((element)=> {
        table.setDependency(element as HTMLInputElement|HTMLSelectElement)
    })
    return clone as HTMLElement;
}


