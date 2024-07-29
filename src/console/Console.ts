import { exportManagmentObject, exportTableDependency } from '../exports';
    
let rucula  = {
    log: (()=>{
 
        return {
            dependencies: function(){
            
                return  exportTableDependency.getDependenciesNotResolded();
            },
            object: function(){
                return exportManagmentObject.object.object.objectFull()
            }  
        }
    })()
}

export function logs(){
    (window as any).rucula = rucula
}