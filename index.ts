import config from "./exemples/config.global.json";
import input from './exemples/ordemServicoApiControl.json'
import { Rucula } from "./src/Rucula"

import { initGlobalConfiguration } from "./src/global/GlobalConfig"

import "tabulator-tables/dist/css/tabulator.css"
import "./public/style.css"
import "./public/normalize.css"
import "bootstrap-icons/font/bootstrap-icons.min.css";

(()=> {
    
    initGlobalConfiguration(config as any)
    
    let rucula = new Rucula(input as any,"js");

    var form = document.getElementById("form-rucula-js")

    form?.addEventListener("before-send-object-http", (e) => {
        console.log(rucula.get())
    })

    form?.addEventListener("send-object-http-error", (e) => {
        alert("Erro HTTP")
    })

})() 

