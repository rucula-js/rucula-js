import config from "./exemples/config.global.json";
import input from './exemples/ordemServicoApiControl.json'
import { Rucula } from "./src/Rucula"

import { ruculaGlobal } from "./src/global/GlobalConfig"

import "./public/style.css"
import "./public/normalize.css"

(()=> {
    
    ruculaGlobal.initGlobalConfiguration(config as any)
    
    var form = document.getElementById("js")
    
    form?.addEventListener('rucula.init', (e) => {
        
    })
    
    let rucula = new Rucula(input as any,"js");
    
    form?.addEventListener('input.itensServico.quantidade',(e) => {

        let _this = rucula.event.details(e as CustomEvent)

        let path_valorUnitario = _this.targetPathWithRow('itensServico.valorUnitario')
        let path_subTotal = _this.targetPathWithRow('itensServico.subtotal')
        
        let value_valorUnitario = rucula.object.getValue(path_valorUnitario)

        let value_subTotal = parseFloat(value_valorUnitario) * Number(_this.value)

        rucula.object.setValue(path_subTotal,value_subTotal)
    })

    form?.addEventListener('input.itensServico.quantidade',(e) => {
      
        let identity = (e as CustomEvent).detail.identity
        
        let element = identity.element as HTMLInputElement

        let value = Number(element.value)
        
        if(value > 10){
            element.style.color = "blue"  
            element.style.fontWeight = "bold"

        }
        
        if(value < 0){
            element.style.color = "red"  
            element.style.fontWeight = "bold";
        }
        if(value < 10 && value >= 0){
            element.style.color = ""  
            element.style.fontWeight = ""
        }
    })

})()