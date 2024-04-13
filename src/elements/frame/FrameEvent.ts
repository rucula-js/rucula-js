import { tableDependency } from "../../table-dependency/TableDependency";

export let frameEvent = (() => {

    let managedFrame:boolean = false

    return {

        managedFrame:(frameElement:HTMLDivElement) => {
            // Manages frames that are not mandatory based on user input

            frameElement?.addEventListener('input',(event) => valueInformed(event))
            frameElement?.addEventListener('change',(event) => valueInformed(event))
            
            function valueInformed(event:Event){
                
                if(managedFrame){
                    // This option indicates that the Frame previously obtained user input, 
                    // which caused the frame to change its behavior to be managed
                    return
                }
                
                let target = event.target as HTMLInputElement|HTMLSelectElement

                if(target){
                    // At the first interaction recognition, the Frame starts to have mandatory Frame behavior    
                    let identity = frameElement.getAttribute('identity')!
                    
                    tableDependency.moveImbernateToNotResolved(identity)
                    
                    managedFrame = true   
                }
            }
        },

        cleanRequeridDependency:(frameElement:HTMLDivElement) => {
    
            frameElement.addEventListener('keyup',(event) => {

                const key = event.key;
    
                if(key != 'Escape' && managedFrame){
                    return
                } 
                
                let identity = frameElement.getAttribute('identity')!
                tableDependency.moveNotResolvedToImbernate(identity)

                resetManageFrameTypeLine(frameElement)       
                resetManageFrameTypeBlock(frameElement)
            })
        }
    }

    function resetManageFrameTypeBlock(frameElement:HTMLDivElement){

        if(frameElement.classList.contains('r-q-b') == false){
            return
        }
        
        cleanFrame(frameElement)
    }

    function resetManageFrameTypeLine(frameElement:HTMLDivElement){

        const FIRST_ROW_BODY = 3 //1(title),2(cols),3(fisrt row body)

        if(frameElement.classList.contains('r-q-l') == false){
            return
        }

        let rows = frameElement.querySelectorAll('tr')

        if(rows.length > FIRST_ROW_BODY){
            return
        } 

        cleanFrame(rows[FIRST_ROW_BODY-1])
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