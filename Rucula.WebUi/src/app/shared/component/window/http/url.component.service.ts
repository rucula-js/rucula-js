import { Injectable } from "@angular/core";
import { button } from "../entities/form/button";
import { ConfigurationBaseGlobalService } from "../configuration-base-global/configuration-base-global.component.service";
import { GlobalWindowService } from "../global/global.service.component";
@Injectable({
    providedIn:'root'
})
export class FactoryUrl{
    
    constructor(private globalBase:ConfigurationBaseGlobalService, private global:GlobalWindowService){}
    
    createUrl(button:button){
        let url = this.global.url;
        return"";
    }
}