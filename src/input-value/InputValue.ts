import { formatNumberWithLocalization } from "../Helpers/CurrencyHelper";
import { constAttrInput, constTypeInput } from "../const";
import { frameLineDOM } from "../elements/frame/TypeLine/FrameLine";
import { RepresentationField } from "../entities/form/representationField";

export function setValueInForm(obj:any, objectDto:string = "", line:number = -1){

    for (let propert in obj){
        
        if(Array.isArray(obj[propert])){

            let representation = new RepresentationField()
            representation.objectDto = propert;
            representation.objectDto = propert;
            
            frameLineDOM.cleanFrame(representation)

            let frameLine = document.querySelector(`[data-objectdto="${representation.objectDto}"] tbody`)

            obj[propert].forEach((item:any,index:any) => {

                representation.lineNumber = index 
                
                // const lineAdd = addLineeee(representation)
                // frameLine?.appendChild(lineAdd)

                setValueInForm(item,propert,index)
            
            })
        }
        
        if(obj[propert] == null){
            return;
        }

        if (typeof obj[propert] == "string" || typeof obj[propert] == "number"){ 

            let lineAttr = "";
            
            if(line >= 0){
                lineAttr = `.${String(line)}`
            }

            let atribute = `[set="${objectDto}.${propert}${lineAttr}"]`;
            
            let input = document.querySelector(atribute) as HTMLInputElement;
            
            if(input){

                const type = input.getAttribute(constAttrInput.ATTR_TYPE)

                const value = obj[propert]

                input.value = value
                
                if(type == constTypeInput.CURRENCY){
                    input.value = formatNumberWithLocalization(input.value)
                }

                let representation = new RepresentationField()
                representation.objectDto = objectDto;
                representation.propertDto = propert
                
                if(line >= 0){
                    representation.lineNumber = line
                }
                representation.value = value

                // setDependency(representation)
                // setPropertDto(representation);
            } 
        }
        
        if(typeof obj[propert] == "object"){
            setValueInForm(obj[propert],propert);
        }
    }
}
