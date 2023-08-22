import { enviroment } from './entities/Enviroments';
import { globalConfiguration } from './entities/GlobalConfiguration';
import { localization } from './entities/Localization';

'use strict';

let _configuration:globalConfiguration;

function initGlobalConfiguration(config:globalConfiguration){
    _configuration = config;
    setEnviroment();
    setLocalization();
}

function  setEnviroment(enviroment:string|number = 0): void {
    checkEnvironments(_configuration.environments);
    if(typeof enviroment === "number"){
        _configuration.chosenEnvironment = _configuration.environments[0]
        return;
    }
    let env =  _configuration.environments.find(c => c.env === enviroment)!;
    if(env == undefined || env == null){
        throw new Error ("🌿 environment not found")
    }
    _configuration.chosenEnvironment = env;  
}

function checkEnvironments(environments:enviroment[]){
    if(environments.length == 0) throw new Error ("🌿 environment must be informed")
}

function getEnvironment(){
    return _configuration.chosenEnvironment;
}

function setLocalization(locales:string|number = 0): void {
   
    checkLocalizations(_configuration.localizations)
    if(typeof locales === "number"){
        _configuration.chosenLocalization = _configuration.localizations[0]
        return;
    }
    let loc = _configuration.localizations.find(c => c.locales === locales)!;
    if(loc == undefined || loc == null){
        throw new Error ("🌿 localization not found")
    }
    _configuration.chosenLocalization = loc;  
}

function getLocalization(){
    return _configuration.chosenLocalization;
}

function checkLocalizations(localizations:localization[]){
    if(localizations.length == 0) throw new Error ("🌿 localization must be informed")
}

export {
    initGlobalConfiguration,
    setEnviroment,
    getEnvironment,
    setLocalization,
    getLocalization
}