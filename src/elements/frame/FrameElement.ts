import { constTypeFrame } from "../../const";
import { frame } from "../../entities/form/frame";

export class FrameElement{

    protected createbase(frame:frame){

        const div = document.createElement('div');
        
        div.style.gridColumnStart = `${frame.layout.col.start}`
        div.style.gridColumnEnd = `${frame.layout.col.end}`
    
        div.style.gridRowStart = `${frame.layout.row.start}`
        div.style.gridRowEnd = `${frame.layout.row.end}`
    
        if(frame.type == constTypeFrame.BLOCK){
            div.classList.add("r-q-b")
        }
        
        if(frame.type == constTypeFrame.LINE){
            div.classList.add('r-q-l')
        }
            
        div.setAttribute('identity',frame.identity)
        
        const h3 = document.createElement('h3');
        h3.textContent = frame.name
        h3.classList.add('r-t-f')
        div.appendChild(h3)
    
        if(frame?.style?.width) div.style.width = frame.style.width
        if(frame?.style?.height) div.style.height = frame.style.height
        
    
        return div
    }
    
}