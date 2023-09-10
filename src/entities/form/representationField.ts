export class representationField{
    public type?:string
    public objectDto!:string
    public propertDto!:string
    public lineNumber?:number
    public value!:string|number

    public static prepareINPUTToField(input:HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement):representationField{
        let representation = new representationField()
        let map =  input.getAttribute("name")!.split(".")
        representation.type = map[0]
        representation.objectDto = map[1]
        representation.propertDto  = map[2]
        representation.value = input.value
        if(map[3])
            representation.lineNumber = Number(map[3])
        
        return  representation;
    }
}