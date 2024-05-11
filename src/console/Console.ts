import {tableDependency}  from '../table-dependency/TableDependency';
import { managmentObject } from '../object/ObjectManagment';
    
let rucula  = {
    log: (()=>{
 
        return {
            dependencies: function(){
            
                return  tableDependency.getDependenciesNotResolded();
            },
            object: function(){
                return managmentObject.object.object.objectFull()
            }  
        }
    })()
}

export function logs(){
    (window as any).rucula = rucula
}