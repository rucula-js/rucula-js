import { KeyEventAdd, KeyEventClear, KeyEventGetIndex } from "../global/KeyEvents";
import { getWindow } from "../window/Window";
import { create } from "./Popper";




export function setEventForInformationInputQuadro(input:HTMLElement){
    input.addEventListener('keydown',(event)=> {
        createPopper(event)
    })
    input.addEventListener('keyup',(event)=> {
        KeyEventClear();
    })
}
export function hiddenPopper(){
    const boxWindow =  document.getElementById('box-window')
    boxWindow?.addEventListener('click',()=>{
      var tooltip = document.getElementById("tooltip")!
      tooltip.style.display = 'none';
    })
}
function  createPopper(event:Event){
    const current = (event.currentTarget as HTMLElement)
    const key = (event as KeyboardEvent).key;
    KeyEventAdd(key)
    if (KeyEventGetIndex(0) == "Control" && KeyEventGetIndex(1) == "h"){
        event.preventDefault();
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
