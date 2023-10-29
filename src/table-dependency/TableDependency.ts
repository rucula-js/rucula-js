import { field } from "../entities/form/field";
import { frame } from "../entities/form/frame";
import { RepresentationField } from "../entities/form/representationField";

'use strict';

let _tableDependency: {key:string, value:string}[] = []
let _resolvedDependency:Array<string> = new Array();
   
let REQUERID:string = "1" as const;
let MAX_LENGHT:string = "2" as const;
let MAX:string = "3" as const;
let MIN:string = "4" as const;
let DEPENDENCIES_AND_TODOIST_TAB:string = "." as const;

function  createTableDependency(frames:Array<frame>){
    
    frames?.forEach(frame => 

        frame.fields?.forEach(field => {

            let key = "" 
            let value = "" 

            if(frame.type == "block"){
                key = keyDependency(frame.objectDto,field.propertDto)
            }

            if(frame.type == "line"){
                key = keyDependency(frame.objectDto,field.propertDto,"0")
            } 

            value = valueDependency(field);
            _tableDependency.push({key:key, value:value})
            resolveDependecy(key,value)
        })
    )
}

function keyDependency(frame:string,propert:string, line:string = ""):string {                
    return `${frame}.${propert}.${line}`
}

function valueDependency(field:field):string {   
    
    let valueDependency = ""
    
    checkIsRequerid();
    checkMaxLength();
    checkMax();
    checkMin();
    
    function checkIsRequerid(){
        if(field.requerid)
            valueDependency += `${REQUERID},`
    }

    function checkMaxLength(){
        
        if(field.maxLength as number > 0)
            valueDependency += `${MAX_LENGHT}:${field.maxLength},`
    }

    function checkMax(){

        if(field.max as number > 0) 
            valueDependency += `${MAX}:${field.max},`
    }

    function checkMin(){
        
        if(field.min as number > 0)
            valueDependency += `${MIN}:${field.min},`
    }

    valueDependency += DEPENDENCIES_AND_TODOIST_TAB;  
    return valueDependency;
}

function  setDependency(rep:RepresentationField){
    
    var key = ""
    
    if(rep.lineNumber == undefined){
        key = keyDependency(rep.objectDto,rep.propertDto,"");
    }
    else{
        key = keyDependency(rep.objectDto,rep.propertDto,String(rep.lineNumber));
    }
    
    var lineDependency = _tableDependency.find(c => c.key == key)!;
    checkPropertDependency(lineDependency, rep.value)
    resolveDependecy(lineDependency.key,lineDependency.value)
}

function checkPropertDependency(dependency:{key:string, value:string}, value:string|number|boolean){
    
    let dependecies = dependency.value.split(".")[0]
    let todoist = dependency.value.split(".")[0]
    let resolved = dependency.value.split(".")[1]

    dependecies.split(",").forEach(d => {

        let option = d.split(":")[0]
        
        if(option == REQUERID){
            resolved = SetOrRemoveResolved(consistRequerid(value),REQUERID,resolved)
        }

        if(option == MAX_LENGHT){
            resolved = SetOrRemoveResolved(consistMaxLen(todoist,value),MAX_LENGHT,resolved)
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

function createNewLineDependecy(keyLine:{type:string,objectDto:string,line:number}){
        
    checkCreateSpanShot(keyLine.objectDto);
    let frame:string = keyLine.objectDto
    const LINE_SNAPSHOT:string = "SS"; 
    var dependecyes = _tableDependency.filter( c=> c.key.split(".")[0] == frame && c.key.split(".")[2] == LINE_SNAPSHOT);

    dependecyes.forEach(dependency => {
        
        let splitDependency = dependency.key.split("."); 
        let frame:string = splitDependency[0];
        let propert = splitDependency[1];
        let newKey = `${frame}.${propert}.${keyLine.line}`;
        let valueDependency = `${dependency.value.split(".")[0]}.` ;

        _tableDependency.push({
            key:newKey, 
            value:valueDependency
        })
        
        resolveDependecy(newKey,valueDependency)
    })
}

function checkCreateSpanShot(objectDto:string){
    
    let frame:string = objectDto

    const LINE_SNAPSHOT:string = "SS"; 
    const LINE_NUMBER:string = "0";

    var snapShot = _tableDependency.filter( c=> c.key.split(".")[0] == frame && c.key.split(".")[2] == LINE_SNAPSHOT);
    
    if(snapShot.length > 0){
        return;
    }
    
    snapShot = _tableDependency.filter( c=> c.key.split(".")[0] == frame && c.key.split(".")[2] == LINE_NUMBER);
    
    snapShot.forEach(dependency => {
        
        let splitDependency = dependency.key.split("."); 
        let frame:string = splitDependency[0];
        let propert = splitDependency[1];
        let newKey = `${frame}.${propert}.${LINE_SNAPSHOT}`;
        let valueDependency = `${dependency.value.split(".")[0]}.` ;

        _tableDependency.push({
            key:newKey, 
            value:valueDependency
        })
    })
}   

function deleteLine(line:{objectDto:string, line:string}){

    var dependecyes = _tableDependency.filter( c=> c.key.split(".")[0] == line.objectDto && c.key.split(".")[2] == line.line);
    
    dependecyes.forEach(dependency => {
        let index  = _tableDependency.indexOf(dependency);
        _tableDependency.splice(index,1)
    })

    var resolveds = _resolvedDependency.filter( c=> c.split(".")[0] == line.objectDto && c.split(".")[2] == line.line);
    
    resolveds.forEach(resolved => {
        let index  = _resolvedDependency.indexOf(resolved);
        _resolvedDependency.splice(index,1)
    })
}
    
function  resolveDependecy(key:string,value:string){
    
    let split = value.split(".")
    let regular = /:[^\,]*/
    let dependecies = split[0].replace(regular,"") 
    let resolveds = split[1] 
    let dependeciesNotResolveds = 0

    dependecies.split(",").forEach(numberDependecy => {
        
        if(resolveds.search(numberDependecy+",") == -1) 
            dependeciesNotResolveds+=1
    })

    let exist = _resolvedDependency.indexOf(key)
    
    if(exist == -1 && dependeciesNotResolveds > 0){
        _resolvedDependency.push(key);
    }

    if(exist != -1 && dependeciesNotResolveds == 0){
        _resolvedDependency.splice(exist,1);
    }
}

function consistRequerid(value:string|number|boolean):boolean{
    
    if( value == undefined ||
        value as number == 0){
            //todo Implementar Messagem
            return false;
    }
    return true;
}

function consistMaxLen(todoist:string,value:string|number|boolean){
    
    let max = getDependecy(todoist,MAX_LENGHT)
    if ((value as string).length > Number(max)){
        //todo Implementar Messagem
        return  false;
    }
    return true;
}

function getDependecy(todoist:string, dependecy:string){
    
    var dependecies = todoist.split(",")
    let result = dependecies.find( c=> c.split(":")[0] == dependecy)!
    return result.split(":")[1]
}

function getDependencies():string[] {
    return _resolvedDependency
}

function dependenciesCount(){
    return _resolvedDependency.length
}

export {
    createTableDependency,
    setDependency,
    createNewLineDependecy,
    deleteLine,
    getDependencies,
    dependenciesCount
}