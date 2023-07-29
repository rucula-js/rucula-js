import { button } from "../entities/form/button";
import { getEnvironment } from "../global/GlobalConfig";
import * as  obj from '../object/ObjectManagment';

export function  createUrl(button:button){
    let environment = getEnvironment(); 
    let url = `${environment.hostname}:${environment.port}${button.urlrelative}` 
    //TODO Implementar verificação se a  hostname está vazio e aplicar a url do href caso necessário
    if(button.params) url+=`?${prepareParams(button.params)}`        
    return url;
}
function  prepareParams(params:string){
    let reg = /=([A-z-0-9.]+)/gm       
    let matchs = params.matchAll(reg);
    for(let math of matchs){
        params = params.replace(math[1],(param) => {
            return obj.getValuePropertTypeObject(param);
        })
    }
    // TODO Implementar preparo de url sem paramentros exemplo: CLIENTE/cliente.id -> CLIENTE/45064 
    return params;
}
