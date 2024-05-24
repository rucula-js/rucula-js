# Popups

## Mensagens

### Métodos

#### sucess(options, callback)
##### options
```js
{
    text:string
    timeout?:number
    disableadFooter?:boolean
    disableadHeader?:boolean
}
```
##### callback
```js
() => {
    
}
```
##### Exemplo
```js
rucula.popup.message.sucess({
    text:"Item Excluido",timeout:2000
})   
```
#### warning(options, callback)
##### option
```js
{
    text:string
    timeout?:number
    disableadFooter?:boolean
    disableadHeader?:boolean
}
```
##### callback
```js
(yesNo) => {
    
}
```
##### Exemplo
```js
rucula.popup.message.warning({
    text:"O registro será excluido permanentemente, deseja continuar?"
},(yesNo) => {
    // TODO
})
```

#### info(options, callback)

```js
{
    text:string
    timeout?:number
    disableadFooter?:boolean
    disableadHeader?:boolean
}
```
##### callback
```js
(event) => {
    
}
```
##### Exemplo
```js
rucula.popup.message.info({
    text:"Registrando...", 
    timeout:500, 
    disableadFooter:true
})
```
#### error(options, callback)

##### option
```js
{
    text:string
    timeout?:number
    disableadFooter?:boolean
    disableadHeader?:boolean
}
```
##### callback
```js
(event) => {
    
}
```
#### Exemplo
```js
let erro = 'internal error'
rucula.popup.message.error({
    text:erro, 
    timeout:1300, 
    disableadFooter:true
});
```

> Nota: Com callbacks podemos fazer encadeamento de mensagens.

```js
rucula.popup.message.warning({
    text:"O registro será excluido permanentemente, deseja continuar?"
}, resultOption)

function resultOption(yesNo){
        
    if(yesNo){
        rucula.popup.message.info({
                text:"excluindo...", 
                timeout:500, 
                disableadFooter:true,
                disableadHeader:true
            },sucess);
        }
    }

    function sucess(){
        rucula.popup.message.sucess({
            text:"Item Excluido",timeout:2000
    })   
}
```

## Loader


### Métodos

#### disable()
```js
rucula.loader.disable()
```
#### enable()
```js
 rucula.loader.enable()
```