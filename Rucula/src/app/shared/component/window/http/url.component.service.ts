import { Injectable } from "@angular/core";
import { button } from "../entities/form/button";
import { GlobalWindowService } from "../global/global.service.component";
import { FactoryObjectService } from "../object/object.service.component";

@Injectable({
    providedIn:'root'
})
export class FactoryUrl{
    constructor(private globalWindow:GlobalWindowService, private object:FactoryObjectService){}
    
    createUrl(button:button){
        let url = `${this.globalWindow.environment.hostname}:${this.globalWindow.environment.port}${button.urlrelative}` 
        //TODO Implementar verificação se a  hostname está vazio e aplicar a url do href caso necessário
        if(button.params) url+=`?${this.prepareParams(button.params)}`        
        return url;
    }
    prepareParams(params:string){
        let reg = /=([A-z-0-9.]+)/gm       
        for(let math of params.matchAll(reg)){
            params = params.replace(math[1],(param) => {
                return this.object.getValuePropertTypeObject(param);
            })
        }
        return params;
    }
}