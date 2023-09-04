export function createWindowBase(id:string){
    const window = document.createElement("div");
    window.classList.add("r-w");
    
    const form = document.createElement("div");
    form.id = "form-rucula-js"
    form.setAttribute("autocomplete","off");
    
    const buttons = document.createElement("div");
    buttons.classList.add("r-b");
    buttons.id = "r-b";
    
    const console = document.createElement("div");
    console.classList.add("r-c");
        
    window.appendChild(console)
    window.appendChild(form)
    window.appendChild(buttons)
    
    const div = document.getElementById(id)

    div?.appendChild(window);
}