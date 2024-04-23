# Window

## Propriedades

### name `string`
Nome descritivo da janela

### type `string`
Tipo da Janela`crud`

### crud `string`
informa quais botões Defalt estarão disponiveis

### grid  `boolean`
Indica de a caixa a esquerda estará disponivel

### messageHome `string`
Mensagem de apresentação inicial

### iconHome `string`
Icone de apresentação inicial

### pathController `string`
path URL que representa o caminho do end-point vinculado a janela - **Essa configuração serve como apoio nas criações das URL's**

### layout  `cssGrid`
Configura a disposição dos frames dentro da janela

```js
type cssGrid = {
    items:[[]],
    tamplateColumns:number
    tamplateRow:number
}
```

### frames `frame[]`
[Consulte](./frames.md)

### button `button[]`
[Consulte](./botoes.md)

## Exemplos

```js
{
    name: "Exemplo de Janela",
    pathController: "/Exemplo",
    type: "crud",
    messageHome: "Ordem de Serviço",
    iconHome: "bi-rocket-takeoff",
    crud: "crud",
    grid: true,
    frames: [],
    layout: [],
    button: []
}
```
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

