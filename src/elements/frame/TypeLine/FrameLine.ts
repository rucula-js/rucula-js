import { constFrameLineActions } from "../../../const";
import { frame } from "../../../entities/form/frame";
import { RepresentationField } from "../../../entities/form/representationField";
import { managmentObject} from "../../../object/ObjectManagment";
import { frameLineTableDOM, prepareTBody } from "../../table/ElementsTable";
import { createFrame } from "../ElementFrame";
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
    
        const frameLine = createFrame(frame)
        
        const table = document.createElement('table');
        table.classList.add("f-t-line")
    
        const rowHeader = frameLineTableDOM.table.createHeader(frame.fields!)
    
        table.appendChild(rowHeader)
        
        const tbody = prepareTBody();
        
        let fields = managmentObject.frame.addFistLine(frame.identity)
    
        const rowDetail = frameLineTableDOM.table.createRowDetail(fields)
        
        let td = getCellActions(rowDetail)
        
        td?.appendChild(createTDActions(frame.identity))
        
        tbody.appendChild(rowDetail)
        table.appendChild(tbody)
        frameLine.appendChild(table)
        
        FrameLineEventDOM.eventKeyDownKeyUpLineFrame(rowDetail)
        
        return frameLine
    }
    
    function removeLineInTable(currentLineElement:HTMLTableRowElement,inputTargetEvent:HTMLInputElement){
    
        let nextSibling:HTMLTableRowElement = currentLineElement.nextSibling as HTMLTableRowElement
        let previousSibling:HTMLTableRowElement = currentLineElement.previousSibling as HTMLTableRowElement;
        let Tbody  = currentLineElement.parentNode
    
        let identityInputTartget = inputTargetEvent.getAttribute("identity")!

        currentLineElement.querySelectorAll('input').forEach(input => {
            
            let identity = input.getAttribute('identity')!

            //! IMPORTANT! In the context of this loop, only fragments other than the event fragment should be deleted
            if(identityInputTartget != identity){

                managmentObject.fragment.removeFragment(identity)
            }
        })
        
        let fragmentObject =  managmentObject.fragment.getFragmentForIdentity(identityInputTartget)

        moveActions(fragmentObject.config.fragmentObjectIdentity)

        
        if(Tbody?.childNodes.length == 1){
            
            //! IMPORTANT! Note that the unremoved fragment can be used here, which is why it was not removed before
            
            let newLine = addNewLineInTable(identityInputTartget);
            
            let tdActions = getCellActions(newLine)
            
            let actions = getActions()
            
            tdActions?.appendChild(actions)
            
            currentLineElement.remove();

            Tbody.appendChild(newLine)
            
            managmentObject.fragment.removeFragment(identityInputTartget)


            function getActions(){
                return currentLineElement.querySelector('td div') as HTMLDivElement
            }

            return;
        }
        
        currentLineElement.remove();
        managmentObject.fragment.removeFragment(identityInputTartget) //? Removes the fragment that was preserved before checking the existence of rows in the table body
        
        function moveActions(fragmentObject:string){
            
            let actions = document.getElementById(fragmentObject) as HTMLDivElement
            
            if(previousSibling){
                
                previousSibling?.querySelector("input")?.focus();
                
                let tdActions = getCellActions(previousSibling)
        
                tdActions?.appendChild(actions)
                return
            }

            if(nextSibling){
                nextSibling?.querySelector("input")?.focus();
                
                let tdActions = getCellActions(nextSibling)
            
                tdActions?.appendChild(actions)   
            }
        }

    }

    function addNewLineInTable(identity:string){

        let fields = managmentObject.frame.addNewLine(identity)
    
        const row = frameLineTableDOM.table.createRowDetail(fields)
        
        row.querySelector("input")?.focus()    
        
        FrameLineEventDOM.eventKeyDownKeyUpLineFrame(row)
    
        return row;
    }
    
    function cleanFrame(representation: RepresentationField){
        //! FAZER CORREÇÃO RESPEITANDO O NOMO MODELO DE FRAGMENTO
        let frameLine = document.querySelector(`[data-objectdto="${representation.objectDto}"] tbody`)
        
        if(frameLine){
            frameLine.innerHTML = "";
        }   
    }
     
    function getCellActions(tr:HTMLTableRowElement){
        return tr.querySelector('td') //? 
    }

    return {
        createFrameLine: (frame:frame) => {
            return createFrameLine(frame)
        },
        addLine: (identity:string) => {
            return  addNewLineInTable(identity)
        },
        removeLine:(currentLineElement:HTMLTableRowElement,inputTargetEvent:HTMLInputElement) => {
            removeLineInTable(currentLineElement,inputTargetEvent)
        },
        cleanFrame: (representation: RepresentationField) => {
            cleanFrame(representation) 
        }
    }
})()
