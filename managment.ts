import config from "./exemples/config.global.json";
import input from './exemples/ruculaManagment.json'
import { Rucula } from "./src/Rucula"

import { initGlobalConfiguration } from "./src/global/GlobalConfig"

import "tabulator-tables/dist/css/tabulator.css"
import "./public/style.css"
import "./public/normalize.css"

(()=> {
    
    let ruculaWindow = {}

    const RUCULA_ELEMENT = "js"

    if(window.location.search){
        let value  = window.location.search.replace("?window=","")
        ruculaWindow = JSON.parse(JSON.stringify(value))
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

    let abaView:any = null

    function visualizeWindow(){
       
        let obj = rucula.object.getFullObject();
        
        if(abaView == null){

            abaView = window.open(`?window=${JSON.stringify(obj)}`)
        }
        
        if(abaView){
            abaView.location.href = `?window=${JSON.stringify(obj)}`
        }
    }
    
})()
