import { alignItem } from "../../Helpers/Helper";
import { constFrameLineActions } from "../../const";
import { field } from "../../entities/form/field";

import { fieldDOM } from "../form/ElementsInput";

export let frameLineTableDOM = (() => {

    function appendActions(td:HTMLTableCellElement){
        let actions = document.getElementById(constFrameLineActions.ACTIONS) as HTMLDivElement
        td.appendChild(actions)
    }
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
                               
                const td = document.createElement('td'); // actions
                tr.appendChild(td)


                tr.addEventListener('mouseover',(e) => {
                    appendActions(td)
                })

                fields.forEach((field) =>{
                            
                    const td = document.createElement('td');

                    const input = fieldDOM.create(field); 

                    td.appendChild(input);
                
                    alignItem(field,input as HTMLInputElement)
                    
                    tr.appendChild(td)
                })
                return tr;
            },
            createActions:() => {
                const div = document.createElement('div')
                div.innerHTML = `<div id=${constFrameLineActions.ACTIONS} class="f-l-actions">
                                    <button class="add" id=${constFrameLineActions.ADD}><i class="bi bi-plus-lg"></i></button>
                                    <button class="remove" id=${constFrameLineActions.REMOVE}><i class="bi bi-trash"></i></button>
                                </div>`

                    return div
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