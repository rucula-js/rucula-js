import { KeyValue } from "@angular/common";
import { Injectable } from "@angular/core";
import { frame } from "../entities/form/frame";
import { MessageFormService } from "../message/message-form.servive.component";

@Injectable({ 
    providedIn: 'root',
})
export class TableDependencyService{

    constructor(private Message:MessageFormService){}
   
    private tableDependency:Array<KeyValue<string,string>> = new Array();
    private resolvedDependency:Array<string> = new Array();
    private ElementInFocu!: HTMLElement;
   
    private REQUERID:string = "1" as const;
    private MAX_LENGHT:string = "2" as const;
    private MAX:string = "3" as const;
    private MIN:string = "4" as const;
    private DEPENDENCIES_AND_TODOIST_TAB:string = "." as const;

    public createTableDependency(frames:Array<frame>){
        frames.forEach(frame => 
            frame.fields!.forEach(field => {

                let keyDependency = ""      // terá o formato {frame.propriedade.} ou {frame.propriedade.linha}
                let valueDependency = "" 

                if(frame.type == "block")
                    keyDependency = this.keyDependency(frame.objectDto,field.propertDto!,"")

                if(frame.type == "line")
                    keyDependency = this.keyDependency(frame.objectDto,field.propertDto!,"0")

                valueDependency = this.valueDependency(field.requerid,Number(field.maxLength),Number(field.max),Number(field.min));
                this.tableDependency.push({key:keyDependency, value:valueDependency})
                this.resolveDependecy(keyDependency,valueDependency)
            })
        )
    }

    private keyDependency(frame:string,propert:string, line:string):string {                
        return `${frame}.${propert}.${line}`
    }

    private valueDependency(requerid:boolean, maxLength:number, max:number, min:number):string {                
        let valueDependency = ""

        if(requerid) valueDependency += `${this.REQUERID},`
        if(maxLength > 0) valueDependency += `${this.MAX_LENGHT}:${maxLength},`
        if(max > 0) valueDependency += `${this.MAX}:${max},`
        if(min > 0) valueDependency += `${this.MIN}:${min},`
        valueDependency += this.DEPENDENCIES_AND_TODOIST_TAB;  
        return valueDependency;
    }

    public setDependency(input:HTMLInputElement|HTMLSelectElement){
        this.ElementInFocu = input
        let split = input.getAttribute("name")!.split(".")
        let type = split[0]
        let object = split[1]
        let propert = split[2]
        let line = split[3]
        
        var key = ""
        if(type == "block") key = this.keyDependency(object,propert,"");
        if(type == "line") key = this.keyDependency(object,propert,line);

        var lineDependency = this.tableDependency.find(c => c.key == key)!;
        this.checkPropertDependency(lineDependency, input.value)
        this.resolveDependecy(lineDependency.key,lineDependency.value)
    }
    private checkPropertDependency(dependency:KeyValue<string,string>, value:string|number|boolean){

        let dependecies = dependency.value.split(".")[0]
        let todoist = dependency.value.split(".")[0]
        let resolved = dependency.value.split(".")[1]

        dependecies.split(",").forEach(d => {
            let option = d.split(":")[0]
            if(option == this.REQUERID){
                resolved = SetOrRemoveResolved(this.consistRequerid(value),this.REQUERID,resolved)
            }
            if(option == this.MAX_LENGHT){
                resolved = SetOrRemoveResolved(this.consistMaxLen(todoist,value),this.MAX_LENGHT,resolved)
            }
            
            function SetOrRemoveResolved(status:boolean, dependency:string, resolved:string ){
                if (status == true){
                    resolved = resolved.replace(dependency+",","")
                    resolved+=dependency+","
                }
                if (status == false){
                    resolved = resolved.replace(dependency+",","")
                }
                return resolved;
            }
        })
        dependency.value = `${todoist}.${resolved}`
        
    }

    public createNewLine(propert:HTMLInputElement){
        
        this.checkCreateSpanShot(propert);
        let  split = propert.getAttribute("name")!.split(".")
        let frame:string = split[1]
        const LINE_SNAPSHOT:string = "SS"; 
        var dependecyes = this.tableDependency.filter( c=> c.key.split(".")[0] == frame && c.key.split(".")[2] == LINE_SNAPSHOT);

        dependecyes.forEach(dependency => {
            let splitDependency = dependency.key.split("."); 
            let frame:string = splitDependency[0];
            let propert = splitDependency[1];
            let newKey = `${frame}.${propert}.${split[3]}`;
            let valueDependency = `${dependency.value.split(".")[0]}.` ;

            this.tableDependency.push({
                key:newKey, 
                value:valueDependency
            })
            this.resolveDependecy(newKey,valueDependency)
        })
        console.log(this.tableDependency)
    }

    private checkCreateSpanShot(propert:HTMLInputElement){
        
        let  split = propert.getAttribute("name")!.split(".")
        let frame:string = split[1]

        const LINE_SNAPSHOT:string = "SS"; // ! O numero da linha deve ser sempre 0, isso garante a obtenção das dependencias em um unico nivel de linha
        const LINE_NUMBER:string = "0"; // ! O numero da linha deve ser sempre 0, isso garante a obtenção das dependencias em um unico nivel de linha

        var snapShot = this.tableDependency.filter( c=> c.key.split(".")[0] == frame && c.key.split(".")[2] == LINE_SNAPSHOT);
        if(snapShot.length > 0) return;
        snapShot = this.tableDependency.filter( c=> c.key.split(".")[0] == frame && c.key.split(".")[2] == LINE_NUMBER);
        snapShot.forEach(dependency => {
            let splitDependency = dependency.key.split("."); 
            let frame:string = splitDependency[0];
            let propert = splitDependency[1];
            let newKey = `${frame}.${propert}.${LINE_SNAPSHOT}`;
            let valueDependency = `${dependency.value.split(".")[0]}.` ;

            this.tableDependency.push({
                key:newKey, 
                value:valueDependency
            })
        })
    }   

    public deleteLine(propert:HTMLInputElement){
        let split = propert.getAttribute("name")!.split(".")
        let objeto:string = split[1]
        let linha:string = split[3]

        var dependecyes = this.tableDependency.filter( c=> c.key.split(".")[0] == objeto && c.key.split(".")[2] == linha);
        dependecyes.forEach(dependency => {
            let index  = this.tableDependency.indexOf(dependency);
            this.tableDependency.splice(index,1)
        })
        var resolveds = this.resolvedDependency.filter( c=> c.split(".")[0] == objeto && c.split(".")[2] == linha);
        resolveds.forEach(resolved => {
            let index  = this.resolvedDependency.indexOf(resolved);
            this.resolvedDependency.splice(index,1)
        })
    }
    
    private resolveDependecy(key:string,value:string){
        
        let split = value.split(".")
        let regular = /:[^\,]*/
        let dependecies = split[0].replace(regular,"") 
        let resolveds = split[1] 
        let dependeciesNotResolveds = 0

        dependecies.split(",").forEach(numberDependecy => {
            if(resolveds.search(numberDependecy+",") == -1) 
            dependeciesNotResolveds+=1
        })
        let exist = this.resolvedDependency.indexOf(key)
        if(exist == -1 && dependeciesNotResolveds > 0){
            this.resolvedDependency.push(key);
        }
        if(exist != -1 && dependeciesNotResolveds == 0){
            this.resolvedDependency.splice(exist,1);
        }
    }
    private consistRequerid(value:string|number|boolean):boolean{
        
        if( value == undefined ||
            value as number == 0){
                this.Message.messageDangerRequerid()
                this.ElementInFocu.focus()
                return false;
        }
        return true;
    }

    private consistMaxLen(todoist:string,value:string|number|boolean){
        let max = this.getDependecy(todoist,this.MAX_LENGHT)
        if ((value as string).length > Number(max)){
            this.Message.messageDangerMaxValue()
            this.ElementInFocu.focus()
            return  false;
        }
        return true;
    }
    private getDependecy(todoist:string, dependecy:string){
        var dependecies = todoist.split(",") // [1,2:40,3:20,4:1]
        let result = dependecies.find( c=> c.split(":")[0] == dependecy)! // 2:40 -> [0] = 2, [1] = 40
        
        return result.split(":")[1] // 40
    }

}