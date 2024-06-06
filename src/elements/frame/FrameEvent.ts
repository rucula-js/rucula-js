import { exportTableDependency } from "../../exports";
import { fragment } from "../../fragment/fragment";
import { managmentObject } from "../../object/ObjectManagment";

export let frameEvent = (() => {

    return {

        managedFrame:(frameElement:HTMLElement) => {
            // Manages frames that are not mandatory based on user input
            frameElement?.addEventListener('input',(event) => valueInformed(event))
            frameElement?.addEventListener('change',(event) => valueInformed(event))
            
            function valueInformed(event:Event){
                
                let target = event.target as HTMLInputElement|HTMLSelectElement

                let identity = target.getAttribute('identity')!
                
                let fragmentObject = fragment.objects.getForFieldIdentity(identity)

                let count = managmentObject.object.object.count(fragmentObject.key.identity)

                if(count > 1){
                    // This option indicates that the Frame previously obtained user input, 
                    // which caused the frame to change its behavior to be managed
                    return
                }

                if(target){                    
                    exportTableDependency.moveImbernateToNotResolved(fragmentObject.key.identity)
                }
            }
        },

        cleanRequeridDependency:(frameElement:HTMLDivElement) => {
    
            frameElement.addEventListener('keyup',(event) => {

                const key = event.key;

                let identity = (event.target as HTMLElement).getAttribute('identity')!

                let fragmentObject = fragment.objects.getForFieldIdentity(identity)

                let count = managmentObject.object.object.count(fragmentObject.key.identity)
        
                if(count  >1){
                    exportTableDependency.moveImbernateToNotResolved(fragmentObject.key.identity)
                }
                if(key == 'Escape' && count  == 1){
 
                    exportTableDependency.moveNotResolvedToImbernate(fragmentObject.key.identity)
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
})()