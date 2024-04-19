import * as table  from '../table-dependency/TableDependency';
import { KeyEventAdd, KeyEventClear, KeyEventGetIndex } from '../global/KeyEvents';
import { managmentObject } from '../object/ObjectManagment';
    
let consolePanel!:HTMLDivElement

const PANEL_CONSOLE = `
<div class="box-panel">
    <div class="panel">
        <span>🔴 🟡 🟢</span>    
        <div class="content-panel">
            <code id="content-panel">
            </code>
        </div>
        <input class="console-panel-command-js" type="text">
    </div>    
</div>
`;
export function createPanel():HTMLDivElement{
    const div = document.createElement('div');
    div.innerHTML = PANEL_CONSOLE;
    return div;
} 
function set(){
    //todo: Se o ambiente for de produção,o console deve ser removido do tela
    consolePanel = document.getElementById('content-panel') as HTMLDivElement;
    openCloseConsole();
    setCommand();
}
function  openCloseConsole(): void {
    let OpenClose: boolean = false;
    let cons = document.querySelector(".box-panel") as HTMLDivElement
    document.addEventListener('keydown',(event) =>{
       
        const key = (event as KeyboardEvent).key;
        KeyEventAdd(key);
        if (KeyEventGetIndex(0) == "Control" && KeyEventGetIndex(1) ==  "y"){
            event.preventDefault();
            if(OpenClose){
                cons.style.display = 'none';
                OpenClose = false;
            }else{
                cons.style.display = 'block';
                OpenClose = true;
                cons.querySelector("input")?.focus()
            }
        }
    })
    document.addEventListener('keyup',(event)=> {
        KeyEventClear();
    })

}   
function setCommand(){
    let command = document.querySelector(".console-panel-command-js") as HTMLInputElement;

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
    let dependecies = table.tableDependency.getDependenciesNotResolded()
    

    let output ='<br>'; 
    output += '<h2>Dependências não Resolvidas</h2>';
    output+='<br>'
    
    dependecies.forEach(c => { 
        c.fieldsNotResolved.forEach(dep => {

            if(c.isHibernate){
                output+=`<div style="color: orange;">${dep}</div>`
            }
            if(c.isHibernate == false){
                output+=`<div style="color: green;">${dep}</div>`
            }
        })
    })

    consolePanel.innerHTML = output
}
function outputGetObject(){
    let output ='<br>'; 
    output += '<h2>Objeto Atual</h2>';
        output+=`<div style="margin-top:10px;">${JSON.stringify(managmentObject.object.object.objectFull())}</div>`
    consolePanel.innerHTML = output
}


export {set}