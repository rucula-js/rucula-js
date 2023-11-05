import config from "./exemples/window.global.json";
import input from './exemples/ordemServicoApiControl.json'
import { Rucula } from "./src/Rucula"

import { initGlobalConfiguration } from "./src/global/GlobalConfig"

import  "tabulator-tables/dist/css/tabulator.css"
import "./public/style.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { window } from "./src/entities/form/window";
(()=> {
    initGlobalConfiguration(config as any)
    
    let rucula = new Rucula(input as any,"js");
})() 

