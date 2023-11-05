import { button } from '../entities/form/button';
import { ElementStrategy } from './ElementEstrategy';
import { ElementButton } from './ElementButton';
import { ElementLink } from './ElementLink';

let elementStrategy!:ElementStrategy;

function prepareButtons(button:button[]){
    const ButtonsBox = document.getElementById("r-a-many")
    button
        .filter(c=> isNotTarget(c.target))
        .forEach(b => {
            ButtonsBox?.appendChild(createButtonOrLink(b))  
        })

    function isNotTarget(target:string){
        return target != "r-a-save" && target != "r-a-alter" && target != "r-a-delete"
    }
}
function createButtonOrLink (button:button):HTMLButtonElement|HTMLAnchorElement{
    if(button.type != "button" && button.type != "link"){
        throw new Error("tipo do botão deve ser button ou link");
    }
    if(button.type == "button"){
        elementStrategy = new  ElementButton();
    }
    if(button.type == "link"){
        elementStrategy = new ElementLink();
    }
    return elementStrategy.createElement(button);
} 

export{prepareButtons}