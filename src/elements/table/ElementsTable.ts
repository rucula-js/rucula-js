import { alignItem } from "../../Helpers/Helper";
import { field } from "../../entities/form/field";
import { frame } from "../../entities/form/frame";
import { fragment } from "../../fragment/fragment";
import { managmentObject } from "../../object/ObjectManagment";
import { tableDependency } from "../../table-dependency/TableDependency";
import { configWindow } from "../../window/Window";
import { fieldDOM } from "../form/ElementsInput";
import { fieldMenuContext } from "../form/Field/fieldMenuContext";
import { frameEvent } from "../frame/FrameEvent";
import { frameValues } from "../frame/FrameValues";
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
                    
                    managmentObject.frame.addLine(frame) //! This function must be started immediately at the beginning of line creation

                    let tr = document.createElement('tr');
                         
                    const tdActions = document.createElement('td'); //? first td is used for actions line
                    tdActions.setAttribute('ruc-action','')
                    tr.appendChild(tdActions)
        
                    if(frame.fields){
                        FrameLineEventDOM.addActionsInCell(tr,frame.fields[0].identity)
                    }
    
                    frame.fields?.forEach((field:field) =>{
                                
                        const td = document.createElement('td');
    
                        const elementInput = fieldDOM.create(field) as HTMLInputElement; 
                        
                        td.appendChild(elementInput)
                        
                        var alignInInput = elementInput.getAttribute('type') != "checkbox"
                    
                        if(alignInInput){
                            alignItem(field,elementInput)
                        }
                        if(alignInInput == false){
                            alignItem(field,td)
                        }

                        tr.appendChild(td)
    
                        fieldMenuContext.info.set({
                            identity: field.identity,
                            field: field
                        })
                    })

                    let rowCount = managmentObject.object.object.count(frame.identity)

                    frameValues.setValuesDefined(frame, tr);

                    if(frame.requerid == false && rowCount == 1){
                        frameEvent.managedFrame(tr)
                        frameEvent.cleanRequeridDependency(tr)
                        tableDependency.moveNotResolvedToImbernate(frame.identity)
                    }

                    if(frame.requerid == false && rowCount > 1){
                        tableDependency.moveImbernateToNotResolved(frame.identity)
                    }

                    return tr;
                },

                createNewRowDetail: function (identityObject:string){

                    let frame = configWindow.frame.get(identityObject)
        
                    const row = frameLineTableDOM.table.detail.createRowDetail(frame)
                    
                    row.querySelector("input")?.focus()    
                    
                    FrameLineEventDOM.eventKeyDownKeyUpLineFrame(row)

                    return row;
                },
                
                deleteRowDetail: function (currentLineElement:HTMLTableRowElement,inputTargetEvent:HTMLInputElement){
    
                    let nextSibling:HTMLTableRowElement = currentLineElement.nextSibling as HTMLTableRowElement
                    let previousSibling:HTMLTableRowElement = currentLineElement.previousSibling as HTMLTableRowElement;
                    let Tbody = currentLineElement.parentNode!

                    let rowElement = currentLineElement
                    currentLineElement = rowElement
                     
                    let identityInputTartget = inputTargetEvent.getAttribute("identity")!
            
                    let fragmentObject =  managmentObject.fragment.getFragmentForIdentity(identityInputTartget)
            
                    let field = fragment.fields.getForIdentity(identityInputTartget)
                        
                    let frame = configWindow.frame.get(field.config.fragmentObjectIdentity)
                    
                    moveActions(fragmentObject.config.fragmentObjectIdentity)
                    
                    let count = managmentObject.object.object.count(frame.identity)
                    
                    let actions = currentLineElement.querySelector('td div') as HTMLDivElement
                    
                    currentLineElement.remove(); //! Importante! This call must be before object and fragment. Otherwise there will be unexpected errors. 
                    managmentObject.object.object.removeLine(frame.identity,field.config.line as number)
                    managmentObject.fragment.removeFragmentsLine(frame.identity,field.config.line as number)
                    
                    if(count <= 1){
                        
                        //! IMPORTANT! Note that the unremoved fragment can be used here, which is why it was not removed before
                        
                        let newLine =  frameLineTableDOM.table.detail.createNewRowDetail(frame.identity);
                        
                        let tdActions = getCellActions(newLine)
                        
                        tdActions?.appendChild(actions)
                        
                        Tbody.appendChild(newLine)
                        
                        newLine?.querySelector("input")?.focus();
                    }
                    
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