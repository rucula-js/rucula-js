import { fieldValidService } from './fieldValid'

import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class eventFieldService {

    constructor(private fieldValid:fieldValidService){}
    
    

    SetEvent(element:HTMLElement){
        element.addEventListener('focusout',(event)=>{
            const elemet = (event.target as HTMLInputElement) 
            try{
                switch (elemet.getAttribute('type')) {
                    case "text":
                        this.fieldValid.checkMaxLen(
                            elemet.getAttribute('data-propertdto')!,
                            elemet.value,
                            Number(elemet.getAttribute('data-max'))!
                        )
                        this.fieldValid.checkMinLen(
                            elemet.getAttribute('data-propertdto')!,
                            elemet.value,
                            Number(elemet.getAttribute('data-min'))!
                        )
                        this.fieldValid.checkIsRequerid(
                            elemet.getAttribute('data-propertdto')!,
                            elemet.value
                        )
                        break;
                }
                document.getElementById("box-message")!.textContent = ""
                element.style.borderColor ="#c7c7c7"
            }
            catch(message:any){
                element.focus()
                element.style.borderColor ="red"
                document.getElementById("box-message")!.textContent = message["message"]
            }
        })
    }
}