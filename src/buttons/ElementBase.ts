import { button } from "../entities/form/button";

export class ElementBase{
    element!:HTMLButtonElement|HTMLAnchorElement; 

    addDataIdAttribute(button:button){
        this.element.setAttribute("data-id",`${button.type}-${button.method}-${button.id}`);
    }
    addColor(color?:string){
        if (color)this.element!.style.backgroundColor = color;
    }
}