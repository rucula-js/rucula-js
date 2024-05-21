import { button } from '../entities/form/button';
import { ElementBase } from './ElementBase';
import { ElementStrategy } from './ElementEstrategy';
import { createIcon } from './IconElement';

export class ElementButton extends ElementBase implements ElementStrategy{

    createElement(button:button){     
        
        if(button.target == null || button.target == ""){
            throw new Error("target is requerid!")
        }
        this.element = document.createElement('button');
        this.element.classList.add("r-b-i");
        this.element.setAttribute('type','button');
        
        let icon = createIcon(button)
        let span = document.createElement('span')
        span.textContent = button.text??"";
        
        span.style.marginLeft = "5px";
        
        this.element.appendChild(icon);
        this.element.appendChild(span);

        this.addColor(button.color);
        this.addDataIdAttribute(button);
        return this.element;
    }
}
