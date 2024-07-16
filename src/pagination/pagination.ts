import { constPagination } from "../const";
import { windowBaseDOM } from "../elements/window-base/WindowBase";

export let pagination  = (function () {

    return {
        init: function (yesNo:boolean = true){
            
            if(yesNo == false){
                return
            }

            let wGrid = document.getElementById('w-grid')

            const divElement = document.createElement('div');
        
            divElement.className = 'r-act-grid-footer';
            
            divElement.innerHTML = 
                `<div class="r-act-grid-footer">
                    <div>
                        <span>N. Linha</span>
                        <select id="${constPagination.ROW_NUMBER}" name="len-page">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="1000">1000</option>
                        </select>
                    </div>
                    <div>
                        <button id="${constPagination.FIRST}" class="r-a-b"><i class="bi bi-arrow-up"></i></button>
                        <button id="${constPagination.LAST}" class="r-a-b"><i class="bi bi-arrow-down"></i></button>
                        <button id="${constPagination.PREVIOUS}" class="r-a-b"><i class="bi bi-arrow-left"></i></button>
                        <button id="${constPagination.NEXT}" class="r-a-b"><i class="bi bi-arrow-right"></i></button>
                    </div>
                </div>`
                
                wGrid?.appendChild(divElement)
                setEvents()
        }
    }

    function setEvents(){
        let pagination = {
            detail: {
              page: ''
            }
        };

        let event = new CustomEvent('r-pagination', pagination)

        document.getElementById(constPagination.FIRST)?.addEventListener('click',() => dispatchEvent('first'))
        document.getElementById(constPagination.LAST)?.addEventListener('click',() => dispatchEvent('last'))
        document.getElementById(constPagination.PREVIOUS)?.addEventListener('click',() => dispatchEvent('previous'))
        document.getElementById(constPagination.NEXT)?.addEventListener('click',() => dispatchEvent('next'))

        let elementRoot = windowBaseDOM.getElementRoot() 

        function dispatchEvent(page:string){

            pagination.detail.page = page 
            elementRoot.dispatchEvent(event);
        }      
    }
})