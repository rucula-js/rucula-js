import { button } from '../entities/form/button';
import { ElementStrategy } from './ElementEstrategy';
import { ElementButton } from './ElementButton';
import { ElementLink } from './ElementLink';
import { constTargetButtonCrudDefault } from '../const';

let elementStrategy!:ElementStrategy;

function prepareButtons(button:button[]){
    const ListRightButtons = document.getElementById("r-a-menu-vertical-list")
    button
        .filter(c=> buttonIsNotDefault(c.target))
        .forEach(b => {
            
            const li = document.createElement("li")
            li.appendChild(createButtonOrLink(b))

            ListRightButtons?.appendChild(li)  
        })
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

function buttonIsNotDefault(endPoint:string){
    return endPoint != constTargetButtonCrudDefault.SAVE && 
    endPoint != constTargetButtonCrudDefault.ALTER && 
    endPoint != constTargetButtonCrudDefault.DELETE
}

export{prepareButtons, buttonIsNotDefault}