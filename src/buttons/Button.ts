import { button } from '../entities/form/button';
import { ElementStrategy } from './ElementEstrategy';
import { ElementButton } from './ElementButton';
import { ElementLink } from './ElementLink';
import { constIdBaseWindow, constTargetButtonCrudDefault } from '../const';
import { getConfigurationGlobal, setEnviroment, setLocalization } from '../global/GlobalConfig';

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
    
        prepareButtonsGlobalOptions();
}

function prepareButtonsGlobalOptions(){
    
    let globalConf = getConfigurationGlobal()

    let globalization = document.getElementById(constIdBaseWindow.GLOBALIZATION)
    let olliGlobalization = document.getElementById(constIdBaseWindow.OLLI_GLOBALIZATION)

    globalization?.addEventListener("click", () => {
        olliGlobalization?.classList.toggle("r-display-none")
    })

    globalConf.localizations.forEach(loc => {
        
        const li = document.createElement("li")
        
        li.textContent = loc.language;
        
        olliGlobalization?.appendChild(li)
        
        li.addEventListener("click",() => {
            setLocalization(loc.locales)
        })
    })

    let enviroment = document.getElementById(constIdBaseWindow.ENVIROMENT)
    let olliEnviroment = document.getElementById(constIdBaseWindow.OLLI_ENVIROMENT)

    enviroment?.addEventListener("click", () => {
        olliEnviroment?.classList.toggle("r-display-none")
    })

    globalConf.environments.forEach(enviroment => {
        
        const li = document.createElement("li")
        
        li.textContent = enviroment.env;
        
        olliEnviroment?.appendChild(li)
        
        li.addEventListener("click",() => {
            setEnviroment(enviroment.env)
        })
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