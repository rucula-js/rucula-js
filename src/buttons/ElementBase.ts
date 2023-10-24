import { button } from "../entities/form/button";
import { getEndPoint } from "../window/Window";

export class ElementBase{
    element!:HTMLButtonElement|HTMLAnchorElement; 

    addDataIdAttribute(button:button){
        let event = getEndPoint(button.endPoint)
        this.element.setAttribute("data-id",`${button.type}-${event.method}-${button.id}`);
    }
    addColor(color?:string){
        if (color)this.element!.style.backgroundColor = color;
    }
}