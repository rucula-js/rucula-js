import { addLine, cleanFrame } from "../elements/frame/TypeLine/FrameLine";
import { RepresentationField } from "../entities/form/representationField";
import { getThis } from "../window/Window";

export function setValueInForm(obj:any, objectDto:string="", line:string = ""){

    if(objectDto == ""){
        objectDto = getThis()
    }

    Object.keys(obj).forEach(key => {
        
        if(Array.isArray(obj[key])){
            
            let representation = new RepresentationField()
            representation.objectDto = key;
            
            cleanFrame(representation)

            let frameLine = document.querySelector(`[data-objectdto="${representation.objectDto}"] tbody`)

            obj[key].forEach((item:any,index:any) => {

                representation.lineNumber = index 
                
                const line = addLine(representation)
                frameLine?.appendChild(line)

                setValueInForm(item,key,`.${index}`)
            
            })
        }

        if(obj[key] == null){
            return;
        }

        if (typeof obj[key] == "string" || typeof obj[key] == "number"){ 

            let atribute = `[set="${objectDto}.${key}${line}"]`;
            
            let input = document.querySelector(atribute) as HTMLInputElement;
            
            if(input){

                input.value = obj[key]
            } 
        }
        
        if(typeof obj[key] == "object"){
            setValueInForm(obj[key],key);
        }
    });
}
