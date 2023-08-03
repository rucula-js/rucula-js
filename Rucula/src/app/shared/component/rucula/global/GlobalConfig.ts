import { Enviroment } from './entities/Enviroments';
import globalConfiguration from './window.global.json';

'use strict';

let  _environments: Enviroment[] = [];
let  _environment!: Enviroment;

function  preparaEnviroment(enviroment:string = "development"): void {
    _environments = globalConfiguration;
    checkEnvironments(_environments);
    _environment = _environments.find(c => c.env === enviroment)!;     
    console.log(_environment)
}
function getEnvironment(){
    return _environment;
}
function setAllEnvironment(env:Enviroment[]){
    checkEnvironments(_environments);
    _environments = env 
}
function checkEnvironments(env:Enviroment[]){
    if(env.length == 0) throw new Error ("🌿 environment must be informed")
}
export {
    preparaEnviroment,
    setAllEnvironment,
    getEnvironment
}