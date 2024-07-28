import { button } from '../entities/form/button';
import { fieldDOM } from '../elements/form/ElementsInput';
import { windowBaseDOM } from '../elements/window-base/WindowBase';
import { managmentObject } from '../object/ObjectManagment';
import { constIdBaseWindow } from '../const';
import { exportTableDependency, exportUrlManagment } from '../exports';

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

        let eventButton = new CustomEvent(`${button.target}`,object)
        let eventButtonDependency = new CustomEvent(`${button.target}.dependency`,dependency)
        
        element?.addEventListener("click", () => {
                            
            let dependencyCount = exportTableDependency.dependenciesCount()
            
            if( dependencyCount > 0){
                fieldDOM.dependency.focusFieldsWithDependency()
                rucula.dispatchEvent(eventButtonDependency)
                return;
            }
            
            object.detail.url = exportUrlManagment.createURL(pathController, button);
            
            let option = button?.body
            
            if(option == undefined){
                rucula.dispatchEvent(eventButton)
                return
            }
            
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

    const openClose = document.getElementById("r-a-menu-vertical") as HTMLElement
    const listRight = document.querySelector(".r-vertical-actions") as HTMLElement
    
    const openClosemobile = document.getElementById(constIdBaseWindow.BUTTONS_MENU_VERTICAL_MOBILE)

    openClose?.addEventListener("click",() => {
        listRight?.classList.toggle("r-display-none");
    })

    openClosemobile?.addEventListener("click",() => {
        listRight?.classList.toggle("r-display-none");
    })
}
