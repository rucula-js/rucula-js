type config = {
    close?:boolean
    icon?:string
    title?:string
    text?:string
    footer?:string
    disableadFooter?:boolean
    timeout?:number

}

type configCommon = {
    text:string
    timeout?:number
    disableadFooter?:boolean
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
        
        message.innerHTML = `
        <div class="r-message">
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
            </div>
        </div>
        `
        if(config?.disableadFooter){
            let footer = message.querySelector('.r-message-footer')
            footer?.classList.add("r-display-none")
        }

        return message
    }
    

    function closeTimeout(div:HTMLElement,timeout:number){

        setTimeout(() => {
            div.remove()
            close()
        }, 
        timeout)   
    }

    function closeOKOrCancel(div:HTMLElement){
        
        let ok = div.querySelector('button.ok')
        let cancel = div.querySelector('button.cancel')

        ok?.addEventListener('click',()=> {
            div.remove()
            close()
        })
        cancel?.addEventListener('click',()=> {
            div.remove()
            close()
        })
    }

    function close(){
        boxShow.classList.remove('r-box-show-center')
    }

    return {
        messsage: {
            
            info: function (config: configCommon){

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
                    disableadFooter: config.disableadFooter


                });
                
                closeOKOrCancel(info)

                if(config.timeout){
                    closeTimeout(info,config.timeout)
                }

                boxShowAppendChield(info)
            },

            sucess: function (config: configCommon){

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
                
                closeOKOrCancel(sucess)

                if(config.timeout){
                    closeTimeout(sucess,config.timeout)
                }

                boxShowAppendChield(sucess)
            },

            warning: function (config: configCommon){

                let warning = messageElement({
                    icon:"bi-exclamation-triangle color-orange",
                    title:"Atenção",
                    text:config.text,
                    footer: 
                    `<div class="r-message-footer">
                        <div class="cancel-ok">
                            <button class="ok">OK</button>        
                        </div>    
                    </div>`,
                    disableadFooter: config.disableadFooter
                });
                
                closeOKOrCancel(warning)

                if(config.timeout){
                    closeTimeout(warning,config.timeout)
                }

                boxShowAppendChield(warning)
            },
            error: function (config: configCommon){

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
                
                closeOKOrCancel(warning)

                if(config.timeout){
                    closeTimeout(warning,config.timeout)
                }

                boxShowAppendChield(warning)
            },
        }
    }
})()