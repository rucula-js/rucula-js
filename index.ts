import config from "./exemples/window.global.json";
import input from './exemples/ordemServicoApiControl.json'
import { createWindow } from "./src/window/WindowFactory"
import { initGlobalConfiguration } from "./src/global/GlobalConfig"

import  "tabulator-tables/dist/css/tabulator.css"
import "./public/style.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css";
(()=> {
    initGlobalConfiguration(config as any)
    createWindow(input as any,"js")   
})() 