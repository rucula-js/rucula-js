import { alignItem } from "../../Helpers/Helper";
import { field } from "../../entities/form/field";

import { fieldDOM } from "../form/ElementsInput";

export let frameLineTableDOM = (() => {

    return {
        table: {
            createHeader: (fields:field[]) => {
                
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
                return thead as HTMLTableSectionElement;
            },
            createRowDetail: (fields:field[]) => {
                

                let tr = document.createElement('tr');
                                
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