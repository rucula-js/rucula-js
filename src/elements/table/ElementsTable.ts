import { alignItem } from "../../Helpers/Helper";
import { constTypeInput } from "../../const";
import { field } from "../../entities/form/field";
import { getNextzzRowCount } from "../../object/ObjectManagment";
import { createNewLineDependecy } from "../../table-dependency/TableDependency";
import { setDefaultInput } from "../Defaults";
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

        alignItem(field,th)
        
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
        
        setDefaultInput(field)
        
        const td = document.createElement('td');
        const input = createField(field,frame); 
        td.appendChild(input);
    
        alignItem(field,input as HTMLInputElement)
        
        tr.appendChild(td)
    })
    return tr;
}
