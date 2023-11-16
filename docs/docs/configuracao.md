# Configuração

Atualmente o rucula-js está dísponivel via NPM

`npm i @reginaldo-marinho/rucula-js` ou `npm install @reginaldo-marinho/rucula-js`

certifique-se de ter o elemento pai que será usado pela sua janela

```html
<div id="rucula-js">
</div>
```

importe as funções `initGlobalConfiguration` e a classe `Rucula`

```ts
import { initGlobalConfiguration } from "./src/global/GlobalConfig"
import { Rucula } from "./src/Rucula"
```

e chame-as no seu cliente

```ts
let janela:any = {}; // Configurações da Janela
let configuracaoGlobal:any = {}; // Configurações globais

initGlobalConfiguration(configuracaoGlobal)
let rucula = new Rucula(input as any,"js");
```

Para a devida estilização, o css pode ser obtido em `./public/style.css`, caso queira saber mais sobre os estilos rucula-ls, acesse [Guia do Desenvolvedo/Estilo](./style.md).

|Contribuidores|
|-|
|<a href="https://github.com/reginaldo-marinho"><img width="45px" height="45px" style="border-radius:30px" alt="reginalso-marinho" title="TheLarkInn" src="https://avatars.githubusercontent.com/u/60780631?v=4"></a>|
