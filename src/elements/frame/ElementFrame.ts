import { constTypeFrame } from "../../const";
import { frame } from "../../entities/form/frame";

export function createFrame(frame:frame){

    const div = document.createElement('div');
    
    div.style.gridColumnStart = `${frame.layout.col.start}`
    div.style.gridColumnEnd = `${frame.layout.col.end}`

    div.style.gridRowStart = `${frame.layout.row.start}`
    div.style.gridRowEnd = `${frame.layout.row.end}`

    if(frame.type == constTypeFrame.BLOCK ||
        frame.type == constTypeFrame.CHART ){
        div.classList.add("r-q-b")
    }
    
    if(frame.type == constTypeFrame.LINE){
        div.classList.add('r-q-l')
    }
    
    div.setAttribute('data-objectDto',frame.objectDto)
    
    const h3 = document.createElement('h3');
    h3.textContent = frame.name
    h3.classList.add('r-t-f')
    div.appendChild(h3)
    
    return div
}