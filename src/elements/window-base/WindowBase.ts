import { constIdBaseWindow } from "../../const";

export function createWindowBase(id:string){

    const window = document.createElement("div");
    window.classList.add("r-w");

    const contentForm = document.createElement("div");
    const actions = document.createElement("div");
    
    window.appendChild(actions)
    window.appendChild(contentForm)

    contentForm.outerHTML = container();    
    actions.outerHTML = componentActions();

    const div = document.getElementById(id)
    div?.appendChild(window);
}

export function createNameWindow(name:string){
    let window = document.querySelector(".r-w-t") as HTMLElement
    window.innerHTML = name
}

function container(){
    
    const CONTAINER_FORM = 
    `<div id="container-r-f" class="container-r-f">
        <div class="r-act-opt r-head" id="w-title">
        </div>
        <div class="r-f-items r-f-home">
            <div class="r-f-home-round">
                <i id="r-f-home-icon"class="bi" ></i>
            </div>
            <h3 id="r-f-home-title"></h3>
        </div>
    </div>`
    
    return CONTAINER_FORM;
}

export function cleanContainer(){
    let element = document.getElementById("container-r-f") as HTMLDivElement
    element.outerHTML = container(); 
}

function componentActions(){

    const ACTIONS = 
        `<div class="r-act">
            <div class="r-act-opt r-head" id="w-title">
                <button id="${constIdBaseWindow.NEW}" class="r-a-b"><i class="bi bi-plus-lg"></i></button>
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

export function createComponentCreateOrEdit(){

    const CREATE_OR_EDIT =  
    `<div autocomplete="off" class="r-f">
        <div class="r-head r-read-new">
            <button id="r-a-cancel" class="r-a-b r-a-cancel">Cancelar</button>
            <div class="r-head r-read-edit">
                <button id="r-a-save" class="r-a-b "><i class="bi bi-box-arrow-in-down"></i></button>
                <button id="r-a-alter" class="r-a-b"><i class="bi bi-pen"></i></button>
                <button id="r-a-delete" class="r-a-b"><i class="bi bi-trash"></i></button>    
                <button id="r-a-menu-vertical" class="r-a-b"><i class="bi bi-three-dots-vertical"></i></button>
                <ol id="r-a-menu-vertical-list">
                    <li>Documentação</li>    
                    <li>Menu Item 1</li>    
                    <li>Menu Item 2</li>    
                    <li>Menu Item 3</li>    
                </ol>    
            </div>
        </div>
        <form class="r-f-items" id="${constIdBaseWindow.FORM_RUCULA_JS}">
        
        </form>
    </div>`

    let container = document.getElementById("container-r-f") as HTMLDivElement
    container.innerHTML = CREATE_OR_EDIT;
}

export function createComponentDetails(){
    
    const  DETAILS =  
        `<div class="r-f-datail">
            <div class="form">
            </div>
        </div>`
 
    let container = document.getElementById("container-r-f") as HTMLDivElement
    container.innerHTML = DETAILS;
}