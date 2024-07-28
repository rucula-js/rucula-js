import { button } from "../entities/form/button";
import { ruculaGlobal } from "../global/GlobalConfig"
import { managmentObject } from "../object/ObjectManagment";

export  let urlManagment = () => {
        
    return {
        
        createURL: function (controller:string, button:button){

            if(button.URL)
            if(button.URL?.absolute?.length > 0) {
                let url = createPath(button.URL.absolute)
                return url
            }
            
            let enviroment = ruculaGlobal.getEnvironment();
            let url = `${enviroment.hostname}:${enviroment.port}`

            controller = controller.replace( /^\/+/gm,'')

            let params = ''

            if(button.URL)
            if(button.URL?.params?.length > 0 ){
                params = createPath(button.URL.params)
                url = `${url}/${controller}?${params}`
                return url 
            }

            if(button.URL)
            if(button.URL?.relative?.length > 0 ){
                let path = createPath(button.URL.relative)
                return  `${url}/${path}` 
            }

            return url
        },

        createWithParams: (path:string) => createWithParams(path),
        createWithoutParams: (path:string) => createWithoutParams(path),
        createPath: (path:string) => createPath (path)
    }

    function createPath(path:string){

        path = createWithParams(path)
        path = createWithoutParams(path)

        return path
    }

    function createWithParams (path:string){
        var regex = /([^&]+=)({([^}&]+)})/g;

        var matches = path.matchAll(regex);

        for (const match of matches) {
            
            var propertValue = match[3]

             var value = managmentObject.object.object.getPropert(propertValue)

             path = path.replace(match[0],`${match[1]}${value}`)
        }

        return path
    }

    function createWithoutParams (path:string){
        
        var regex = /\/{([^}&]+)}/gm

        var matches = path.matchAll(regex);

        for (const match of matches) {
            
            var propertValue = match[1]

            var value = managmentObject.object.object.getPropert(propertValue)

            path = path.replace(match[0],`/${value}`)
        }
        return path
    }
}