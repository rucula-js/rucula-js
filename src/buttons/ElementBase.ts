import { button } from "../entities/form/button";
import { getEvent } from "../window/Window";

export class ElementBase{
    element!:HTMLButtonElement|HTMLAnchorElement; 

    addDataIdAttribute(button:button){
        let event = getEvent(button.event)
        this.element.setAttribute("data-id",`${button.type}-${event.method}-${button.id}`);
    }
    addColor(color?:string){
        if (color)this.element!.style.backgroundColor = color;
    }
}