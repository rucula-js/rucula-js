import { window } from "./entities/form/window";
import { createObject, setJoinChield } from "./object/ObjectManagment";
import { createTableDependency } from "./table-dependency/TableDependency";

import {createPanel,set}  from './console/Console'
import { cleanContainer, createComponentCreateOrEdit, createNameWindow, createWindowBase } from "./elements/window-base/WindowBase";
import { constIdBaseWindow, constTypeFrame } from "./const";
import { hiddenPopper } from "./popper/PopperEvent";
import { createLeftGrid } from "./tabulator/Tabulator";
import { createFrameBlock } from "./elements/frame/TypeBlock/FrameBlock";
import { createFrameLine } from "./elements/frame/TypeLine/FrameLine";
import { prepareButtons } from "./buttons/Button";
import { eventButton } from "./buttons/EventButton";
import { setWindow } from "./window/Window";


export class Rucula{
    
    private window: window
    private elementRucula: HTMLElement
    private elementFormRucula!: HTMLFormElement
    
    constructor(window:window, id:string = 'rucula-js'){
        
        this.window = window
        this.elementRucula = document.getElementById(id)!
        setJoinChield(this.window.joinChield) 
        this.initWindow()
    }

    private resetWindow():void{
        createTableDependency(this.window.frames)
        createObject(this.window.frames);
    }

    private initWindow(){
        
        let panel = createPanel();
        this.elementRucula.appendChild(panel)
        createWindowBase(this.elementRucula.id);
        this.elementFormRucula = document.getElementById(constIdBaseWindow.FORM_RUCULA_JS) as HTMLFormElement
        this.addHomeWindow();
        createNameWindow(this.window.name)
        createTableDependency(this.window.frames)
        setWindow(this.window);
        this.prepareEventsButtonsCrud()
        hiddenPopper()
        set() 
        createLeftGrid();
    
    }

    private addHomeWindow(){
        
        if(this.window?.iconHome){
            
            let icon = document.getElementById("r-f-home-icon")
            icon?.classList.add(this.window.iconHome)
        }

        if(this.window?.messageHome){
        
            let title = document.getElementById("r-f-home-title")
            title!.textContent = this.window?.messageHome
        }
    }
    
    private createButtons(type:string="CRUD"){

        if(type == "CRUD"){
            prepareButtons(this.window.button)
        }
        eventButton(this.window.button)
    }

    private prepareEventsButtonsCrud(){

        let buttonNew = document.getElementById(constIdBaseWindow.NEW)
        
        buttonNew?.addEventListener("click", () => {
        
          createComponentCreateOrEdit()
          this.elementFormRucula = document.getElementById(constIdBaseWindow.FORM_RUCULA_JS) as HTMLFormElement; 
           
          createObject(this.window.frames)
          this.createFrames()
          this.createButtons()
      
          let cancel = document.getElementById("r-a-cancel")
          cancel?.addEventListener("click", () => {
            cleanContainer()
            this.addHomeWindow()
          })
        })  
    }


    private createFrames(){
    
        this.window.frames?.forEach(frame => {
        
            if(frame.type == constTypeFrame.BLOCK){

                const block = createFrameBlock(frame)
                this.elementFormRucula.appendChild(block)
          
            }
    
            if(frame.type == constTypeFrame.LINE){
            
                const line = createFrameLine(frame)
                this.elementFormRucula.appendChild(line)
            
            }  
        })
    }

    private resetWindowUi(){
        const form = document.getElementById(constIdBaseWindow.FORM_RUCULA_JS) as HTMLFormElement
        form.reset();
    }
}



