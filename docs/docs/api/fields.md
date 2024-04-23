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