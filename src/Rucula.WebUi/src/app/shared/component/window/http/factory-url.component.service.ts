import { Injectable } from "@angular/core";
import { button } from "../entities/form/button";
import { ConfigurationBaseGlobalService } from "../configuration-base-global/configuration-base-global.component.service";
@Injectable({
    providedIn:'root'
})
export class FactoryUrl{
    
    constructor(private global:ConfigurationBaseGlobalService){}
    
    createUrl(button:button):string{
        let url:string = this.global.urlBase;
        if(button.urlrelative == "")url += this.global.pathController
        return url;
    }
}