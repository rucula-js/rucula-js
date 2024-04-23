# Botões

## Propriedades

### type `string`
Tipo do Botão. `button` ou `link`

### target `string`
Identificador unico do botão. 
Os nomes `r-a-save`, `r-a-alter` e `r-a-delete` não devem ser usados. **Esses nomes são reservados para os botões já denifidos na Janela**.

### text `string`
Texto contido no botão

### icon `string`
Icone que complementa o botão. [Consulte](https://icons.getbootstrap.com/) 

### link `string`
uma URL

### color `string`
Cor de fundo do botão
 
## Exemplos

### button
```js
{
    icon: "bi bi-filetype-json",
    type: "button",
    target: "generate-object",
    text:"Gerar Representação "
}

```

### link

```js
{
    type: "link",
    target: "window-icons",
    text:"Icones ",
    link:"https://icons.getbootstrap.com"
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

