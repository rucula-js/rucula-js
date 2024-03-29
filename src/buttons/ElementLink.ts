import { button } from '../entities/form/button';
import { ElementBase } from './ElementBase';
import { ElementStrategy } from './ElementEstrategy';
import { createIcon } from './IconElement';

export class ElementLink extends ElementBase implements ElementStrategy{
    
    createElement(button:button){
        this.element = document.createElement('a')
        this.element.textContent = button.text+""
        this.element.href = `${button.link}`
        this.element!.classList.add("btn-link")
        this.element!.setAttribute('target',"_blank")
        this.element.appendChild(createIcon(button));    
        return this.element;
    }
}
