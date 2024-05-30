---
title: Rucula
summary: Primeira Apresentação do rucula-js
authors:
  - Reginaldo Marinho
date: 2023-09-15
---

<p align="center">
  <img src="https://raw.githubusercontent.com/reginaldo-marinho/rucula-js/b76e809a44a66de3733e30388e29d672c8b61011/docs/assets/rucula.svg" style="width:200px">
</p>

## **Um gerador de interface baseado em formulário que cria e gerencia todos os pontos necessários da sua interface.** 

Com o rucula-js você

<details>
  <summary>Cria uma tela com poucas linhas de código</summary>
  <code>
    <pre>
  {
      "name":"Exemplo Rucula",
      "pathController":"",
      "type":"crud",
      "crud":"",
      "messageHome":"Olá",
      "grid":false,
      "frames":[
          {
            "name":"Exemplo Frame",
            "objectDto":"exemploFrame",
            "alias":"aliasFrame",
            "fields":[
                {
                  "propertDto":"mensagem",
                  "description":"mensagem"
                }
              ]
          }
      ]
    }
    </pre>
  </code>
</details>

<details>
  <summary>Gerencia eventos</summary>
  <code>
    <pre>
    rucula.event.on('click',(e)=> {
    },'#get-cep')
    </pre>
  </code>
  <code>
    <pre>
    rucula.event.on('r-a-save',(e)=> {
    })
    </pre>
  </code>
</details>

<details>
  <summary>Utiliza loaders</summary>
  <code>
    <pre>
        rucula.loader.enable()
        rucula.loader.disable()
    </pre>
  </code>
</details>

<details>
  <summary>Trabalha com alerts</summary>
  <code>
    <pre>
       rucula.popup.messsage.info({
          text:"excluindo...", 
          timeout:500, 
          disableadFooter:true,
          disableadHeader:true
      },sucess)
    </pre>
  </code>
</details>

<details>
  <summary>Insere ou obtém informações de inputs respeitando as depêndencias controladas</summary>
  <code>
    <pre>
      rucula.object.getValue('alias.propertDto')
      rucula.object.setValue('alias.propertDto', 'valor')
    </pre>
  </code>
</details>
<br>

## **Entre outras coisas, como**:

- Inputs
- Frames
- Botões
- Temas
- Layout
- Responsividade


> **Além das possiveis coisas que podemos fazer com o rucula-js, por baixo dos panos existem duas rotinas importantes conhecidas como tabela de depêndencia e o criador de objetos**.

## Instalação

### CDN
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rucula-js/rucula-js/dist/style/style.css"/>
```
```js
import {Rucula} from 'https://cdn.jsdelivr.net/gh/rucula-jsrucula-js/dist/rucula.js'
```

### NPM
```js
npm i @reginaldo-marinho/rucula-js` ou `npm install @reginaldo-marinho/rucula-js`
```

## Exemplos

0. hello world
    - [Código](https://github.com/rucula-js/rucula-js/blob/main/docs/docs/exemples/hello-world.html)
    - [Ao Vivo](https://rucula-js.github.io/exemples/hello-world.html)

0. Via Cep
    - [Código](https://github.com/rucula-js/rucula-js/blob/main/docs/docs/exemples/via-cep.html)
    - [Ao Vivo](https://rucula-js.github.io/exemples/via-cep.html)


0. Ordem de Serviço
    - [Código](https://github.com/rucula-js/rucula-js/blob/main/docs/docs/exemples/ordem-servico.html)
    - [Ao Vivo](https://rucula-js.github.io/exemples/ordem-servico.html)


##### Contribuidores

<br>

##### Itens Relacionados

<a href="https://github.com/rucula-js/rucula-js">⭐ Visite o projeto rucula-js ⭐</a>

<div class="rucula-info">
    <h5>Nos ajude a melhorar o rucula-js.</h5>
    Encontrou um erro? Tem alguma sugestão?  <a href="https://github.com/rucula-js/rucula-js/issues">Abra um novo problema</a><br>    
</div>

##### Contribuidores

|Contribuidores|
|-|
|<a href="https://github.com/reginaldo-marinho"><img width="45px" height="45px" style="border-radius:30px" alt="reginalso-marinho" title="TheLarkInn" src="https://avatars.githubusercontent.com/u/60780631?v=4"></a>|

