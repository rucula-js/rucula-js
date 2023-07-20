import { button } from '../entities/form/button';

export class IconElement{
    createIcon(button:button):HTMLElement{
        
        let  icon = document.createElement('i')
        if(button.icon === undefined || button.icon.trim() === "") return icon;
        button.icon?.split(" ").forEach(item => icon.classList.add(item))

        return icon;
    }
}