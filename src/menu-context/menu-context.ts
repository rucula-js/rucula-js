import { contextMenu } from "../const"
import { button } from "../entities/form/button"

export let menuContext = (() => {
        
    let menusContext:{id:string,element:HTMLDivElement}[] = []
    let elemetInFocu: HTMLElement

    function createMenuContext(id:string){
        
        let div = document.createElement('div')
        div.classList.add('context-menu')
        div.setAttribute('id',id)

        let ol = document.createElement('ol')

        div.appendChild(ol)

        menusContext.push({id:id,element:div})
 
        return div
    }

    function findMenu(id:string){

        let menu = menusContext.find(c=> c.id == contextMenu.INPUT)!

        return menu.element

    }

    function addItem(idMenuContext:string, buttonConfig:button){

        let menu = findMenu(idMenuContext).querySelector('ol')!

        var li = document.createElement('li')
        var button = document.createElement('button')
        button.classList.add('r-b-i') 
        button.setAttribute('id',buttonConfig.target)
        button.textContent = buttonConfig.text!


        li.appendChild(button)
        menu.appendChild(li)
    }

    function menuContextInput(){
        
        let detailsInput:button =  {
            target:'input-check-details',
            text: 'detalhe do campo',
            type:'button',
        }

        let menu = createMenuContext(contextMenu.INPUT)
        addItem(contextMenu.INPUT,detailsInput )

        return menu

    }

    return {
       
        init:function (){
            let menuInput = menuContextInput()
            let rw = document.querySelector('.r-w')

            rw?.appendChild(menuInput)
            rw?.addEventListener('contextmenu', (event:any) => {
                
                event.preventDefault()
                let target = event.target as HTMLElement
                elemetInFocu = target

                if(target.classList.contains('r-q-b') || target.classList.contains('r-q-l')){
                    return
                }
                
                if(target.classList.contains('r-head')){
                    
                }

                if(target.classList.contains('r-vertical-actions')){
                    
                }

                if(target.nodeName == 'INPUT' || target.nodeName == 'SELECT' || target.nodeName == 'TEXTAREA'){
                    let menuActions = findMenu(contextMenu.INPUT)
                    menuActions.style.display = 'block';
                    menuActions.style.left = `${event.pageX}px`;
                    menuActions.style.top = `${event.pageY}px`;
                }
            })

            document.addEventListener('click', function(event) {
                
                if (event.button !== 2) {
                    let menuInput = findMenu(contextMenu.INPUT);
                    menuInput.style.display = 'none'
                    //todo Inplementar menus frame e header
                }
            });
        },

        elemetInFocu:function(){
            return elemetInFocu
        }
    }
    })()