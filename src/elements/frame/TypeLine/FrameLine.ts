import { frame } from "../../../entities/form/frame";
import { RepresentationField } from "../../../entities/form/representationField";
import { managmentObject} from "../../../object/ObjectManagment";
import { frameLineTableDOM, prepareTBody } from "../../table/ElementsTable";
import { createFrame } from "../ElementFrame";
import { eventKeyDownKeyUpLineFrame } from "./FrameLineEvent";

export let frameLineDOM =  (() => {
    
    function createFrameLine(frame:frame){
    
        const frameLine =  createFrame(frame)
        
        const table = document.createElement('table');
        table.classList.add("f-t-line")
    
        const rowHeader = frameLineTableDOM.table.createHeader(frame.fields!)
    
        table.appendChild(rowHeader)
        
        const tbody = prepareTBody();
        
        let fields = managmentObject.frame.addFistLine(frame.identity)
    
        const rowDetail = frameLineTableDOM.table.createRowDetail(fields)
    
        let actions = rowDetail.querySelector('td')
        actions?.appendChild(frameLineTableDOM.table.createActions());

        tbody.appendChild(rowDetail)
        table.appendChild(tbody)
        frameLine.appendChild(table)
        
        eventKeyDownKeyUpLineFrame(rowDetail)
        
        return frameLine
    }
    
    function removeLineInTable(currentLineElement:HTMLElement,inputTargetEvent:HTMLInputElement){
    
        let nextSibling = currentLineElement.nextSibling
        let previousSibling = currentLineElement.previousSibling;
        let Tbody  = currentLineElement.parentNode
    
        let identityInputTartget = inputTargetEvent.getAttribute("identity")!

        currentLineElement.querySelectorAll('input').forEach(input => {
            
            let identity = input.getAttribute('identity')!

            //! IMPORTANT! In the context of this loop, only fragments other than the event fragment should be deleted
            if(identityInputTartget != identity){

                managmentObject.fragment.removeFragment(identity)
            }
        })
        
        currentLineElement.remove();
        
        if(Tbody?.childNodes.length == 0){
            //! IMPORTANT! Note that the unremoved fragment can be used here, which is why it was not removed before
            let newLine = addNewLineInTable(identityInputTartget);
            Tbody.appendChild(newLine)
        
            managmentObject.fragment.removeFragment(identityInputTartget)
        
            return;
        }

        managmentObject.fragment.removeFragment(identityInputTartget) //? Removes the fragment that was preserved before checking the existence of rows in the table body

        if(previousSibling){
            (previousSibling as HTMLElement).querySelector("input")?.focus();
        }
    
        if(nextSibling){
            (nextSibling as HTMLElement).querySelector("input")?.focus();
        }
    }

    function addNewLineInTable(identity:string){

        let fields = managmentObject.frame.addNewLine(identity)
    
        const row = frameLineTableDOM.table.createRowDetail(fields)
            
        row.querySelector("input")?.focus()    
        
        eventKeyDownKeyUpLineFrame(row)
    
        return row;
    }
    
    function cleanFrame(representation: RepresentationField){
        //! FAZER CORREÇÃO RESPEITANDO O NOMO MODELO DE FRAGMENTO
        let frameLine = document.querySelector(`[data-objectdto="${representation.objectDto}"] tbody`)
        
        if(frameLine){
            frameLine.innerHTML = "";
        }
        
    }
     
    return {
        createFrameLine: (frame:frame) => {
            return createFrameLine(frame)
        },
        addLine: (identity:string) => {
            return  addNewLineInTable(identity)
        },
        removeLine:(currentLineElement:HTMLElement,inputTargetEvent:HTMLInputElement) => {
            removeLineInTable(currentLineElement,inputTargetEvent)
        },
        cleanFrame: (representation: RepresentationField) => {
            cleanFrame(representation) 
        }
    }
})()
