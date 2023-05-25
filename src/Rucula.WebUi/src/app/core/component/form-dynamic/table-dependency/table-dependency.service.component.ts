import { KeyValue } from "@angular/common";
import { Injectable } from "@angular/core";
import { frame } from "../entities/form/frame";

@Injectable({
    providedIn: 'root',
})
export class TableDependencyService{
    
    private tableDependency:Array<KeyValue<string,string>> = new Array();

    public createTable(frames?:Array<frame>){
        frames?.forEach(frame => 
            frame.fields?.forEach(field => {
                
                let keyLineDependency = ""
                let valueLineDependency = ""

                if(frame.type == "block"){
                    keyLineDependency = this.keyLineDependency(frame.objectDto,field.propertDto!,"")}

                if(frame.type == "line"){
                    keyLineDependency = this.keyLineDependency(frame.objectDto,field.propertDto!,"0")}

                valueLineDependency = this.valueLineDependency(field.requerid,Number(field.maxLength),Number(field.max),Number(field.min));
                this.tableDependency.push({key:keyLineDependency, value:valueLineDependency})
            }))
            console.log(this.tableDependency)
    }
    public setDependency(propert:HTMLInputElement){
        var split = propert.getAttribute("name")!.split(".")
 
        var key = ""
        if(split[0] == "block") key = this.keyLineDependency(split[1],split[2],"");
        if(split[0] == "line") key = this.keyLineDependency(split[1],split[2],split[3]);

        var line = this.tableDependency.find(c => c.key == key);
        this.checkPropertDependency(line!, propert)
    } 

    private keyLineDependency(frame:string,propert:string, line:string,):string {                
                return `${frame}${propert}${line}`
    }

    private valueLineDependency(requerid:boolean, maxLength:number, max:number, min:number):string {                
        console.log(`${requerid},${maxLength},${max},${min}`)
        let valueLineDependency = ""
        if(requerid) valueLineDependency += "1,"
        if(maxLength > 0) valueLineDependency += "2,"
        if(max > 0) valueLineDependency += "3,"
        if(min > 0) valueLineDependency += "4,"
        return valueLineDependency;
    }
    private checkPropertDependency(dependency:KeyValue<string,string>,propert:HTMLInputElement){
        
        let check = dependency.value.split(',');
        
        check.forEach(c => {
             if(c == "1") checkRequerid(propert)
        });
        function checkRequerid(propert:HTMLInputElement){
            if(propert.value.length < 1){
                propert.style.borderColor = "red"
                propert.focus()
            } 
        }
    }
}