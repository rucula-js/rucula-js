export let loaderManagment = (() => {

    return {
        enable: function (){
            let loader = document.querySelector('.js-r-loader')
            loader?.classList.add('r-item-center')
        },
        disable: function (){

            let loader = document.querySelector('.js-r-loader')
            setTimeout(() => {
                loader?.classList.remove('r-item-center')
            },1000)
        }
    }
})()