import {tableDependency}  from '../table-dependency/TableDependency';
import { managmentObject } from '../object/ObjectManagment';
    
export let consolePanelManagment = (()=>{

    const PANEL_CONSOLE = `
    <div class="r-box-show" id="panel-console">
        <div class="panel">
            <span>🔴 🟡 🟢</span>  
            <button class="r-a-b btn-close"><i class="bi bi-x-lg"></i></button>  
        <div>
        </div>
            <div class="content-panel">
                <div id="content-panel">
                </div>
            </div>
        </div>    
    </div>`
    
    function getPainelContent(){
        return document.getElementById('content-panel')
    }

    function openPanel(){
        let panelConsole = document.getElementById('panel-console')!
        panelConsole.style.display = 'block'
    }

    function closePanel(){
        let panelConsole = document.getElementById('panel-console')!
        panelConsole.style.display = 'none'
    }

    return {

        createPanel: function():HTMLDivElement{
            const div = document.createElement('div');
            div.innerHTML = PANEL_CONSOLE;

            let btnClose = div.querySelector('.btn-close')!

            btnClose.addEventListener('click',() => {
                closePanel()
            })

            return div;
        },
        outputDependencies: function(){
            openPanel()
            let dependecies = tableDependency.getDependenciesNotResolded()
            let output ='<br>'; 
            output += '<h2>Dependências não Resolvidas</h2>';
            output+='<br>'
            
            dependecies.forEach(c => { 
                c.fieldsNotResolved.forEach(dep => {
        
                    if(c.isHibernate){
                        output+=`<div style="color: orange;">${dep}</div>`
                    }
                    if(c.isHibernate == false){
                        output+=`<div style="color: green;">${dep}</div>`
                    }
                })
            })
        
        
            let contentPanel = getPainelContent()
            if(contentPanel){
                contentPanel.innerHTML = output
            }
        },
        outputGetObject: function(){
            openPanel()
            let output ='<br>'; 
            output += '<h2>Objeto Atual</h2>';
                output+=`<div style="margin-top:10px;">${JSON.stringify(managmentObject.object.object.objectFull())}</div>`

            let contentPanel = getPainelContent()
            if(contentPanel){
                contentPanel.innerHTML = output
            }
        }   
    }
})()