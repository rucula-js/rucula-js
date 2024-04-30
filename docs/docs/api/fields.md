# Fields

## Popriedades

### description `string` `requerid`
Descrição do Campo

### identity `internal`

### type  `string|string[2]`

Especifica o tipo do Campo

- `text`   
- `number` 
- `bool` 
- `date`
- `currency`
- [`select`, `type Return`]
- [`checkbox`, `type Return`]
- `textarea`
- [`radio`, `type Return`]
- `password`

Default `text`


### textarea  `textarea` `requerid`
Complemento ao tipo `textarea`
```js
interface textarea {
    rows:number
    cols:number
}
```


### textarea  `checkbox` `requerid`
Complemento ao tipo `checkbox`
```js
interface checkbox {
    on:string,
    off:string,
}
```

### combo  `string[]` `requerid`
Complemento ao tipo `select`
```js
[
    {
        representation:"crud",
        value:"crud"
    },
    {
        representation:"grid",
        value:"grid"
    }
]
```
### maxLength `number`
Tamamho máximo de caracteres

### max `number`
Máximo em numero


### max `number`
Minimo em numero

### requerid `boolean`
Obrigatório

### disable `boolean`
Desabilitado

### propertDto `string`
Nome da propriedade que o campo representa

### width `number`
Largura do campo

### groupFormat `string`
Formato do grupo do campo criado

### value `any`
Valor inicial do campo

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
