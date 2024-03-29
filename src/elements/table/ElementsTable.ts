import { alignItem } from "../../Helpers/Helper";
import { field } from "../../entities/form/field";

import { fieldDOM } from "../form/ElementsInput";
import { FrameLineEventDOM } from "../frame/TypeLine/FrameLineEvent";

export let frameLineTableDOM = (() => {

    return {
        table: {
            createHeader: (fields:field[]) => {
                
                let tr = document.createElement('tr');
                let thead = document.createElement('thead');
                
                thead.appendChild(tr);

                const actions = document.createElement('th');
                tr.appendChild(actions)

                fields.forEach(field => {
            
                    const th = document.createElement('th');
                    th.textContent = field.description
            
                    if(field.requerid == true){
                        th.textContent = th.textContent
                        th.append(fieldDOM.createSpanLabelIsRequerid().cloneNode(true))
                    }
            
                    alignItem(field,th)
                    
                    tr.appendChild(th)
                })
                return thead as HTMLTableSectionElement;
            },
            
            createRowDetail: (fields:field[]) => {
                
                let tr = document.createElement('tr');
                               
                const tdActions = document.createElement('td'); //? first td is used for actions line
                
                tr.appendChild(tdActions)
                
                FrameLineEventDOM.addActionsInCell(tr,fields[0].identity)

                fields.forEach((field) =>{
                            
                    const td = document.createElement('td');

                    const input = fieldDOM.create(field); 

                    td.appendChild(input);
                
                    alignItem(field,input as HTMLInputElement)
                    
                    tr.appendChild(td)
                })
                return tr;
            }
        }
    }
})()


export function prepareLineHeaderTable(fields:Array<field>):HTMLTableSectionElement{
    
    let tr = document.createElement('tr');
    let thead = document.createElement('thead');
    thead.appendChild(tr);

    fields.forEach(field => {

        const th = document.createElement('th');
        th.textContent = field.description

        if(field.requerid == true){
            th.textContent = th.textContent
            th.append(fieldDOM.createSpanLabelIsRequerid().cloneNode(true))
        }

        alignItem(field,th)
        
        tr.appendChild(th)
    })
    return thead;
}

export  function prepareTBody(){
    return document.createElement('tbody');
}