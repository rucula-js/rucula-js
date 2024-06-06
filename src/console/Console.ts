import { managmentObject } from '../object/ObjectManagment';
import { exportTableDependency } from '../exports';
    
let rucula  = {
    log: (()=>{
 
        return {
            dependencies: function(){
            
                return  exportTableDependency.getDependenciesNotResolded();
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