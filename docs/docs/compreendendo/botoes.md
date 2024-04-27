Os botões são construídos de duas formas no rucula-js, em primeira instancia os botões criados são botôes que fazem parte do contexto padrão do tipo do janela, também conhecidos como tipo padrão, depois existem os tipos especificos que são construidos de acordo com o gosto do freguês.

## Os botões Padrão do Tipo `crud`

Quando iniciado uma janela, por padrão são criados os botões:

- `create` `c`
- `alter`  `u`
- `delete` `d`

Se desejado, pode haver opção de não criação do botão, para isso a propriedade `crud` pode ser usada.

> Por padrão essa opção não é informada e todos os botões são criados


Para criar somente o que é desejado, podemos usar a propriedade `crud` de seguinte forma

- `crud:"cud"`,`crud:"crud"` ou omissão - Cria todos
- `crud:"c"` - `create`
- `crud:"u"` - `update`
- `crud:"dc"`- `create` e `delete` 
- `crud:"d"` - `create` e `update`
- `crud:"d"` - `delete` e `update`

### Onde seria  Útil?
Pode haver casos em que por exemplo seja parte da regra somente a criação de registro e que nunca devem ser alterados ou excluidos, nesse caso a opção `crud:"u"` resolveria o problema.

## Os Códigos Reservados
Para cada opção crud padrão, existe também uma identificação unica `target`. Esses nomes não devem ser usados em botões que não façam referencia a outras propostas de botões.

- `r-a-save`
- `r-a-alter`
- `r-a-delete`


## Seus Eventos
Para escutar os eventos dos botões você pode fazer isso por meio do `getElementById.addEventLsitener('click',() => {})` ou chamar os eventos especificos do rucula `addEventLsitener('button.target+.+click')`.

Os eventos especificos do rucula é mais indicado porque nele temos o objeto que retorna a URL do ambiente atual e o objeto que possívelmente usariamos. 

### Objeto

```js
{
    target:"r-a-save"|"r-a-alter"|"r-a-delete"|""
    URL:{
        absolute:string
        relative:string
        params:string
    },
    body:string
}
```

### Exemplos
`r-a-save.click`
`r-a-alter.click`
`r-a-delete.click`
`others.click`

**Para saber mais sobre as URL's consulte [URL's](./urls.md)**