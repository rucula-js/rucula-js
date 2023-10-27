import { getThis } from "../window/Window";

export function setValueInForm(obj:any, objectDto:string="", line:string = ""){

    Object.keys(obj).forEach(key => {
        
        if(Array.isArray(obj[key])){
            obj[key].forEach((item:any,index:any) => {
                setValueInForm(item,key,`.${index}`)
            })
        }

        if(obj[key] == null){
            return;
        }
        if (typeof obj[key] == "string" || typeof obj[key] == "number"){  
            let atribute = "";
            objectDto == "" ? atribute = `[set="${getThis()}.${key}${line}"]` : atribute = `[set="${objectDto}.${key}${line}"]`;

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