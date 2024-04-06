import { alignItem } from "../../Helpers/Helper";
import { field } from "../../entities/form/field";
import { frame } from "../../entities/form/frame";
import { managmentObject } from "../../object/ObjectManagment";
import { fieldDOM } from "../form/ElementsInput";
import { FrameLineEventDOM } from "../frame/TypeLine/FrameLineEvent";

export let frameLineTableDOM = (() => {

    return {
        table: {
            createHeader: (frame:frame) => {
                
                let fields:field[] = frame.fields || []
                
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
            
            createRowDetail: (frame:frame) => {
                
                let tr = document.createElement('tr');
                               
                const tdActions = document.createElement('td'); //? first td is used for actions line
                tdActions.setAttribute('ruc-action','')
                tr.appendChild(tdActions)

                let fields:field[]|undefined = managmentObject.frame.addLineForFrame(frame)

                if(fields){
                    FrameLineEventDOM.addActionsInCell(tr,fields[0].identity)
                }

                fields?.forEach((field) =>{
                            
                    const td = document.createElement('td');

                    const input = fieldDOM.create(field); 

                    td.appendChild(input)
                
                    alignItem(field,input as HTMLInputElement)
                    
                    tr.appendChild(td)

                    if(frame.requerid ){    
                        let input = td.querySelector('input, select') as HTMLInputElement|HTMLSelectElement
                        managmentObject.object.field.setValueContextIdentity(field.identity, input.value);
                    }
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