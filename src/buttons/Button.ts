import { button } from '../entities/form/button';
import { ElementStrategy } from './ElementEstrategy';
import { ElementButton } from './ElementButton';
import { ElementLink } from './ElementLink';
import { constIdBaseWindow, constTargetButtonCrudDefault } from '../const';
import { ruculaGlobal } from '../global/GlobalConfig';
import { enviroment } from '../global/entities/Enviroments';
import { cookie } from '../common/coockie/coockie';

export let buttonsDOM = (()=> {
    
    let elementStrategy!:ElementStrategy;
    
    function buttonIsNotDefault(target:string){
        
        return  target != constTargetButtonCrudDefault.SAVE && 
        target != constTargetButtonCrudDefault.ALTER && 
        target != constTargetButtonCrudDefault.DELETE
    }

    function createButtonOrLink (button:button):HTMLButtonElement|HTMLAnchorElement{
        if(button.type != "button" && button.type != "link"){
            throw new Error("tipo do botão deve ser button ou link");
        }
        if(button.type == "button"){
            elementStrategy = new  ElementButton();
        }
        if(button.type == "link"){
            elementStrategy = new ElementLink();
        }
        return elementStrategy.createElement(button);
    } 

    function getButton(target:string) {
        return document.getElementById(target)
    }

    function prepareLocalizations(){
     

        let globalization = document.getElementById(constIdBaseWindow.GLOBALIZATION)
        let olliGlobalization = document.getElementById(constIdBaseWindow.OLLI_GLOBALIZATION)

        globalization?.addEventListener("click", () => {
            olliGlobalization?.classList.toggle("r-display-none")
        })
        
        let globalConf = ruculaGlobal.getConfigurationGlobal()

        globalConf.localizations.forEach(loc => {
            
            const li = document.createElement("li")
            
            li.textContent = loc.language;
            
            olliGlobalization?.appendChild(li)
            
            li.addEventListener("click",() => {
                ruculaGlobal.setLocalization(loc.locales)
            })
        })
    }

    function prepareEnviroments(){
     
        let baseEnvironments = document.getElementById(constIdBaseWindow.ENVIROMENT)!
        let olliEnviroment = document.getElementById(constIdBaseWindow.OLLI_ENVIROMENT)
        let description = baseEnvironments.querySelector('.description')!
        let icon = baseEnvironments.querySelector('i')!
        
        let env = cookie.read('enviroment')
        
        if(env){
            ruculaGlobal.setEnviroment(env)
        }

        let atualEnvironment = ruculaGlobal.getEnvironment();
        
        setDescription(atualEnvironment)

        baseEnvironments?.addEventListener("click", (e) => {
            
            olliEnviroment?.classList.toggle("r-display-none")
            let target = (e.target as HTMLElement)
            let env = target.getAttribute('env')
            document.cookie = `enviroment=${env}`  
        })
        
        let globalConf = ruculaGlobal.getConfigurationGlobal()

        globalConf.environments.forEach(enviroment => {
            
            const li = document.createElement("li")
            
            li.setAttribute('env',enviroment.env)
            li.textContent = enviroment.description
            
            olliEnviroment?.appendChild(li)
            
            li.addEventListener("click",() => {

                ruculaGlobal.setEnviroment(enviroment.env)
                setDescription(enviroment)
            })
        })

        function setDescription(enviroment:enviroment){
            
            description.textContent = enviroment.description
            if(enviroment.env.toLocaleLowerCase() == 'production'){
                icon.style.color = 'red'
            }
            if(enviroment.env != 'production'){
                icon.style.color = ''
            }
        }
    }
    return {
        createButtonOrLink: (button:button) => createButtonOrLink(button),
        
        prepareButtonsInLeftBox: (button:button[]) => {
            
            const ListRightButtons = document.getElementById("r-a-menu-vertical-list")
            
            let buttons = button?.filter(c=> buttonIsNotDefault(c.target))
            
            if(buttons?.length == 0 || buttons == undefined){
                document.querySelector('.r-vertical-actions')?.classList.add('r-display-none')
            }
            
            buttons?.forEach(b => {
                    
                const li = document.createElement("li")
                li.appendChild(createButtonOrLink(b))
    
                ListRightButtons?.appendChild(li)  
            })
            
            prepareLocalizations()
            prepareEnviroments()

        },
        buttonIsNotDefault:(target:string) => buttonIsNotDefault(target),
        
        disable:(target:string) => {
            
            let button = getButton(target)
            button?.classList.remove('r-display-none')
            button?.setAttribute('disabled','')
        },
        enable:(target:string) => {

            let button = getButton(target)
            button?.classList.remove('r-display-none')
            button?.removeAttribute('disabled')
        },
        hide:(target:string) => {

            let button = getButton(target)
            button?.classList.add('r-display-none')
        },
        destroy:(target:string) => {

            let button = getButton(target)
            button?.remove()
        }
    }
})()

