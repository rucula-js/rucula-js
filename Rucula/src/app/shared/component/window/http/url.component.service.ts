import { Injectable } from "@angular/core";
import { button } from "../entities/form/button";
import { GlobalWindowService } from "../global/global.service.component";
@Injectable({
    providedIn:'root'
})
export class FactoryUrl{
    constructor(private globalWindow:GlobalWindowService){}
    createUrl(button:button){
        let url = `${this.globalWindow.environment.hostname}:${this.globalWindow.environment.port}${button.urlrelative}` 
        //TODO Implementar verificação se a  hostname está vazio e aplicar a url do href caso necessário
        return url;
    }
}