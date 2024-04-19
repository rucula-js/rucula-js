import { constFrameLineActions } from "../../../const";
import { fragment } from "../../../fragment/fragment";
import { KeyEventAdd, KeyEventClear, KeyEventGetIndex } from "../../../global/KeyEvents";
import { managmentObject } from "../../../object/ObjectManagment";
import { frameLineTableDOM } from "../../table/ElementsTable";

'use strict';

export let FrameLineEventDOM = (() => {
    
    
    let currentLineElement:HTMLElement
    let inputTargetEvent:HTMLInputElement

    function createNewLine(currentLineElement:HTMLTableRowElement,element:HTMLElement){
        
        let field = fragment.fields.getForIdentity(element.getAttribute("identity")!)    
        let newline = frameLineTableDOM.table.detail.createNewRowDetail(field.config.fragmentObjectIdentity)
        currentLineElement.after(newline);

    }

    function deleteLine(currentLineElement:HTMLTableRowElement,element:HTMLInputElement){
        
        frameLineTableDOM.table.detail.deleteRowDetail(currentLineElement,element);
    }

    function crudLineQuadro(event:Event){

        const key = (event as KeyboardEvent).key;
        KeyEventAdd(key)

        let nextLine = null;
        let previousLine = null;

        inputTargetEvent = event.target as HTMLInputElement
        currentLineElement = (event.currentTarget as HTMLElement)

        let identity = inputTargetEvent.getAttribute("identity")

        let inputs = currentLineElement.querySelectorAll('input')

        let positionInput = 0;

        for (let index = 0; index < inputs.length; index++) {
            
            if (inputs[index].getAttribute("identity") == identity){

                positionInput = index
                break
            }
        }

        if(KeyEventGetIndex(0) == "ArrowUp"){
            
            event.preventDefault();

            previousLine = (currentLineElement.previousSibling as HTMLTableRowElement)

            let inputs = previousLine?.querySelectorAll('input')
            
            if(inputs){
                inputs[positionInput]?.focus()
            }
        }

        if(KeyEventGetIndex(0) == "ArrowDown"){
            
            event.preventDefault();
            nextLine = (currentLineElement.nextSibling as HTMLTableRowElement)
            
            let inputs = nextLine?.querySelectorAll('input')
            
            if(inputs){
                inputs[positionInput]?.focus()
            }
        }

        if (KeyEventGetIndex(0) == undefined || KeyEventGetIndex(1) == undefined){
            return
        } 

        if (KeyEventGetIndex(0) == "Control" && KeyEventGetIndex(1) ==  "Enter"){
            event.preventDefault();
            createNewLine(currentLineElement as HTMLTableRowElement,inputTargetEvent)
        }
        if (KeyEventGetIndex(0) == "0" && KeyEventGetIndex(1) == "Control"){
            event.preventDefault();
            deleteLine(currentLineElement as HTMLTableRowElement,inputTargetEvent)
        }
        
        KeyEventClear();
    }

    return {
        eventActions: (actions:HTMLDivElement) => {
    
            let add = actions.querySelector(`#${constFrameLineActions.ADD}`)
            let remove = actions.querySelector(`#${constFrameLineActions.REMOVE}`)
            
            add?.addEventListener('click',(e) => {
                let  params = TRAndInput(e)
                createNewLine(params.tr,params.input)

            })

            remove?.addEventListener('click',(e) => {

                let  params = TRAndInput(e)
                deleteLine(params.tr,params.input)

            })

            function TRAndInput(e:Event){
                let anchor = (e as Event).currentTarget as HTMLAnchorElement
                
                let td = anchor?.parentElement?.parentElement // a <- div <- td 

                let tr = td?.parentElement as HTMLTableRowElement // td <- tr

                let input = (td?.nextSibling as HTMLTableCellElement)?.querySelector('input') as HTMLInputElement

                return {
                    tr:tr,
                    input:input
                }
            }
        },

        eventKeyDownKeyUpLineFrame: (element:HTMLElement) => {
            element.addEventListener('keydown',(event)=> {
                const key = (event as KeyboardEvent).key;
                KeyEventAdd(key)
                
                crudLineQuadro(event)
            })
            element.addEventListener('keyup',(event)=> {
                KeyEventClear();
            })
        },

        addActionsInCell:(tr:HTMLTableRowElement,identity:string) => {

            
            let tdActions = tr.querySelector('td')
            
            let fragmentObject =  managmentObject.fragment.getFragmentForIdentity(identity)
            
            tr.addEventListener('mouseover',(e) => {

                let actions = document.getElementById(fragmentObject.config.fragmentObjectIdentity) as HTMLDivElement
                
                tdActions?.appendChild(actions)

            })
        }
    }
})()