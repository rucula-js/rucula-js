import input from './exemples/ruculaManagment.json'
import { Rucula } from "./src/Rucula"

import { ruculaGlobal, } from "./src/global/GlobalConfig"

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

    let rucula = new Rucula(ruculaGlobal as any, ruculaWindow as any,RUCULA_ELEMENT);

    if(window.location.search == ''){
        let jss = document.getElementById("form-rucula-js");
        
        jss?.addEventListener('input',() => {
        
            visualizeWindow()
    
        })
    
        jss?.addEventListener('change',() => {
            
            visualizeWindow()
    
        })
        
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
    
                let _items:any = []
                
                object.aliasLayout.forEach((item:any) => {
                    let opt = [item.coluna1,item.coluna2,item.coluna3]
                    _items.push(opt as any)
                })
     
                window.layout = {
                    items: _items
                }
    
                window.button = object.aliasButton
                
                return window
            }
        }
    }

    
    
})()
