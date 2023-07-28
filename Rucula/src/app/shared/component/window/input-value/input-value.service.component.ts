import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class InputValueService{
    
    private setValueInForm(obj:any, objectDto:string=""){
        Object.keys(obj).forEach(key => {
        if (typeof obj[key] == "string" || typeof obj[key] == "number"){  
            let atribute = "";
            objectDto == "" ? atribute = `[set=".${key}"]` : atribute = `[set="${objectDto}.${key}"]`;
            (document.querySelector(atribute) as HTMLInputElement).value = obj[key] 
        }
        if(typeof obj[key] == "object"){
            this.setValueInForm(obj[key],key);
        }
    });
    (document.getElementById("create-new") as HTMLButtonElement).click();
  }
}