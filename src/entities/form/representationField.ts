import { convertValueType } from "../../Helpers/Helper"
import { getTypeInput } from "../../window/Window"

export class RepresentationField{
    public type?:string
    public objectDto!:string
    public propertDto!:string
    public lineNumber?:number
    public value!:string|number|boolean


    public static prepareINPUTToField(input:HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement):RepresentationField{
        
        let representation = new RepresentationField()
        
        let map =  input.getAttribute("name")!.split(".")
        
        representation.type = map[0]
        representation.objectDto = map[1]
        representation.propertDto  = map[2]
        
        let type = getTypeInput(representation)
        
        representation.value = convertValueType(input.value,type)
         
        if(map[3])
            representation.lineNumber = Number(map[3])
        
        return  representation;
    }

    
}