import { enviroment } from './entities/Enviroments';
import { globalConfiguration } from './entities/GlobalConfiguration';
import { localization } from './entities/Localization';


export let ruculaGlobal = (() => {

    let configuration:globalConfiguration;

    function checkLocalizations(localizations:localization[]){
        
        if(localizations.length == 0){
            throw new Error ("🌿 localization must be informed")
        }
    }
    function checkEnvironments(environments:enviroment[]){
        
        if(environments.length == 0){
            throw new Error ("🌿 environment must be informed")
        }
    }    

    return {

        initGlobalConfiguration: function (config:globalConfiguration){
            configuration = config;
            ruculaGlobal.setEnviroment();
            ruculaGlobal.setLocalization();
        },
        setLocalization: function(locales:string|number = 0): void {
       
            checkLocalizations(configuration.localizations)

            if(typeof locales === "number"){
                configuration.chosenLocalization = configuration.localizations[0]
                return;
            }
            
            let loc = configuration.localizations.find(c => c.locales === locales)!;

            if(loc == undefined || loc == null){
                throw new Error ("🌿 localization not found")
            }
            configuration.chosenLocalization = loc;  
        },

        setEnviroment: function(enviroment:string|number = 0): void {
            
            checkEnvironments(configuration.environments);
            
            if(typeof enviroment === "number"){
                configuration.chosenEnvironment = configuration.environments[0]
                return;
            }
            let env =  configuration.environments.find(c => c.env === enviroment)!;
            if(env == undefined || env == null){
                throw new Error ("🌿 environment not found")
            }
            configuration.chosenEnvironment = env;  
        },
        
        getEnvironment:function (){
            return configuration.chosenEnvironment;
        },

        getLocalization:function (){
            return configuration.chosenLocalization;
        },
        getConfigurationGlobal:function (){
            return configuration;
        }
    }
})()
