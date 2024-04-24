import { frame } from "../../entities/form/frame";
import { managmentObject } from "../../object/ObjectManagment";

export let frameValues = (() => {
    return {
        setValuesDefined: function (frame:frame, htmlElement:HTMLElement){

            frame.fields?.forEach(field => {
    
                let input = htmlElement.querySelector(field.identity) as HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement
                
                if(input){
                    managmentObject.object.field.setValueContextIdentity(field.identity,field.type, input.value);
                }
            })
        }
    }
})()