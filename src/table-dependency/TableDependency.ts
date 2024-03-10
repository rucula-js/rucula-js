import { field } from "../entities/form/field";
import { fragmentField } from "../object/ObjectAliases";

'use strict';

export let tableDependency = (() => {

    let dependencyesNotResolved:string[] = []
    
    let REQUERID:string = "1" as const;
    let MAX_LENGHT:string = "2" as const;
    let MAX:string = "3" as const;
    let MIN:string = "4" as const;

    function expectedDependency(field:field):string {   
    
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
    
        return valueDependency;
    }

    function toApplyOrRemoveDependency(fragment:fragmentField, value:string|number|boolean){
       
        let dependencyExpected = fragment.config.dependency

        let dependencyResolved = ""
    
        dependencyExpected
        .split(",")
        .forEach(expected => {
    
            let identification = expected.split(":")[0]
            
            if(identification == REQUERID){
                
                let result = consistRequerid(value)
                
                if(result){
                    dependencyResolved += `${REQUERID},`
                }
            }
    
            if(identification == MAX_LENGHT){
                
                let result = consistMaxLen(dependencyExpected,value);
            
                if(result){
                    dependencyResolved += `${MAX_LENGHT},`
                }            
            }

            //todo implements consistMax
            //todo implements consistMin
        })
        

        let dependencyExpectedOnlyKeys = 
            dependencyExpected
            .split(",")
            .map(c => c.split(":")[0])


        let dependencyResolvedOnlyKeys = 
            dependencyResolved
            .split(",")
            .map(c => c.split(":")[0])


        let existDependecy = false

        if(dependencyExpectedOnlyKeys.length != dependencyResolvedOnlyKeys.length) {
            
            existDependecy = true
            
        } 

        for (let index = 0; index < dependencyExpectedOnlyKeys.length; index++) {
            
            let indexOf = dependencyResolvedOnlyKeys.indexOf(dependencyExpectedOnlyKeys[index])

            if(indexOf == -1){
                existDependecy = true
                break;
            } 
        }

        if(existDependecy  && dependencyesNotResolved.indexOf(fragment.key.identity)== -1){
            
            dependencyesNotResolved.push(fragment.key.identity)
            return existDependecy
        }

        let index = dependencyesNotResolved.indexOf(fragment.key.identity)

        dependencyesNotResolved.splice(index,1)

        return existDependecy
    }

    function consistRequerid(value:string|number|boolean):boolean{
    
        if( value == undefined || value as number == 0){
            //todo Implementar Messagem
            return false;
        }
    
        return true;
    }
    
    function consistMaxLen(dependencyExpected:string,value:string|number|boolean){
        
        dependencyExpected = dependencyExpected.substring(0,dependencyExpected.length-1) //? Remove lasta coma

        let max = dependencyExpected.split(':')[1]
        
        if ((value as string).length > Number(max)){
            //todo implementar evento
            return  false;
        }
        
        return true;
    }

    function consistMax(dependencyExpected:string,value:string|number){
        //todo desenv
    }
    
    
    function consistMin(dependencyExpected:string,value:string|number){
        //todo desenv
    }
    

    
    return {
        
        createOption:(field:field) => {
            
        },
        create:(fields:field[]) => {
        
        },
        deleteLine: (identity:string, line:string) => {

        },

        set:(identity:string, value:any) => {  

        },
      
        expectedDependency: (field:field) => {
            return expectedDependency(field)
        },
        toApplyOrRemoveDependency: (fragment: fragmentField, value:any) => {
            return toApplyOrRemoveDependency(fragment,value)
        },

        getDependencies: dependencyesNotResolved,
        dependenciesCount: dependencyesNotResolved.length,
        
    }
})()
