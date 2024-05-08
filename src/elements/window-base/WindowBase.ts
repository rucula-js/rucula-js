import { consolePanelManagment } from "../../console/Console";
import { constIdBaseWindow } from "../../const";

export let windowBaseDOM = (() => {

    let elementRoot:HTMLElement
    function createWindowBase(id:string){

        const ruculaWindow = document.createElement("div");
        ruculaWindow.classList.add("r-w");
    
        const actions = document.createElement("div");
        actions.innerHTML = componentActions();    
        ruculaWindow.appendChild(actions)
    
        const contentForm = document.createElement("div");

        contentForm.innerHTML = createComponentCreateOrEdit()
        
        ruculaWindow.appendChild(contentForm.childNodes[0] as HTMLDivElement)
        ruculaWindow.appendChild(contentForm.childNodes[1] as HTMLDivElement)
            
        const div = document.getElementById(id)
        div?.appendChild(ruculaWindow);
        calculateHeightRuculaWindow()
        prepareEventsButtonsCrud()
        maximizeWindow()
        eraseWindow()
        viewObject()
        viewDependency()
        openActionswindow()
        function calculateHeightRuculaWindow(){
            
            let offsetTop = Number(ruculaWindow.offsetTop)
            let height = Number(window.innerHeight)
            ruculaWindow.style.height = `${height-offsetTop}px` 
        }

    }
    
    function createNameWindow(name:string){
        let window = document.querySelector(".r-w-t") as HTMLElement
        window.innerHTML = name
    }

    function componentActions(){

        const ACTIONS = 
            `<div class="r-act" id="actions">
                <div class="r-act-opt r-head" id="w-title">
                    <button id="${constIdBaseWindow.NEW}" class="r-a-b r-btn-new-cancel-close"><i class="bi bi-plus-lg"></i></button>
                    <div class="r-w-t">
                    </div>
                    <button id="r-a-many" class="r-a-b"><i class="bi bi-list"></i></button>
                </div>
                <div class="searh-items-grid">
                <button><i class="bi bi-search"></i></button>
                    <input type="text"/>
                </div>
                <div class="r-act-grid" id="w-grid">
                </div>
            </div>` 
    
        return ACTIONS;
    }
    
    function createComponentCreateOrEdit(){
    
        const CREATE_OR_EDIT =  
        `<div class="container-r-f  js-open-close-container">
            <div class="r-act-opt r-head" id="w-title">
            </div>
            <div class="r-f-items r-f-home">
                <div class="r-f-home-round">
                    <i id="r-f-home-icon"class="bi" ></i>
                </div>
                <h3 id="r-f-home-title"></h3>
            </div>
        </div>
        <div autocomplete="off" class="r-f container-r-f r-f-hidden js-open-close-container">
           
        <div class="r-facede-action top">
            <div class="r-window-name r-facede-action top">
                <h3 class="${constIdBaseWindow.TITLE}"></h3>
            </div>
            <div class="r-head r-read-new r-facede-action top">
               
                <div style="z-index: 10;">
                    <button id="${constIdBaseWindow.ACTIONS_WINDOW}" class="r-a-b r-actions-window"><i class="bi bi-nut"></i></button>
                    <div class="r-display-inline-block r-actions-window r-actions-window-itens">
                        <div class="r-display-inline-block">
                            <button id="${constIdBaseWindow.MAXIMIZE_WINDOW}" class="r-a-b"><i class="bi bi-arrows"></i></button>
                            <button id="${constIdBaseWindow.RELOAD}" class="r-a-b "><i class="bi bi-arrow-repeat"></i></button>
                            <button id="${constIdBaseWindow.ERASE_WINDOW}" class="r-a-b "><i class="bi bi-eraser"></i></button>
                            <button id="${constIdBaseWindow.CHECK_DEPENDENCY}" class="r-a-b "><i class="bi bi-lock"></i></button>
                            <button id="${constIdBaseWindow.VIEW_OBJECT}" class="r-a-b "><i class="bi bi-braces-asterisk"></i></button>
                        </div>
                        <div style="display: inline;margin-left: 20px;">
                            <button id="${constIdBaseWindow.GLOBALIZATION}" class="r-a-b">
                                <i class="bi bi-globe-americas"></i>
                                <ol id="${constIdBaseWindow.OLLI_GLOBALIZATION}" class="${constIdBaseWindow.OLLI_GLOBALIZATION} list-vertical-buttons list-vertical-buttons-pp-left r-display-none">
                                </ol>                        
                            </button> 
                            <button id="${constIdBaseWindow.ENVIROMENT}" class="r-a-b">
                                <i class="bi bi-fire"></i>
                                <ol id="${constIdBaseWindow.OLLI_ENVIROMENT}" class="${constIdBaseWindow.OLLI_ENVIROMENT} list-vertical-buttons list-vertical-buttons-pp-left r-display-none">
                                </ol>                        
                            </button>    
                        </div>
                    </div>
                </div>
                    <div class="r-window-name r-facede-action">
                        <h3 class="${constIdBaseWindow.TITLE}"></h3>
                    </div>
                <div class="r-head r-read-edit">
                    <button id="r-a-save" class="r-a-b "><i class="bi bi-box-arrow-in-down"></i></button>
                    <button id="r-a-alter" class="r-a-b"><i class="bi bi-pen"></i></button>
                    <button id="r-a-delete" class="r-a-b"><i class="bi bi-trash"></i></button>    
                    <button id=${constIdBaseWindow.BUTTONS_MENU_VERTICAL} class="r-a-b"><i class="bi bi-three-dots-vertical"></i></button>
                    <ol id=${constIdBaseWindow.BUTTONS_MENU_VERTICAL_LIST} class="r-a-menu-vertical-list list-vertical-buttons list-vertical-buttons-pp-rigth r-display-none"> 
                    </ol>    
                </div>
                </div>
            </div>

            <form class="r-f-items" id="${constIdBaseWindow.FORM_RUCULA_JS}" autocomplete="off">
            </form>
            <div class="js-r-loader r-box-show">
                <div class="r-loader"></div>
            </div>
            <div class="r-facede-action bottom">
            </div>
            
        </div>`
    
        return CREATE_OR_EDIT;
    }
    
    function prepareEventsButtonsCrud(){
    
        let rNew = document.getElementById(constIdBaseWindow.NEW)
        
        
        rNew!.addEventListener("click", () => {
            openCloseContainer();
            rNew!.classList.toggle("r-btn-new-convert-close")
            rNew!.classList.toggle("r-btn-new-cancel-close")
        })
    
        reload()
    }
    
    function openCloseContainer(){
        
        let itemContainer = document.querySelectorAll(".js-open-close-container")
        
        itemContainer.forEach(item => {
            item.classList.toggle("r-f-hidden")
        })
    }
    
    
    function closeLeftGrid(grid:boolean){
        
        if(grid == false){

            let buttonNew = document.getElementById(constIdBaseWindow.NEW);
            buttonNew?.click()

            let actions = document.getElementById("actions");
            actions?.remove()

            let maximizeWindow = document.getElementById(constIdBaseWindow.MAXIMIZE_WINDOW)
            maximizeWindow?.remove()
        }
    }

    function maximizeWindow(){

        let maximize = document.getElementById(constIdBaseWindow.MAXIMIZE_WINDOW);
        
        
        maximize?.addEventListener('click',() => {
            let actions = document.getElementById("actions");
            actions?.classList.toggle("r-close-grid");
        })
    }
    
    function eraseWindow(){
    
        let erase = document.getElementById(constIdBaseWindow.ERASE_WINDOW)
        let form = windowBaseDOM.getPrincipalElementRucula()
        
        erase?.addEventListener('click', () => {
            form.reset();
        })
    }
    
    function viewObject(){
        let viewObject = document.getElementById(constIdBaseWindow.VIEW_OBJECT)
        viewObject?.addEventListener('click', () => consolePanelManagment.outputGetObject())
    }

    function viewDependency(){
        let dependecies = document.getElementById(constIdBaseWindow.CHECK_DEPENDENCY)
        dependecies?.addEventListener('click', () => consolePanelManagment.outputDependencies())
    }

    let objectReload:any = {}
    
    function setObjecReload(obj:any){
        objectReload = obj
    }
    
    function reload(){
    
        let reload = document.getElementById(constIdBaseWindow.RELOAD)
        let form = windowBaseDOM.getPrincipalElementRucula()
    
        reload?.addEventListener('click', () => {
            form.reset();
            // setValueInForm(objectReload)
        })    
    }


    function openActionswindow(){

        let actions = document.getElementById(constIdBaseWindow.ACTIONS_WINDOW)

        actions?.addEventListener('click', (e) => {
            actions?.nextElementSibling?.classList.toggle('r-actions-window-active')
            actions?.nextElementSibling?.classList.toggle('r-actions-window')
        })
    }


    return {
        createWindowBase: (id:string) => {
            createWindowBase(id)
        },
        createNameWindow: (name:string) => {
            createNameWindow(name)
        },
        setObjecReload: (obj:any) => {
            setObjecReload(obj)
        },
        setElementRoot:(id:string) => {
            elementRoot = document.getElementById(id)!
        },
        getElementRoot:() => {
           return elementRoot
        },
        getPrincipalElementRucula:() => {
            return document.getElementById(constIdBaseWindow.FORM_RUCULA_JS) as HTMLFormElement
        },
        closeLeftGrid: (grid:boolean) => closeLeftGrid(grid)
    }
})()