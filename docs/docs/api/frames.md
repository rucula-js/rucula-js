```js
export interface frame{
    name: string,
    type: string,
    objectDto: string,
    vertical:boolean
    sequence:number
    fields?:Array<field>
    line?:Array<line>
}
```

|Propriedade|Tipo|Tefault|Descrição|
|-|-|-|-|
|`name`|`string`||Nome descritivo do frame|
|`type`|`string`|`block`|tipo do frame|
|`objectDto`|`string`||nome do objeto que será representado pelo frame|
|`vertical`|`string`|`true`|Inidica o sentido em que os grupos de inputs serão criados|
|`sequence`|`number`||Ajuda na ordenação dos frames|
|`fields`|`Array`||Configuração dos campos - Para frame do tipo `block` |
|`line`|`Array`||Configuração dos campos - Para frame do tipo `line` |

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


