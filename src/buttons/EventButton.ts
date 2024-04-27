import { button } from '../entities/form/button';
import { tableDependency } from '../table-dependency/TableDependency';
import { fieldDOM } from '../elements/form/ElementsInput';
import { windowBaseDOM } from '../elements/window-base/WindowBase';
import { urlManagment } from '../URL/urlManagment';
import { managmentObject } from '../object/ObjectManagment';

export function eventButton(pathController:string, buttons:button[]){
    
    let rucula = windowBaseDOM.getElementRoot()

    buttons?.filter(b => b.type === "button")
    .forEach((button) => {
        

        let element:HTMLElement = document?.getElementById(button.target) as HTMLElement
        
        let object =  {
            detail:{
                url:'',
                body:{}
            }
        }

        let dependency = {
            detail:{}
        }

        let eventButton = new CustomEvent(`${button.target}.click`,object)
        let eventButtonDependency = new CustomEvent(`${button.target}.dependency`,dependency)
        
        element?.addEventListener("click", () => {
                            
            let dependencyCount = tableDependency.dependenciesCount()
            
            if( dependencyCount > 0){
                fieldDOM.dependency.focusFieldsWithDependency()
                rucula.dispatchEvent(eventButtonDependency)
                return;
            }
            
            object.detail.url = urlManagment.createURL(pathController, button);
            
            let option = button.body
            
            if(option  == ''){
                object.detail.body = managmentObject.object.object.objectSeparate()
            }

            if(option == '.'){
                object.detail.body = managmentObject.object.object.objectFull()
            }

            if(['','.',undefined].find(c=> c != option) == undefined){
                object.detail.body = managmentObject.object.object.objectUnique(option)
            }

            rucula.dispatchEvent(eventButton)
            
         })
    });
}

export function openCloseRightListButtons(){

    const openClose = document.getElementById("r-a-menu-vertical")
    const listRight = document.getElementById("r-a-menu-vertical-list")
    
    openClose?.addEventListener("click",() => {

        listRight?.classList.toggle("r-display-none");
    
    })
}
