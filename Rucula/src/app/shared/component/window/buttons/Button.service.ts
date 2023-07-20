import { Injectable } from '@angular/core';
import { button } from '../entities/form/button';
import { ElementStrategy } from './ElementEstrategy';
import { ElementButton } from './ElementButton';
import { ElementLink } from './ElementLink';

@Injectable({
    providedIn: 'root',
})
export class ButtonService {
   
    private elementStrategy!:ElementStrategy;

    public prepareButtons(button:button[]){
      const ButtonsBox = document.getElementById("box-actions")
      button.forEach(b => {
        ButtonsBox?.appendChild(this.createButtonOrLink(b))  
      })
      ButtonsBox?.appendChild(this.createButtonOrLink({id:"5454",method:"reset",link:"",icon:"bi bi-x-lg",text:"",type:"button",color:"",target:""}))
    }
    private createButtonOrLink (button:button):HTMLButtonElement|HTMLAnchorElement{
      if(button.type != "button" && button.type != "link"){
        throw new Error("tipo do botão deve ser button ou link");
      }
      if(button.type == "button"){
        this.elementStrategy = new  ElementButton();
      }
      if(button.type == "link"){
        this.elementStrategy = new ElementLink();
      }
      return this.elementStrategy.createElement(button);
    } 
}