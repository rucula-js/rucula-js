import { evaluate } from "mathjs";
import { getValuePropertTypeObject, setPropertDto, sumPropert } from "../../../object/ObjectManagment";
import { representationField } from "../../../entities/form/representationField";
import { field } from "../../../entities/form/field";
import { setDependency } from "../../../table-dependency/TableDependency";
import { formatNumberWithLocalization } from "../../../Helpers/CurrencyHelper";

function formulaGetValuePropert(formula:string,input:HTMLInputElement){
    let matchObjectPropert = formula.match(/==([^.]+\.[^.]+)/)
    if(matchObjectPropert && matchObjectPropert![0] == formula){

        input.value = getValuePropertTypeObject(matchObjectPropert![1]); 
        input.addEventListener('focus',() => {
            input.value = getValuePropertTypeObject(matchObjectPropert![1]);  
        });
        input.addEventListener('click',() => {
            input.value = getValuePropertTypeObject(matchObjectPropert![1]);  
        });
        return;
    }
}

function formulaMath(formula:string,input:HTMLInputElement,frame:{type:string,objectDto:string,line?:number}){
    let matchMath = formula.match(/=MATH\(([^)]+)\)/)
    if(matchMath && matchMath[0] == formula){
        let args = matchMath[1]
        let properts = args.match(/([^*\-+\/]+)/g)
        input.addEventListener('focus',() => {
            try {
                let evalue = args;
                properts?.forEach(propert => {
                    debugger;
                    let objectPropert = propert;
                    if(propert.indexOf(".") == -1){
                        objectPropert = `${frame.objectDto}.${propert}.${frame.line}`
                    }
                    let value = getValuePropertTypeObject(objectPropert); 
                    evalue = evalue.replace(propert,value)  
                })
                input.value = evaluate(evalue);
            } catch (error) {
                input.value = "";
            }
        });
        return;
    }
}

function formulaLine(formula:string,input:HTMLInputElement,field:field,frame:{type:string,objectDto:string,line?:number}){
    let matchLine = formula.match(/=LIN\(([0-9]*)\)/)
    if(matchLine && matchLine[0] == formula){
        createLine()
        input.addEventListener('focus',() => {
            createLine()
        }); 
    }
    function createLine(){
        let number = matchLine![1] == "" ? 1 : Number(matchLine![1]);   
        let numberLine;
        if(number == 0 && frame.line == 0){
            numberLine = 1
        }
        if(number != 0 && frame.line == 0){
            numberLine = number
        }
        if(frame.line! > 0 ){
            numberLine = parseInt(getValuePropertTypeObject(`${frame.objectDto}.${field.propertDto}.${frame.line!-1}`))
            numberLine = numberLine!+number      
        }
        input.value = String(numberLine)
        let repField = representationField.prepareINPUTToField(input)
        setPropertDto(repField); 
    }
}

function formulaSUM(formula:string,input:HTMLInputElement,field:field,frame:{type:string,objectDto:string,line?:number}){
    let matchSum = formula.match(/=SUM\(([^)]+)\)/)
        if(matchSum && matchSum[0] == formula){
            let objectPropert  = `${frame.objectDto}.${field.propertDto}`
            input.addEventListener('focusout', () => {
                let sum = sumPropert(objectPropert)
                var inputIn = document.querySelector(`[set='${matchSum![1]}']`)as HTMLInputElement
                inputIn.value = formatNumberWithLocalization(String(sum))
                let repField = representationField.prepareINPUTToField(inputIn)
                setPropertDto(repField);   
                setDependency(inputIn);
            })
        }
}

export {
    formulaGetValuePropert,
    formulaMath,
    formulaLine,
    formulaSUM
}