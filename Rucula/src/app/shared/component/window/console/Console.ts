import * as table  from '../table-dependency/TableDependency';
import * as  obj from '../object/ObjectManagment';
    
let consolePanel!:HTMLDivElement

function set(){
    consolePanel = document.querySelector('.console-panel-body') as HTMLDivElement;
    openCloseConsole();
    setCommand();
}
function  openCloseConsole(): void {
    let OpenClose: boolean = false;
    let viewConsole = document.getElementById("view-console") as HTMLButtonElement
    let console = document.querySelector(".console") as HTMLDivElement
    
    viewConsole.addEventListener('click',() =>{
        if(OpenClose){
        console.style.display = 'none';
        OpenClose = false;
        }else{
        console.style.display = 'block';
        OpenClose = true;
        }
    })
}   
function setCommand(){
    let command = document.querySelector(".console-panel-command") as HTMLInputElement;

    command.addEventListener("keydown",(event) => {  
        if(event.key != 'Enter') return;
        let input = (event.target as HTMLInputElement)
        const args:string[] = [];

        input.value
        .trim()
        .split(' ')
        .forEach(c => {
            if(c != '')args.push(c);
        })
        
        if(args[0] != 'ruc')outputMessageRucNotFound()
        if( (args.length == 1 &&  args[0] == 'clear')||
            (args.length == 1 &&  args[0] == '-c'))outputClear()
        if( args.length == 1) return;
        switch(args[1]){
            case '--help':
                outputHelp(args)
                break;
            case '--dep':
                    outputDependencies()
                    break;
            case '--obj':
                outputGetObject()
                break;
            default: outputCommandNotFound()
            }
    })
}
function outputHelp(args: string[]){
    let outputHelp:string[] = [];

    outputHelp[0]= ''
    outputHelp[1]= 'sintaxe: ruc [command] [options]'
    outputHelp[2]= 'exeple: ruc tab --all|-a'
    var output = '';
    outputHelp.forEach(c => {
        if(c ===''){
            output+='<br>'
        }else{
            output+=`<div>${c}</div>`
        }
    })
    consolePanel.innerHTML = output
}
function outputMessageRucNotFound(){
    consolePanel.textContent = "comando [ruc] não encontrado"
}
function outputClear(){
    consolePanel.textContent = ''
}
function outputCommandNotFound(){
    consolePanel.textContent = "comando não encontrado"
}
function outputDependencies(){
    let dependecies = table.getDependencies();
    let output ='<br>'; 
    output += '<h6>Dependências não Resolvidas</h6>';
    output+='<br>'
    dependecies.forEach(c => {           
        output+=`<div>${c} ⛔</div>`
    })
    consolePanel.innerHTML = output
}
function outputGetObject(){
    let dependecies = table.getDependencies();
    let output ='<br>'; 
    output += '<h6>Objeto Atual</h6>';
        output+=`<div style="color:#0b6ca5;">${JSON.stringify(obj.object())}</div>`
    consolePanel.innerHTML = output
}


export {set}