export let loaderManagment = (() => {

    let loaderBkp:HTMLDivElement = document.createElement('div')

    let loaderElement = document.createElement('div');
    loaderElement.classList.add('r-loader')
    loaderElement.classList.add('js-r-loader')
    loaderElement.classList.add('r-item-center')

    let boxShow:HTMLDivElement

    return {
        enable: function (){
            boxShow = document.getElementById('r-box-show') as HTMLDivElement
            boxShow?.classList.add('r-box-show-center')
            boxShow?.appendChild(loaderElement)
        
        },
        disable: function (){            

            let loader = document.querySelector('.js-r-loader') as HTMLDivElement
            
            setTimeout(() => {
                loaderBkp.appendChild(loader)
                boxShow?.classList.remove('r-box-show-center')
            },1000)
        }
    }
})()