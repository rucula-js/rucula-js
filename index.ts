import config from "./exemples/config.global.json";
import input from './exemples/ordemServicoApiControl.json'
import { Rucula } from "./src/Rucula"

import "./public/style.css"
import "./public/normalize.css"

(()=> {
        
    var form = document.getElementById("js")
        
    let rucula = new Rucula(config as any,input as any,"js");
    
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

    // rucula.popup.messsage.warning({text:"Esse projeto encontra-se em fase de Desenvolvimento"});

    form?.addEventListener('r-a-save.click',(e) => {

        rucula.popup.messsage.info({text:"Registrando...", timeout:2000, disableadFooter:true});
        setTimeout(() => 
            rucula.popup.messsage.sucess({text:"Informações Registradas", timeout:1000, disableadFooter:true})
        ,2000)
    })

    form?.addEventListener('r-a-alter.click',(e) => {

        rucula.popup.messsage.info({text:"Alterando...", timeout:2000, disableadFooter:true});
        setTimeout(() => 
            rucula.popup.messsage.sucess({text:"Informações Alteradas", timeout:1000, disableadFooter:true})
        ,2000)
    })
})()