import { field } from "../entities/form/field";
import { fragmentField } from "../object/ObjectAliases";

'use strict';

export let tableDependency = () => {

    type dependency = {
        identityObject:string,
        isHibernate:boolean,
        fieldsNotResolved:string[]
    }

    let dependencyesNotResolved:dependency[] = []
    
    let REQUERID:string = '1' as const;
    let MAX_LENGHT:string = '2' as const;
    let MAX:string = '3' as const;
    let MIN:string = '4' as const;

    function moveImbernateToNotResolved(identityObject:string){

        let dependency = dependencyesNotResolved.find(c=> c.identityObject == identityObject)

        if(dependency){
            dependency.isHibernate = false
        } 
    }

    function moveNotResolvedToImbernate(identityObject:string){

        let dependency = dependencyesNotResolved.find(c=> c.identityObject == identityObject)
        if(dependency){
            dependency.isHibernate = true
        }        
    }

    function createExpectedDependency(field:field, fragmentField:fragmentField):string {   
    
        //! Important!! This function must be called in the fragmentField creation process

        let valueDependency = ''
        
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
    
        valueDependency = removeLastComa(valueDependency)
                
        if(valueDependency){

            let index = dependencyesNotResolved.findIndex(c=> c.identityObject == fragmentField.config.fragmentObjectIdentity)            
            if( index == -1){
                
                let objectDependency:dependency = {
                    isHibernate:false,
                    identityObject:fragmentField.config.fragmentObjectIdentity,
                    fieldsNotResolved:[field.identity]  
                }
                dependencyesNotResolved.push(objectDependency)
            }
            if( index != -1){
                
               let indexDependency = dependencyesNotResolved[index].fieldsNotResolved.findIndex(c => c == field.identity) 
                
               if(indexDependency == -1){
                   dependencyesNotResolved[index].fieldsNotResolved.push(field.identity)
               }
            }            
        }


        return valueDependency
    }    

    function toApplyOrRemoveDependency(fragment:fragmentField, value:string|number|boolean){

        let dependencyExpected = fragment.config.dependency

        let dependencyResolved = ''
    
        dependencyExpected
        .split(',')
        .forEach(expected => {
    
            let identification = expected.split(':')[0]
            
            if(identification == REQUERID){
                
                let result = consist.requerid(value)
                
                if(result){
                    dependencyResolved += `${REQUERID},`
                }
            }
    
            if(identification == MAX_LENGHT){
                
                let result = consist.maxLen(dependencyExpected,value);
            
                if(result){
                    dependencyResolved += `${MAX_LENGHT},`
                }            
            }

            if(identification == MAX){
                
                let result = consist.max(dependencyExpected,value as string);
            
                if(result){
                    dependencyResolved += `${MAX},`
                }            
            }
            
            if(identification == MIN){
                
                let result = consist.min(dependencyExpected,value as string);
            
                if(result){
                    dependencyResolved += `${MIN},`
                }            
            }
        })
                
        dependencyResolved = removeLastComa(dependencyResolved)

        let dependencyExpectedOnlyKeys = dependencyExpected.split(',').map(c => c.split(':')[0])
        
        let dependencyResolvedOnlyKeys = dependencyResolved.split(',').map(c => c.split(':')[0])
        
        let existDependecy = false

        for (let index = 0; index < dependencyExpectedOnlyKeys.length; index++) {
            
            let indexOf = dependencyResolvedOnlyKeys.indexOf(dependencyExpectedOnlyKeys[index])

            if(indexOf == -1){
                existDependecy = true
                break;
            } 
        }

        let dependencyObject = dependencyesNotResolved.find(objectDep => objectDep.identityObject == fragment.config.fragmentObjectIdentity)
        
        let dependency = dependencyObject?.fieldsNotResolved.find(dependency => dependency == fragment.key.identity)

        if(existDependecy == true && dependency ==  undefined){
            dependencyObject?.fieldsNotResolved.push(fragment.key.identity)
        }

        if(existDependecy == false && dependency !=  undefined){
            let index = dependencyObject?.fieldsNotResolved.indexOf(dependency) as number
            dependencyObject?.fieldsNotResolved.splice(index ,1)
        }      

        return existDependecy
    }

    function removeLastComa(value:string){
        return value.replace(/, *$/,'')
    }
    
    let consist = (() => {
        
        function getValueInDependency(dependencyExpected:string){
            return dependencyExpected.split(':')[1]
        }
        
        return {
            requerid: (value:string|number|boolean):boolean => {
       
               if( value == undefined || value as number == 0){
                   //todo implement event
                   return false;
               }
           
               return true;
           },
            
           maxLen:(dependencyExpected:string,value:string|number|boolean) => {
                      
               let maxLength = getValueInDependency(dependencyExpected)
               
               value = addValueDefault().typeString((value))
       
               if ((value as string).length > Number(maxLength)){
                   //todo implement event
                   return  false;
               }
               
               return true;
           },

           max:(dependencyExpected:string,value:string|number) => {
        
            let max = getValueInDependency(dependencyExpected)
            
            value = Number(addValueDefault().typeNumber((value)))
    
            if(Number.NaN == value){
                alert('value not is number')
                return false
            }
    
            if (value > Number(max)){
                //todo implement event
                return  false
            }
    
            return true
        },
    
        min:(dependencyExpected:string,value:string|number)=> {
        
            let max = getValueInDependency(dependencyExpected)
    
            value = Number(addValueDefault().typeNumber((value)))
    
    
            if(Number.NaN == value){
                alert('value not is number')
                return false
            }
    
            if (value < Number(max)){
                //todo implement event
                return  false;
            }
            
            return true
        }
        }

    })()

    function addValueDefault(){
        return {
            typeString: (value:any) => {

                if(value == undefined){
                    return '' 
                }

                return value
            },
            typeNumber: (value:any) => {
                if(value == undefined){
                    return 0 
                }

                return value
            }      
        }
    }
    
    return {
       
        removeExpectedDependency: (identity:string) => {
            
            let dependency = dependencyesNotResolved.find(c=> c.fieldsNotResolved.indexOf(identity) > -1)

            if(dependency){
                
                let index = dependency.fieldsNotResolved.indexOf(identity)

                if(index > -1){

                    dependency.fieldsNotResolved.splice(index,1)
                }   
            }
        },
        
        createExpectedDependency: (field:field, fragmentField:fragmentField) => {
            return createExpectedDependency(field,fragmentField)
        },

        toApplyOrRemoveDependency: (fragment: fragmentField, value:any) => {
            
            return toApplyOrRemoveDependency(fragment,value)
        },
        
        getDependenciesNotResolded:() =>{ 
            return dependencyesNotResolved
        },
        dependenciesCount:() => {
            return dependencyesNotResolved
            .filter(c=> c.fieldsNotResolved.length > 0).length
        },
        moveImbernateToNotResolved: (identityObject:string) => moveImbernateToNotResolved(identityObject),
        moveNotResolvedToImbernate: (identityObject:string) => moveNotResolvedToImbernate(identityObject)
    
        
    }
}
