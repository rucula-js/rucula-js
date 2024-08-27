import { ManagmentObject } from "../../object/ObjectManagment"

export class FrameEvent {

    public managmentObject:ManagmentObject
    
    constructor(managmentObject:ManagmentObject) {
        this.managmentObject = managmentObject
    }
    managedFrame(frameElement:HTMLElement) {
        // Manages frames that are not mandatory based on user input
        frameElement?.addEventListener('input',(event) => this.valueInformed(event))
        frameElement?.addEventListener('change',(event) => this.valueInformed(event))
        
    }

    valueInformed(event:Event){
        
        let target = event.target as HTMLInputElement|HTMLSelectElement

        let identity = target.getAttribute('identity')!
        
        let fragmentObject = this.managmentObject.fragment.objects_getForFieldIdentity(identity)

        let count = this.managmentObject.count(fragmentObject.key.identity)

        if(count > 1){
            // This option indicates that the Frame previously obtained user input, 
            // which caused the frame to change its behavior to be managed
            return
        }

        if(target){                    
            this.managmentObject.tableDependency.moveImbernateToNotResolved(fragmentObject.key.identity)
        }
    }
    
    cleanRequeridDependency(frameElement:HTMLDivElement) {

        frameElement.addEventListener('keyup',(event) => {

            const key = event.key;

            let identity = (event.target as HTMLElement).getAttribute('identity')!

            let fragmentObject = this.managmentObject.fragment.objects_getForFieldIdentity(identity)

            let count = this.managmentObject.count(fragmentObject.key.identity)
    
            if(count  >1){
                this.managmentObject.tableDependency.moveImbernateToNotResolved(fragmentObject.key.identity)
            }
            if(key == 'Escape' && count  == 1){

                this.managmentObject.tableDependency.moveNotResolvedToImbernate(fragmentObject.key.identity)
                resetManageFrameTypeLine(frameElement)       
                resetManageFrameTypeBlock(frameElement)
            }

        })
    }
}

function resetManageFrameTypeBlock(frameElement:HTMLDivElement){

    if(frameElement.classList.contains('r-q-b') == false){
        return
    }
    
    cleanFrame(frameElement)
}

function resetManageFrameTypeLine(element:HTMLDivElement|HTMLTableRowElement){

    if(element.nodeName != 'TR'){
        return
    }
    cleanFrame(element)
}

function cleanFrame(blockORLine:HTMLElement){
    blockORLine.querySelectorAll('input')
        .forEach(input => input.value = '')

    blockORLine.querySelectorAll('select')
        .forEach(select => {
        
        //? Set aways the fist option of the select
        let option = select.querySelector('option')
        select.value  = option?.value || ''
    })
}