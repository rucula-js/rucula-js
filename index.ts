import { domCreateForm } from "./src/window/WindowFactory";
import { initGlobalConfiguration } from "./src/global/GlobalConfig";
import config from "./exemples/window.global.json";
import input from './exemples/ordemServico.json'
import "./public/style.css"

(()=> {
    initGlobalConfiguration(config as any)
    domCreateForm(input as any)   
})() 