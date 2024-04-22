import config from "./exemples/config.global.json";
import input from './exemples/ruculaManagment.json'
import { Rucula } from "./src/Rucula"

import { initGlobalConfiguration } from "./src/global/GlobalConfig"

import "tabulator-tables/dist/css/tabulator.css"
import "./public/style.css"
import "./public/normalize.css"

(()=> {
    
    let ruculaWindow = {}
    let abaView:any = null

    const RUCULA_ELEMENT = "js"
    
    if(window.location.search != ''){
        let newWindow = window.decodeURIComponent(window.location.search.replace('?window=',''))
        ruculaWindow = JSON.parse(newWindow)
    }

    if(window.location.search == ''){
        ruculaWindow = input
    }

    initGlobalConfiguration(config as any)
    
    let jss = document.getElementById(RUCULA_ELEMENT);

    jss?.addEventListener('rucula.load',() => {
        
        let view = document.getElementById("window-view")

        view?.addEventListener('click',() => visualizeWindow())

    })

    let rucula = new Rucula(ruculaWindow as any,RUCULA_ELEMENT);


    function visualizeWindow(){
       
        let obj = createJSON()
        
        let path = `?window=${JSON.stringify(obj)}`;
        
        if(abaView == null){

            abaView = window.open(path)
        }
        
        if(abaView != null){
            abaView.location.href = path;
        }
        
        function createJSON(){
        
            let object = rucula.object.getSepareteObject();
            
            let window = object.aliasWindow 

            window.frames = object.aliasFrame 

            window.frames.forEach((frame:any) => {
                
                frame.fields = object.aliasField.filter((field:any) => field.frame == frame.alias)
            });

            return window
        }
    }
    
})()
