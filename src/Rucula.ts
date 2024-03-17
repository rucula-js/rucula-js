import { window } from "./entities/form/window";
import { managmentObject } from "./object/ObjectManagment";
import {createPanel,set}  from './console/Console'
import { windowBaseDOM } from "./elements/window-base/WindowBase";
import { constIdBaseWindow, constTypeFrame, eventRucula } from "./const";
import { createLeftGrid } from "./tabulator/Tabulator";
import { createFrameBlock } from "./elements/frame/TypeBlock/FrameBlock";
import { frameLineDOM } from "./elements/frame/TypeLine/FrameLine";
import { prepareButtons } from "./buttons/Button";
import { eventButton, openCloseRightListButtons } from "./buttons/EventButton";
import { configWindow, setWindow } from "./window/Window";
import { defaultValues } from "./elements/Defaults";
import { configureLayout } from "./Layout/layout";
import { buttonsBase } from "./buttons/buttonsBaseCrud";
import { httpManagment } from "./httpManagment/httpManagment";

export class Rucula{
    
    private window: window
    private elementRucula: HTMLElement
    private elementFormRucula!: HTMLFormElement
    
    constructor(window:window, id:string = 'rucula-js'){
        
        this.window = window
        this.elementRucula = document.getElementById(id)!
        this.initWindow()
    }
    
    private initWindow(){
        
        configWindow.set(this.window)
        defaultValues.setDefault(this.window)
        setWindow(this.window);
        let panel = createPanel();
        this.elementRucula.appendChild(panel);
        windowBaseDOM.createWindowBase(this.elementRucula.id);
        this.addHomeWindow();
        managmentObject.init(this.window)
        windowBaseDOM.createNameWindow(this.window.name)
        this.elementFormRucula = document.getElementById(constIdBaseWindow.FORM_RUCULA_JS) as HTMLFormElement
        configureLayout(this.window)
        this.createFrames()
        set() 
        createLeftGrid(this.window.grid);
        this.createButtons();
        httpManagment.init(this.window.endPoints)
        buttonsBase.initButtonsTypeCrudDefault();
        buttonsBase.initButtonPlus();
        buttonsBase.buttonsTypeCrud.crud(this.window.crud);
        
        this.resetBackground()
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
        openCloseRightListButtons()
    }

    private createFrames(){
    
        this.window.frames?.forEach(frame => {
            
            if(frame.type == constTypeFrame.BLOCK){

                const block = createFrameBlock(frame)
                this.elementFormRucula.appendChild(block)
            }
            
            if(frame.type == constTypeFrame.LINE){
                            
                const line = frameLineDOM.createFrameLine(frame)
                
                this.elementFormRucula.appendChild(line)
            }  
        })
    }

    private resetBackground(){

        let rucula = document.getElementById(constIdBaseWindow.FORM_RUCULA_JS)

        rucula?.addEventListener(eventRucula.RESET_BACKGROUND,() => {

            // createObject(this.window.frames)
            // createTableDependency(this.window.frames)

        })
    }

    public getFullObject():any{        
            return managmentObject.object.object.objectFull();
    }
    public getSepareteObject():any{
       return managmentObject.object.object.objectSeparate();       
    }

    public getAliasObject(alias:string):any{
        //todo create
    }

    public object = (() => {
        
        return {
            setValue: (targetPath:string, value: any) => {
        
                let identity = managmentObject.object.field.convertAliasToIdenty(targetPath);
        
                let input = document.querySelector('[identity='+identity+']') as any
        
                input.value = value
        
                input.click() //! This command forces the objectmanagment and tableDependecy processes to run
            },
            getValue:(config:string):any => {
                return managmentObject.object.object.getPropert(config)
            }
        }
    })()

    public event = (() => {
        
        return {
            details: (event:CustomEvent) => {
                
                let identity = event.detail.identity

                return {
                    identity: (identity.element as HTMLElement).getAttribute('identity'),
                    name:identity.name,
                    row: identity.row,
                    value: managmentObject.object.object.getPropert(identity.name),
                    targetPathWithRow:(targetPath:string) => {

                        //? This method helps to create Target Path with the current event line
                        return `${targetPath}.${identity.row}`
                    }             
                }
            }
        }
    })()

}



