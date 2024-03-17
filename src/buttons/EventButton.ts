import { button } from '../entities/form/button';
import { buttonIsNotDefault } from './Button';
import { tableDependency } from '../table-dependency/TableDependency';
import { fieldDOM } from '../elements/form/ElementsInput';
import { httpManagment } from '../httpManagment/httpManagment';

export function eventButton(buttons:button[]){
    
    buttons
    ?.filter(b => b.type === "button")
    .forEach((button) => {
        
        let element:HTMLElement
        
        if(buttonIsNotDefault(button.target) == false){
            element = document?.getElementById(button.target) as HTMLElement
            setEventClick(element)
        }

        if(buttonIsNotDefault(button.target)){
            element = document.getElementById(button.target)!
            setEventClick(element)
        }

        function setEventClick(element:HTMLElement){
            
            element?.addEventListener("click", () => {

                let dependencyCount = tableDependency.dependenciesCount()
                
                if( dependencyCount > 0){
                    
                    let result = confirm(`existem ${dependencyCount} dependencias não resolvidas, deseja visualizar?`);
                    
                    if(result){
                        fieldDOM.focusFieldsWithDependency()
                    }

                    return;
                }

                httpManagment.request(button.endPoint)
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
