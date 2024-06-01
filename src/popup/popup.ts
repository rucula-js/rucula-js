import { constYesNo } from "../const"
import { callbackYesNo } from "./callback"

type config = {
    close?:boolean
    icon?:string
    title?:string
    text?:string
    footer?:string
    disableadFooter?:boolean
    disableadHeader?:boolean
    htmlBody?:HTMLElement
    timeout?:number

}

type configCommon = {
    text?:string,
    htmlBody?:HTMLElement
    timeout?:number
    disableadFooter?:boolean
    disableadHeader?:boolean
}

export let popup = (() => {

    let boxShow:HTMLElement
    
    function boxShowAppendChield(element:HTMLElement){
        boxShow = document.querySelector('.r-box-show') as HTMLElement
        boxShow.appendChild(element)
        boxShow.classList.add('r-box-show-center')
    }

    function messageElement(config:config){
                
        let message = document.createElement('div')
        message.classList.add('r-message')

        message.innerHTML = `
            <div class="r-message-header">
                <div class="r-message-header-icon">
                    <i class="bi ${config.icon}"></i>
                </div>   
                <div class="r-message-header-title">
                    ${config.title}
                </div>
            </div>
            
            <div class="r-message-content">
                <div class="r-message-content-text">
                    ${config.text}
                </div>
            </div>
            <div class="r-message-footer">
                ${config.footer}
            </div>`
        
        if(config?.disableadHeader){
            let header = message.querySelector('.r-message-header')
            header?.remove()
        }

        if(config?.disableadFooter){
            let footer = message.querySelector('.r-message-footer')
            footer?.remove()
        }
        
        if(config?.htmlBody){
            let messageContent = message.querySelector('.r-message-content')
            messageContent?.appendChild(config?.htmlBody)
        }

        return message
    }
    
    function closeTimeout(div:HTMLElement,timeout:number,callback?:callbackYesNo){

        setTimeout(() => {
            
            div.remove()
            close()
            
            if(callback){
                callback()
            }
        }, 
        timeout)   
    }

    function closeOKOrCancel(callback:any, div:HTMLElement){
        
        
        let ok = div.querySelector('button.ok')
        let cancel = div.querySelector('button.cancel')

        ok?.addEventListener('click',()=> {
            
            div.remove()
            close()

            if(callback){
                callback(constYesNo.YES)
            }
            
        })

        cancel?.addEventListener('click',()=> {
            
            div.remove()
            close()

            if(callback){
                callback(constYesNo.NO)
            }

        })
    }

    function close(){
        boxShow.classList.remove('r-box-show-center')
    }

    return {
        messsage: {
            
            info: function (config: configCommon, callback?:callbackYesNo){

                let info = messageElement({
                    icon:"bi-info-circle color-darkgrey",
                    title:"Informação",
                    text:config.text,
                    footer: 
                    `<div class="r-message-footer">
                        <div class="cancel-ok">
                            <button class="ok">OK</button>        
                        </div>
                    </div>`,
                    disableadFooter: config.disableadFooter,
                    disableadHeader: config.disableadHeader,
                    htmlBody:config.htmlBody
                });
                
                if(config?.timeout){
                    closeTimeout(info,config.timeout,callback)
                }

                closeOKOrCancel(callback, info)

                boxShowAppendChield(info)
            },

            sucess: function (config: configCommon, callback?:callbackYesNo){

                let sucess = messageElement({
                    icon:"bi-check2-circle color-green",
                    title:"Sucesso",
                    text:config.text,
                    footer: 
                    `<div class="r-message-footer">
                        <div class="cancel-ok">
                            <button class="ok">OK</button>        
                        </div>
                    </div>`,
                    disableadFooter: config.disableadFooter
                });
                
                closeOKOrCancel(callback, sucess)

                if(config.timeout){
                    closeTimeout(sucess,config.timeout)
                }

                boxShowAppendChield(sucess)
            },

            warning: function (config: configCommon, callback?:callbackYesNo){

                let warning = messageElement({
                    icon:"bi-exclamation-triangle color-orange",
                    title:"Atenção",
                    text:config.text,
                    footer: 
                    `<div class="r-message-footer">
                        <div class="cancel-ok">
                            <button class="ok">OK</button>
                            <button class="cancel">Cancel</button>
                        </div>    
                    </div>`,
                    disableadFooter: config.disableadFooter
                });
                
                closeOKOrCancel(callback, warning)

                if(config.timeout){
                    closeTimeout(warning,config.timeout)
                }

                boxShowAppendChield(warning)
            },
            
            error: function (config: configCommon, callback?:callbackYesNo){

                let warning = messageElement({
                    icon:"bi-x-circle color-red",
                    title:"Erro",
                    text:config.text,
                    footer: 
                    `<div class="r-message-footer">
                        <div class="cancel-ok">
                            <button class="ok">OK</button>        
                        </div>    
                    </div>`,
                    disableadFooter: config.disableadFooter
                });
                
                closeOKOrCancel(callback, warning)

                if(config.timeout){
                    closeTimeout(warning,config.timeout)
                }

                boxShowAppendChield(warning)
            },
        }
    }
})()