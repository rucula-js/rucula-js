import { alignItem } from "../../Helpers/Helper";
import { field } from "../../entities/form/field";
import { frame } from "../../entities/form/frame";
import { fragment } from "../../fragment/fragment";
import { managmentObject } from "../../object/ObjectManagment";
import { configWindow } from "../../window/Window";
import { fieldDOM } from "../form/ElementsInput";
import { frameEvent } from "../frame/FrameEvent";
import { FrameLineEventDOM } from "../frame/TypeLine/FrameLineEvent";

export let frameLineTableDOM = (() => {
  
    function getCellActions(tr:HTMLTableRowElement){
        return tr.querySelector('td') //? 
    }

    return {
        table: {
            header: {
                createHeader: (frame:frame) => {
                                        
                    let trColumns = document.createElement('tr')
                    let trTitle = document.createElement('tr')
                    
                    let thTitle = document.createElement('th')
                    trTitle.appendChild(thTitle)
                    thTitle.style.textAlign = 'start'
                    thTitle.classList.add('title')
                    
                    let thead = document.createElement('thead');
                    
                    thead.appendChild(trTitle);
                    thead.appendChild(trColumns);
                    
                    const actions = document.createElement('th');
                    trColumns.appendChild(actions)
        
                    frame.fields?.forEach(field => {
                        
                        const th = document.createElement('th');
                        th.textContent = field.description
                        
                        if(field.requerid == true){
                            th.textContent = th.textContent
                            th.append(fieldDOM.createSpanLabelIsRequerid().cloneNode(true))
                        }
                
                        alignItem(field,th)
                        
                        trColumns.appendChild(th)
                    })
                    
                    let columnsLength = trColumns.querySelectorAll('th')
                    
                    thTitle.setAttribute('colspan',String(columnsLength.length))
                    
                    return thead as HTMLTableSectionElement;
                }
            },
            detail:{

                getCellActions: (tr:HTMLTableRowElement) => getCellActions(tr),
                
                createRowDetail: (frame:frame) => {
                    
                    let tr = document.createElement('tr');
                         
                    const tdActions = document.createElement('td'); //? first td is used for actions line
                    tdActions.setAttribute('ruc-action','')
                    tr.appendChild(tdActions)
        
                    if(frame.fields){
                        FrameLineEventDOM.addActionsInCell(tr,frame.fields[0].identity)
                    }
    
                    frame.fields?.forEach((field:field) =>{
                                
                        const td = document.createElement('td');
    
                        const elementInput = fieldDOM.create(field); 
    
                        td.appendChild(elementInput)
                    
                        alignItem(field,elementInput as HTMLInputElement)
                        
                        tr.appendChild(td)
    
                        let input = td.querySelector('input, select') as HTMLInputElement|HTMLSelectElement
                        managmentObject.object.field.setValueContextIdentity(field.identity, input.value);
                    })
                    
                    return tr;
                },

                createNewRowDetail: function (identity:string){

                    let field = fragment.fields.getForIdentity(identity)
            
                    let frame = configWindow.frame.get(field.config.fragmentObjectIdentity)
            
                    managmentObject.frame.addLine(frame)

                    const row = frameLineTableDOM.table.detail.createRowDetail(frame)
                    
                    row.querySelector("input")?.focus()    
                    
                    FrameLineEventDOM.eventKeyDownKeyUpLineFrame(row)
                
                    return row;
                },
                
                deleteRowDetail: function (currentLineElement:HTMLTableRowElement,inputTargetEvent:HTMLInputElement){
    
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
                        
                        let newLine =  frameLineTableDOM.table.detail.createNewRowDetail(identityInputTartget);
                        
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
            }
        }
    }
})()