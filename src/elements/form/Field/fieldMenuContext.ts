import { contextMenu } from "../../../const"
import { field } from "../../../entities/form/field"
import { menuContext } from "../../../menu-context/menu-context"
import { popup } from "../../../popup/popup"

export let fieldMenuContext = (() => {

    let fieldsInfo: { identity: string, field: field }[] = []
    
    let lastDetail:HTMLElement

    return {
        init: function () {

            let menuOInput = document.getElementById(contextMenu.INPUT)

            
            menuOInput?.addEventListener('click', () => {
                
                if(lastDetail){
                    lastDetail.remove()
                }
                let ol = document.createElement('ol')

                lastDetail = ol

                let identity = menuContext.elemetInFocu().getAttribute('identity') as string

                let field = fieldMenuContext.info.get(identity)?.field

                let details = `  
                <table>
                    <tr>
                        <td>Descrição</td>
                        <td>${field?.description ?? ''}</td>
                    </tr>
                    <tr>
                        <td>Propriedade</td>
                        <td>${field?.propertDto}</td>
                    </tr>
                    <tr>
                        <td>Obrigatório</td>
                        <td><input type="checkbox" ${(field?.requerid ?? false) == true ? 'checked' : ''} disabled/></td>
                    </tr>
                    <tr>
                        <td>Desabilitado</td>
                        <td><input type="checkbox" ${(field?.disable ?? false) == true ? 'checked' : ''} disabled/></td>
                    </tr>
                    <tr>
                        <td>Máximo</td>
                        <td>${field?.max ?? 0}</td>
                    </tr>
                    <tr>
                        <td>Minimo</td>
                        <td>${field?.min ?? 0}</td>
                    </tr>
                    <tr>
                        <td>Comprimento</td>
                        <td>${field?.maxLength ?? 0}</td>
                    </tr>
                    <tr>
                        <td>Informação</td>
                        <td>${field?.information ?? ''}</td>
                    </tr>
              </table>
            `             
                ol.innerHTML = details

                popup.messsage.info({
                    text:'Detalhamento',
                    htmlBody: ol
                })
            })
        },
        info: {

            set: function (fieldInfo: { identity: string, field: field }) {
                fieldsInfo.push(fieldInfo)
            },

            get: function (identity: string) {
                return fieldsInfo.find(c => c.identity == identity)
            }
        }
    }
})()