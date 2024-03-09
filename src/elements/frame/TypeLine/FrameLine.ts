import { frame } from "../../../entities/form/frame";
import { RepresentationField } from "../../../entities/form/representationField";
import { managmentObject, deleteLine as objectDeleteLine, zeroNextzzRowCount } from "../../../object/ObjectManagment";
import { tableDependency, tableDependency as tableDependencyDeleteLine } from "../../../table-dependency/TableDependency";
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
    
        tbody.appendChild(rowDetail)
        table.appendChild(tbody)
        frameLine.appendChild(table)
        
        eventKeyDownKeyUpLineFrame(rowDetail)
        
        return frameLine
    }
    
    function addLine(identity:string){

        let fields = managmentObject.frame.addNewLine(identity)
    
        const row = frameLineTableDOM.table.createRowDetail(fields)
        
        setDependencyforInputSpecial(row)
    
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
        
        zeroNextzzRowCount(representation.objectDto)
    }
    
    function removeLine(currentLineElement:HTMLElement,inputTargetEvent:HTMLInputElement){
    
        let nextSibling = currentLineElement.nextSibling
        let previousSibling = currentLineElement.previousSibling;
        let Tbody  = currentLineElement.parentNode
    
        const input = currentLineElement.querySelector("input") as HTMLInputElement;
        let objectDto = input.getAttribute("name")!.split(".")[1] 
        let line = input.getAttribute("name")!.split(".")[3] 
       
        currentLineElement.remove();
    
        remove();
        if(Tbody?.childNodes.length == 0){
            let newLine = addLine(inputTargetEvent.getAttribute("identity")!);
            Tbody.appendChild(newLine)
            return;
        }
    
        if(previousSibling){
            (previousSibling as HTMLElement).querySelector("input")?.focus();
        }
    
        if(nextSibling){
            (nextSibling as HTMLElement).querySelector("input")?.focus();
        }
    
        function remove(){
            objectDeleteLine({objectDto:objectDto, line:line})
            // tableDependencyDeleteLine({objectDto:objectDto, line:line})
        }
    }
    function setDependencyforInputSpecial(row:HTMLTableRowElement){
    
        const rowDetail = row.querySelectorAll("select, input[type='checkbox']")
    
        rowDetail.forEach((element)=> {    
            
            var elem = element as HTMLInputElement|HTMLSelectElement
            
            var identity = elem.getAttribute("identity")!
    
            tableDependency.set(identity,elem.value)
    
        })
    }

    
    return {
        createFrameLine: (frame:frame) => {
            return createFrameLine(frame)
        },
        addLine: (identity:string) => {
            return  addLine(identity)
        },
        removeLine:(currentLineElement:HTMLElement,inputTargetEvent:HTMLInputElement) => {
            removeLine(currentLineElement,inputTargetEvent)
        },
        cleanFrame: (representation: RepresentationField) => {
            cleanFrame(representation) 
        }
    }
})()
