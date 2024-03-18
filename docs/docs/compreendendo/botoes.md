Os botões são construídos de duas formas no rucula-js, em primeira instancia os botões criados são botôes que fazem parte do contexto padrão do tipo do janela, também conhecidos como tipo padrão, depois existem os tipos especificos que podem ou não ser vinculados a `endPoint's` e são construidos de acordo com o gosto do freguês.

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

