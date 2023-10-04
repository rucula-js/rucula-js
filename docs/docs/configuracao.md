# Configuração

Atualmente o rucula-js está disponivel via pacote NPM

`npm i @reginaldo-marinho/rucula-js` ou `npm install @reginaldo-marinho/rucula-js`

certifique-se de ter o elemento pai que será usado pela sua janela

```html
<div id="rucula-js">
</div>
```

importe as funções `initGlobalConfiguration` e `createWindow`

```ts
import { initGlobalConfiguration } from "./src/global/GlobalConfig"
import { createWindow } from "./src/window/WindowFactory"
```

e chame-as no seu cliente

```ts
let janela:any = {}; // Configurações da Janela
let configuracaoGlobal:any = {}; // Configurações globais

initGlobalConfiguration(configuracaoGlobal)
createWindow(janela,"rucula-js")   
```

para a devida estilização, o css pode ser obtido em `./public/style.css`, caso queira saber mais sobre os estilos rucula-ls, acesse [Guia do Desenvolvedo/Estilo](./style.md).
