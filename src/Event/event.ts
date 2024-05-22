import { windowBaseDOM } from "../elements/window-base/WindowBase"
import { managmentObject } from "../object/ObjectManagment"

export let eventManagment = (() => {

    return {        
        field: {

            getDetails:(event:CustomEvent) => {
            
                let identity = event.detail.identity

                return {
                    identity: (identity.element as HTMLElement).getAttribute('identity'),
                    name:identity.name,
                    row: identity.row,
                    value: managmentObject.object.object.getPropert(identity.name),
                    targetPathWithRow:(targetPath:string) => {

                        //? This method helps to create Target Path with the current event line
                        return `${targetPath}.${identity.row}`
                    }             
                }
            } 
        },
        on:(event:string, callback:any, query?:string) => {
             
            let rucula = windowBaseDOM.getElementRoot()

            if(query == undefined){
                rucula.addEventListener(event, (e) => callback(e))
                return
            }

            let itens = rucula.querySelectorAll(query)

            itens.forEach((item) => {
                item.addEventListener(event, (e) => callback(e))
            }) 
        }  
    }
})()