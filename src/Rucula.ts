import { window } from "./entities/form/window";
import { windowBaseDOM } from "./elements/window-base/WindowBase";
import { constIdBaseWindow, constTypeFrame, eventRucula } from "./const";
import { createFrameBlock } from "./elements/frame/TypeBlock/FrameBlock";
import { frameLineDOM } from "./elements/frame/TypeLine/FrameLine";
import { eventButton, openCloseRightListButtons } from "./buttons/EventButton";
import { configWindow } from "./window/Window";
import { defaultValues } from "./elements/Defaults";
import { LayoutFrame } from "./Layout/layout";
import { buttonsBase } from "./buttons/buttonsBaseCrud";
import { buttonsDOM } from "./buttons/Button";
import { globalConfiguration } from "./global/entities/GlobalConfiguration";
import { ruculaGlobal } from "./global/GlobalConfig";
import { loaderManagment } from "./elements/loader/loader";
import { Popup } from "./popup/popup";
import { logs } from "./console/Console";
import { EventManagment } from "./Event/event";
import { exportManagmentObject, exportPaginationEvents } from "./exports";
import { URLRucula } from "./URL/urlManagment";

export class Rucula{
    private window: window
    private elementRucula: HTMLElement
    private elementFormRucula!: HTMLFormElement
    
    private layoutFrame = new LayoutFrame();
    
    
    public popup:Popup
    public event:EventManagment
    
    constructor(config: {
        global:globalConfiguration, 
        window:window, 
        id:string|undefined 
    }){
        config.id ??= 'rucula-js';
        ruculaGlobal.initGlobalConfiguration(config.global)
        windowBaseDOM.setElementRoot(config.id)
        this.window = config.window
        this.elementRucula = document.getElementById(config.id)!
        this.popup = new Popup();
        this.event = new EventManagment();
    }

    create(){
        
        let eventInit = new Event('rucula.init')
        let eventLoad = new Event('rucula.load')
        
        let rucula = windowBaseDOM.getElementRoot()
        rucula.dispatchEvent(eventInit)
        configWindow.set(this.window)
        defaultValues.setDefault(this.window)
        windowBaseDOM.createWindowBase(this.elementRucula.id)
        this.addHomeWindow();
        exportManagmentObject.frame.initObjects(this.window.frames)
        windowBaseDOM.createNameWindow(this.window.name)
        windowBaseDOM.closeLeftGrid(this.window.grid)
        this.elementFormRucula = windowBaseDOM.getPrincipalElementRucula() as HTMLFormElement
        exportPaginationEvents.headerSearch(this.window.gridSearch);
        exportPaginationEvents.fotter(this.window.gridFooter);
        this.layoutFrame.configureLayout(this.window)
        this.createFrames()
        this.createButtons()
        buttonsBase.initButtonsTypeCrudDefault();
        buttonsBase.initButtonPlus();
        buttonsBase.buttonsTypeCrud.crud(this.window?.crud);        
        rucula.dispatchEvent(eventLoad)
        logs()
    }

    private addHomeWindow(){
     
        if(this.window?.iconHome){
            
            let icon = document.getElementById("r-f-home-icon")!
            icon?.classList.add(this.window.iconHome)
        }

        if(this.window?.messageHome){
        
            let title = document.getElementById("r-f-home-title")!
            title.textContent = this.window?.messageHome
        }
        
        let titles = document.querySelectorAll(`.${constIdBaseWindow.TITLE}`)
        titles?.forEach(title => {
            title.textContent = this.window.name
        })
    }
    
    private createButtons(type:string="CRUD"){

        if(type == "CRUD"){
            buttonsDOM.prepareButtonsInLeftBox(this.window.button)
        }
        eventButton(this.window.pathController, this.window.button)
        openCloseRightListButtons()
    }

    private createFrames(){
    
        this.window.frames?.forEach(frame => {
            
            if(frame.type == constTypeFrame.BLOCK){

                const block = createFrameBlock(frame)
                this.elementFormRucula.appendChild(block)
                eventCreated(block) 
            }
            
            if(frame.type == constTypeFrame.LINE){
                            
                const line = frameLineDOM.createFrameLine(frame)
                this.elementFormRucula.appendChild(line)
                eventCreated(line)
            }  
            
            function eventCreated(frameElement:HTMLDivElement){
                
                var eventName = `frame.${frame.alias}.complete`
                let event = new CustomEvent(eventName, {
                    detail: {

                        element: frameElement,
                        height: frameElement.offsetHeight,
                        width: frameElement.offsetWidth
                    }
                })
                let rucula = windowBaseDOM.getElementRoot();
                
                rucula.dispatchEvent(event)
            }
        })
    }

    public loader = loaderManagment
    public buttons = buttonsDOM
    
    public url = (URL?: { absolute: string; relative: string; params: string; }) => new URLRucula(exportManagmentObject.object.object, URL);
    
    public object = (() => {
        
        return {
            
            objectUnique: (alias:string) => exportManagmentObject.object.object.objectUnique(alias),
            getFullObject:() => exportManagmentObject.object.object.objectFull(),
            getSepareteObject:() => exportManagmentObject.object.object.objectSeparate(),

            setValue: (targetPath:string, value: any) => {
        
                const ATTR_DISABLED = 'disabled'
                let identity = exportManagmentObject.object.field.convertAliasToIdenty(targetPath);
        
                let input = document.querySelector('[identity='+identity+']') as HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement
        
                let disabled = input.getAttribute(ATTR_DISABLED) == null ?  null : ATTR_DISABLED

                if(disabled){
                    input.removeAttribute(ATTR_DISABLED)
                }

                input.value = value
                input.focus({preventScroll: true}) //! This command forces the objectmanagment and tableDependecy processes to run
                input.blur()
                
                if(disabled){
                    input.setAttribute(ATTR_DISABLED,'')
                }

            },
            getValue:(config:string):any => {
                return exportManagmentObject.object.object.getPropert(config)
            }
        }
    })()

}




