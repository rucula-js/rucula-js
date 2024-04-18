import { constFrameLineActions } from "../../../const";
import { frame } from "../../../entities/form/frame";
import { frameLineTableDOM } from "../../table/ElementsTable";
import { createFrame } from "../ElementFrame";
import { frameEvent } from "../FrameEvent";
import { FrameLineEventDOM } from "./FrameLineEvent";

export let frameLineDOM =  (() => {

    function createTDActions(identity:string){

        const div = document.createElement('div') as HTMLDivElement
        div.setAttribute('id', identity);
        div.setAttribute('class', 'f-l-actions r-text-nowrap');

        div.innerHTML = `<a class="add" id=${constFrameLineActions.ADD}><i class="bi bi-plus-lg"></i></a>
            <a class="remove" id=${constFrameLineActions.REMOVE}><i class="bi bi-trash"></i></a>`
       
        FrameLineEventDOM.eventActions(div)
        
        return div
    }
    
    function createFrameLine(frame:frame){     
        let newFrame = Object.create(frame) as frame
        
        const frameLine = createFrame(frame)
        
        const table = document.createElement('table');
        table.classList.add("f-t-line")
    
        let title = frameLine.querySelector('h3')!
        
        const rowHeader = frameLineTableDOM.table.header.createHeader(frame)

        let thTitle = rowHeader.querySelector('th')!
        thTitle.appendChild(title)
        
        table.appendChild(rowHeader)
        
        const tbody = document.createElement('tbody')

        const rowDetail = frameLineTableDOM.table.detail.createRowDetail(newFrame)
        
        let td = frameLineTableDOM.table.detail.getCellActions(rowDetail)
        
        td?.appendChild(createTDActions(frame.identity))
        
        tbody.appendChild(rowDetail)
        table.appendChild(tbody)
        frameLine.appendChild(table)
        
        FrameLineEventDOM.eventKeyDownKeyUpLineFrame(rowDetail)   
        if(frame.requerid == false){
            frameEvent.managedFrame(frameLine)
            frameEvent.cleanRequeridDependency(frameLine)

        }        return frameLine
    }
    
    
    return {
        createFrameLine: (frame:frame) => {
            return createFrameLine(frame)
        },

    }
})()
