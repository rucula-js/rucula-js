import { createUrl } from "../Helpers/UrlHelper"
import { ax } from "../axios/Axios"
import { constIdBaseWindow, eventRucula } from "../const"
import { endPoint } from "../entities/form/endPoint"
import { managmentObject } from "../object/ObjectManagment"

export let httpManagment = (() => {

    let initialized = false
    let endPoints:endPoint[] = []
    
    function getEndPoint(name:string){
        let result =endPoints.find(c=> c.name == name)

        if(result == null){
            throw new Error("endPoints not exist");   
        }
        
        return result
    }

    function getBody(alias:string = "", line?:number){
     
        if(alias == ""){
            return managmentObject.object.object.objectFull()
        }

        if(line) {
            return managmentObject.object.object.objectUniqueLine(alias, line)
        }

        return managmentObject.object.object.objectUnique(alias)
    }

    return {
        
        init:(points:endPoint[]) => {
            
            if(initialized){
                throw new Error("endPoints already initialized");                
            }
            endPoints = points
            initialized = true
        },
        
        request:(name:string) => {
            
            let endPoint = getEndPoint(name)

            let url = createUrl(endPoint)

            let body = getBody(endPoint.body)

            let rucula = document.getElementById(constIdBaseWindow.FORM_RUCULA_JS)
                rucula?.dispatchEvent(eventRucula.EVENT_BEFORE_SEND_OBJECT_HTTP)
                
                ax({method:endPoint.method,url:url,data:body})
                .then(obj => {
                    rucula?.dispatchEvent(eventRucula.EVENT_SEND_OBJECT_HTTP_OK)    
                    rucula?.dispatchEvent(eventRucula.EVENT_AFTER_SEND_OBJECT_HTTP)    
                })
                .catch(obj => {
                    rucula?.dispatchEvent(eventRucula.EVENT_SEND_OBJECT_HTTP_ERROR)    
                    rucula?.dispatchEvent(eventRucula.EVENT_AFTER_SEND_OBJECT_HTTP)      
                })
        }
    } 
})()