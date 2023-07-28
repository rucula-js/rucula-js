import * as table  from '../table-dependency/TableDependency';
import * as  obj from '../object/ObjectManagment';

export class ConsoleService{
    
    private consolePanel!:HTMLDivElement
    set(){
        this.consolePanel = document.querySelector('.console-panel-body') as HTMLDivElement;
        this.openCloseConsole();
        this.setCommand();
    }
    private openCloseConsole(): void {
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
    private setCommand(){
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
            
            if(args[0] != 'ruc')this.outputMessageRucNotFound()
            if( (args.length == 1 &&  args[0] == 'clear')||
                (args.length == 1 &&  args[0] == '-c'))this.outputClear()
            if( args.length == 1) return;
            switch(args[1]){
                case '--help':
                    this.outputHelp(args)
                    break;
                case '--dep':
                        this.outputDependencies()
                        break;
                case '--obj':
                    this.outputGetObject()
                    break;
                default: this.outputCommandNotFound()
             }
        })
    }
    private outputHelp(args: string[]){
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
        this.consolePanel.innerHTML = output
    }
    private outputMessageRucNotFound(){
        this.consolePanel.textContent = "comando [ruc] não encontrado"
    }
    private outputClear(){
        this.consolePanel.textContent = ''
    }
    private outputCommandNotFound(){
        this.consolePanel.textContent = "comando não encontrado"
    }
    private outputDependencies(){
        let dependecies = table.getDependencies();
        let output ='<br>'; 
        output += '<h6>Dependências não Resolvidas</h6>';
        output+='<br>'
        dependecies.forEach(c => {           
            output+=`<div>${c} ⛔</div>`
        })
        this.consolePanel.innerHTML = output
    }
    private outputGetObject(){
        let dependecies = table.getDependencies();
        let output ='<br>'; 
        output += '<h6>Objeto Atual</h6>';
            output+=`<div style="color:#0b6ca5;">${JSON.stringify(obj.object())}</div>`
        this.consolePanel.innerHTML = output
    }
}