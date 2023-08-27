import { field } from "../../entities/form/field";
import { getNextzzRowCount } from "../../object/ObjectManagment";
import { createNewLineDependecy } from "../../table-dependency/TableDependency";
import { createField, createSpanLabelIsRequerid } from "../form/ElementsInput";

export function prepareLineHeaderTable(fields:Array<field>):HTMLTableSectionElement{
    let tr = document.createElement('tr');
    let thead = document.createElement('thead');
    thead.appendChild(tr);
    fields.forEach(field => {
        const th = document.createElement('th');
        th.textContent = field.description
        if(field.requerid == true){
        th.textContent = th.textContent
        th.append(createSpanLabelIsRequerid().cloneNode(true))
        }
        alignColumnOfTable(field,th)
        tr.appendChild(th)
    })
    return thead;
}
export  function prepareTBody(){
    return document.createElement('tbody');
}
export function prepareTR(fields:Array<field>,frame:{type:string,objectDto:string,line?:number}){

    frame.line = getNextzzRowCount(frame.objectDto)
    createNewLineDependecy({
        type:frame.type,
        objectDto:frame.objectDto,
        line:frame.line!
    })    
    let tr = document.createElement('tr');
    tr.setAttribute('data-objecdto',frame.type)
    fields.forEach((field) =>{
        const td = document.createElement('td');
        const input = createField(field,frame);
        td.appendChild(input);
        alignColumnOfTable(field,td)
        tr.appendChild(td)
    })
    return tr;
}
function alignColumnOfTable(field:field, cell: HTMLTableCellElement){
    if(field.type == "text")
        cell.style.textAlign = "left"
    if(field.type == "number")
        cell.style.textAlign = "right"
    if(field.type == "select" || field.type == "checkbox")
        cell.style.textAlign = "center"
}
