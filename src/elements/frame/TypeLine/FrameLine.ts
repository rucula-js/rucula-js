import { frame } from "../../../entities/form/frame";
import { RepresentationField } from "../../../entities/form/representationField";
import { deleteLine as objectDeleteLine, zeroNextzzRowCount } from "../../../object/ObjectManagment";
import { deleteLine as tableDependencyDeleteLine , setDependency } from "../../../table-dependency/TableDependency";
import { getWindow } from "../../../window/Window";
import { prepareLineHeaderTable, prepareTBody, prepareTR } from "../../table/ElementsTable";
import { createFrame } from "../ElementFrame";
import { eventKeyDownKeyUpLineFrame } from "./FrameLineEvent";

export function createFrameLine(frame:frame){
    
    const frameLine =  createFrame(frame)
    
    const table = document.createElement('table');
    table.classList.add("f-t-line")

    const rowHeader = prepareLineHeaderTable(frame.fields!);
    table.appendChild(rowHeader)
    
    const tbody = prepareTBody();
    
    const rowDetail = prepareTR(frame.fields!,{type:frame.type, objectDto:frame.objectDto})
    
    tbody.appendChild(rowDetail)
    table.appendChild(tbody)
    frameLine.appendChild(table)
    
    eventKeyDownKeyUpLineFrame(rowDetail)
    
    return frameLine
}

export function addLine(red: RepresentationField){

    let window = getWindow();
    let frame = window.frames.find(c=> c.objectDto == red.objectDto)!
    let row = prepareTR(frame.fields!,{type:frame.type, objectDto:frame.objectDto})
    
    setDependencyforInputSpecial(row)
    row.querySelector("input")?.focus()    
    eventKeyDownKeyUpLineFrame(row)

    return row;
}

export function cleanFrame(representation: RepresentationField){
    
    let frameLine = document.querySelector(`[data-objectdto="${representation.objectDto}"] tbody`)
    
    if(frameLine){
        frameLine.innerHTML = "";
    }
    
    zeroNextzzRowCount(representation.objectDto)
}

export function removeLine(currentLineElement:HTMLElement,inputTargetEvent:HTMLInputElement){

    let nextSibling = currentLineElement.nextSibling
    let previousSibling = currentLineElement.previousSibling;
    let Tbody  = currentLineElement.parentNode

    const input = currentLineElement.querySelector("input") as HTMLInputElement;
    let objectDto = input.getAttribute("name")!.split(".")[1] 
    let line = input.getAttribute("name")!.split(".")[3] 
   
    currentLineElement.remove();

    remove();
    if(Tbody?.childNodes.length == 0){
        let newLine = addLine(RepresentationField.prepareINPUTToField(inputTargetEvent));
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
        tableDependencyDeleteLine({objectDto:objectDto, line:line})
    }
}
function setDependencyforInputSpecial(row:HTMLTableRowElement){

    const rowDetail = row.querySelectorAll("select, input[type='checkbox']")

    rowDetail.forEach((element)=> {    
        
        var elem = element as HTMLInputElement|HTMLSelectElement
        let repField = RepresentationField.prepareINPUTToField(elem)
        setDependency(repField)
    })
}
