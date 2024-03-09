import { field } from "../entities/form/field";

'use strict';

export let tableDependency = (() => {

    let _tableDependency: {key:string, value:string}[] = []
    let _resolvedDependency:Array<string> = new Array();
    
    let REQUERID:string = "1" as const;
    let MAX_LENGHT:string = "2" as const;
    let MAX:string = "3" as const;
    let MIN:string = "4" as const;
    let DEPENDENCIES_AND_TODOIST_TAB:string = "." as const;


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

    function  resolveDependecy(key:string,value:string){
    
        let split = value.split(".")
        let regular = /:[^\,]*/
        let dependecies = split[0].replace(regular,"") 
        let resolveds = split[1] 
        let dependeciesNotResolveds = 0
    
        dependecies.split(",").forEach(numberDependecy => {
            
            if(resolveds.search(numberDependecy+",") == -1){
                dependeciesNotResolveds+=1
            }
        })
    
        let exist = _resolvedDependency.indexOf(key)
    
        if(value == "." && exist != -1){ //? Indica que não existe nenhuma consistência a ser feita, logo, a possivel depêndencia deve ser removida.
            _resolvedDependency.splice(exist,1); 
        }
        
        if(exist == -1 && dependeciesNotResolveds > 0){
            _resolvedDependency.push(key);
        }
    
        if(exist != -1 && dependeciesNotResolveds == 0){
            _resolvedDependency.splice(exist,1);
        }
    }
    
    function consistRequerid(value:string|number|boolean):boolean{
    
        if( value == undefined || value as number == 0){
            //todo Implementar Messagem
            return false;
        }
    
        return true;
    }
    
    function consistMaxLen(todoist:string,value:string|number|boolean){
        
        let max = getDependecy(todoist,MAX_LENGHT)
        
        if ((value as string).length > Number(max)){
            //todo implementar evento
            return  false;
        }
        
        return true;
    }
    
    
    function getDependecy(todoist:string, dependecy:string){
        
        var dependecies = todoist.split(",")
        let result = dependecies.find( c=> c.split(":")[0] == dependecy)!
        return result.split(":")[1]
    }

    
    return {
        
        createOption:(field:field) => {
            
            let value = "" 

            value = valueDependency(field);
            
            let indexDependency  = _tableDependency.findIndex(c => c.key == field.identity && c.value == value)
            
            if(indexDependency == -1){
                _tableDependency.push({key:field.identity, value:value})
                resolveDependecy(field.identity,value)
            }
        },
        removeOption:(identity:string) => {
            
            var dependency = _tableDependency.find(c=> c.key == identity)!
            
            let indexDependency = _tableDependency.indexOf(dependency)
            
            _tableDependency.splice(indexDependency,1)
            
            
            var resolveds = _resolvedDependency.find(c=> c == identity)!
            
            let indexResolvedDependency = _resolvedDependency.indexOf(resolveds)
            
            _resolvedDependency.splice(indexResolvedDependency,1)         
               
            //Todo Chamar essa função no processo de exclusão de linha, onde é excluido a linha do objeto que por sua vez é excluido suas dependencias
        },
        create:(fields:field[]) => {
        
            fields?.forEach(field => {
    
                let value = "" 

                value = valueDependency(field);
                
                let dependecy = {key:field.identity, value:value};
    
                let indexDependency  = _tableDependency.findIndex(c => c.key == dependecy.key && c.value == dependecy.value)
                
                if(indexDependency == -1){
                    _tableDependency.push(dependecy)
                    resolveDependecy(field.identity,value)
                }
            })  
        },
        deleteLine: (identity:string, line:string) => {

            // var dependecyes = _tableDependency.filter( c=> c.key.split(".")[0] == line.objectDto && c.key.split(".")[2] == line.line);
            
            // dependecyes.forEach(dependency => {
            //     let index  = _tableDependency.indexOf(dependency);
            //     _tableDependency.splice(index,1)
            // })
        
            // var resolveds = _resolvedDependency.filter( c=> c.split(".")[0] == line.objectDto && c.split(".")[2] == line.line);
            
            // resolveds.forEach(resolved => {
            //     let index  = _resolvedDependency.indexOf(resolved);
            //     _resolvedDependency.splice(index,1)
            // })
        },

        set:(identity:string, value:any) => {  

            var lineDependency = _tableDependency.find(c => c.key == identity)!;

            checkPropertDependency(lineDependency, value)

            resolveDependecy(lineDependency.key,lineDependency.value) 
                        
        },
        dependenciesCount: () => {
            return _resolvedDependency.length
        },
        getDependencies:():string[] =>  {
            return _resolvedDependency
        }
    }
})()
