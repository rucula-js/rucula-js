import { button } from "../entities/form/button";
import { window } from "../entities/form/window";
import { getEnvironment } from "../global/GlobalConfig";
import * as  obj from '../object/ObjectManagment';
import { getWindow } from "../window/Window";

export function  createUrl(button:button){
    let environment = getEnvironment(); 
    let window = getWindow() as window
    let pathController = window.pathController
    let pathButton = button.urlrelative;
    let path = pathController;
    if(pathButton != undefined && pathButton != "") path = pathButton
    let url = `${environment.hostname}:${environment.port}${path}` 
    
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
