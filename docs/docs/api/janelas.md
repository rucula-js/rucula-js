```js

export interface window{
    name:string;
    type:string;
    messageHome:string;
    iconHome:string;
    this:string;
    pathController:string;
    frames:Array<frame>
    columnsGrid:columnsGrid[]
    paramsGrid:string
    button:button[]
    joinChield:string[]
    endPoints:endPoint[]
}

```

|Propriedade|Tipo|Tefault|Descrição|
|-|-|-|-|
|`name`|`string`||Nome descritivo da janela|
|`type`|`string`|`crud`|Tipo da Janela|
|`messag[Title](../frames.md)eHome`|`string`||Mensagem de apresentação inicial|
|`iconHome`|`string`||Icone de apresentação inicial - **Icones válidos somente para bootstrap-icons**|
|`this`|`string`||objeto principal da janela|
|`pathController`|`string`||path URL que representa o caminho do end-point vinculado a janela - **Essa configuração serve como apoio nas criações das URL's**|
|`frames`|`Array`||Contém uma lista de frames que serão vinculados a janela|
|`columnsGrid`|`Array`||Configura as colunas que serão criadas no grid principal da janela|
|`paramsGrid`|`string`||Configura o path URL para as consutas provenientes dos eventos grid|
|`button`|`Array`||Guarda um array de botões que serão inputados na janela|
|`joinChield`|`Array`||Para Janelas mais complexas, força o relacionamento entre objetos pai e filho|
|`endPoints`|`Array`||Configura e faz intermédio entre os botões a rotina de consumo REST|

<br>

##### Itens Relacionados

##### Contribuidores

|Contribuidores|
|-|
|<a href="https://github.com/reginaldo-marinho"><img width="45px" height="45px" style="border-radius:30px" alt="reginalso-marinho" title="TheLarkInn" src="https://avatars.githubusercontent.com/u/60780631?v=4"></a>|

<a href="https://github.com/rucula-js/rucula-js">Contamos com a sua estrela 😀 - Visite o projeto rucula-js ⭐</a>

<div style="
    border: 2px solid #ff7906;
    border-radius: 8PX;
    padding: 8px;
    background-color: #ffeaea;
    ">
    <h5>Nos ajude a melhorar o rucula-js.</h5>
    Encontrou um erro? Tem alguma sugestão?  <a href="https://github.com/rucula-js/rucula-js/issues">Abra um novo problema</a><br>    
</div>

