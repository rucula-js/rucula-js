import { endPoint } from "../entities/form/endPoint";
import { window } from "../entities/form/window";
import { getEnvironment } from "../global/GlobalConfig";
import * as  obj from '../object/ObjectManagment';
import { getWindow } from "../window/Window";

export function  createUrl(endPoint:endPoint, paramsManual:string=""){
    
    let PathEndPoint = endPoint.urlrelative;
    let path = getPathControllerDefault();

    if(PathEndPoint != undefined && PathEndPoint != "") {
        path = PathEndPoint // Path do precedencia sob o path default da janela
    }
    
    let url = `${creteDomain()}${path}` 
    
    //! TODO Implementar verificação se a  hostname está vazio e aplicar a url do href caso necessário. Sem host, implementa loopback
    if(endPoint.params) {
        url+=`${prepareParams(endPoint.params)}` 
    }
    url+=paramsManual
    return url;
}

function creteDomain():string{
    let environment = getEnvironment(); 
    const url = `${environment.hostname}:${environment.port}`
    return url
}

function getPathControllerDefault(){
    let window = getWindow() as window
    return window.pathController
}

function  prepareParams(params:string){

    let reg = /{{([A-z]+.[A-z]+)}}/gm       
    let matchs = params.matchAll(reg);

    for(let math of matchs){
        params = params.replace(math[0],(param) => {
            return obj.getValuePropertTypeObject(param.replace("{{","").replace("}}",""));
        })
    }
    return params;
}



