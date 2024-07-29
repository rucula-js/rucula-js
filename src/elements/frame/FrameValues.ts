import { frame } from "../../entities/form/frame";
import { exportManagmentObject } from "../../exports";

export let frameValues = (() => {
    return {
        setValuesDefined: function (frame:frame, htmlElement:HTMLElement){

            frame.fields?.forEach(field => {
    
                let input = htmlElement.querySelector(field.identity) as HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement
                
                if(input){
                    exportManagmentObject.object.field.setValueContextIdentity(field.identity,field.type, input.value);
                }
            })
        }
    }
})()