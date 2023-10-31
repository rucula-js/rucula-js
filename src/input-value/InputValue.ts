import { addLine, cleanFrame } from "../elements/frame/TypeLine/FrameLine";
import { RepresentationField } from "../entities/form/representationField";
import { getThis } from "../window/Window";

export function setValueInForm(obj:any, objectDto:string="", line:string = ""){

    if(objectDto == ""){
        objectDto = getThis()
    }

    for (let propert in obj){
        
        if(Array.isArray(obj[propert])){
            
            let representation = new RepresentationField()
            representation.objectDto = propert;
            
            cleanFrame(representation)

            let frameLine = document.querySelector(`[data-objectdto="${representation.objectDto}"] tbody`)

            obj[propert].forEach((item:any,index:any) => {

                representation.lineNumber = index 
                
                const line = addLine(representation)
                frameLine?.appendChild(line)

                setValueInForm(item,propert,`.${index}`)
            
            })
        }
        
        if(obj[propert] == null){
            return;
        }

        if (typeof obj[propert] == "string" || typeof obj[propert] == "number"){ 

            let atribute = `[set="${objectDto}.${propert}${line}"]`;
            
            let input = document.querySelector(atribute) as HTMLInputElement;
            
            if(input){

                input.value = obj[propert]
            } 
        }
        
        if(typeof obj[propert] == "object"){
            setValueInForm(obj[propert],propert);
        }
    }
}
