import { frame } from "../../../entities/form/frame";
import { deleteLine as objDeleteLite } from "../../../object/ObjectManagment";
import { deleteLine as tableDeleteLine , setDependency } from "../../../table-dependency/TableDependency";
import { getWindow } from "../../../window/Window";
import { prepareLineHeaderTable, prepareTBody, prepareTR } from "../../table/ElementsTable";
import { createFrame } from "../ElementFrame";
import { eventKeyDownKeyUpLineFrame } from "./FrameLineEvent";

export function createFrameLine(frame:frame){
    const line =  createFrame(frame)
    const table = document.createElement('table');
    table.classList.add("table-form")
    const header = prepareLineHeaderTable(frame.fields!);
    table.appendChild(header)
    const tbody = prepareTBody();
    const row = prepareTR(frame.fields!,{type:frame.type, objectDto:frame.objectDto})
    tbody.appendChild(row)
    table.appendChild(tbody)
    line.appendChild(table)
    eventKeyDownKeyUpLineFrame(row)
    return line
}

export function addLine(currentLineElement:HTMLElement,inputTargetEvent:HTMLInputElement){
    let objectDto = inputTargetEvent.getAttribute("name")?.split(".")[1];
    let window = getWindow();
    let frame = window.frames.find(c=> c.objectDto == objectDto)!
    let row = prepareTR(frame.fields!,{type:frame.type, objectDto:frame.objectDto})
    setDependencyforInputSpecial(row)
    currentLineElement.after(row)
    row.querySelector("input")?.focus()
    eventKeyDownKeyUpLineFrame(row)
}

export function removeLine(currentLineElement:HTMLElement,inputTargetEvent:HTMLInputElement){
    let nodeSuperiorIsHeader = currentLineElement.previousSibling == undefined ? true:false;
    let nextSibling = currentLineElement.nextSibling?true:undefined;
    let previousSibling = currentLineElement.previousSibling?true:undefined;

    if( nodeSuperiorIsHeader && nextSibling == undefined){
        addLine(currentLineElement,inputTargetEvent)
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
    let frame = input.getAttribute("name")!.split(".")[1] 
    let line = input.getAttribute("name")!.split(".")[3] 
    objDeleteLite({objectDto:frame, line:line})
    tableDeleteLine({objectDto:frame, line:line})
}
function setDependencyforInputSpecial(row:HTMLTableRowElement){
    row.querySelectorAll("select, input[type='checkbox']").forEach((element)=> {
        setDependency(element as HTMLInputElement|HTMLSelectElement)
    })
}
