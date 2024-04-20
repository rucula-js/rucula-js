import { button } from '../entities/form/button';
import { tableDependency } from '../table-dependency/TableDependency';
import { fieldDOM } from '../elements/form/ElementsInput';
import { buttonsDOM } from './Button';
import { windowBaseDOM } from '../elements/window-base/WindowBase';

export function eventButton(buttons:button[]){
    
    let rucula = windowBaseDOM.getElementRoot()

    buttons
    ?.filter(b => b.type === "button")
    .forEach((button) => {
        
        let eventButton = new CustomEvent(`${button.target}.click`,{})

        let element:HTMLElement
        
        if(buttonsDOM.buttonIsNotDefault(button.target) == false){
            element = document?.getElementById(button.target) as HTMLElement
            setEventClick(element)
        }

        if(buttonsDOM.buttonIsNotDefault(button.target)){
            element = document.getElementById(button.target)!
            setEventClick(element)
        }

        function setEventClick(element:HTMLElement){
            
            element?.addEventListener("click", () => {
                
                rucula.dispatchEvent(eventButton)

                let dependencyCount = tableDependency.dependenciesCount()
                
                if( dependencyCount > 0){
                    fieldDOM.dependency.focusFieldsWithDependency()
                    return;
                }
             })
        }

    });
}

export function openCloseRightListButtons(){

    const openClose = document.getElementById("r-a-menu-vertical")
    const listRight = document.getElementById("r-a-menu-vertical-list")
    
    openClose?.addEventListener("click",() => {

        listRight?.classList.toggle("r-display-none");
    
    })
}
