O layout é quem define o comportamento do `frames` dentro da janela em foco, nele é configurado o tamanho e a precisão de cada tamanho de `frame` em relação a `janela`.

Para facilitar o desenvolvimento e o entendimento, o layout foi construido baseado nos conceitos do [grid css](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_grid_layout/Basic_concepts_of_grid_layout).

![](https://www.w3schools.com/css/grid_lines.png)

```json
"layout":{
    "items":
    [
      ["ordemDeServico","ordemDeServico","pagamento"],
      ["cliente","endereco","pagamento"],
      ["itensServico","itensServico","pagamento"],
      ["itensServico","itensServico","tecnicoResponsavel"]
    ]
   }
```

Como visto àcima, o layout é composto por uma propriedade `ìtems[[]]` que contém um array de array, cada item da linha é representada pelo nome do `propertDto` presente em um determinado frame.

>> **Importante:** Todas as linhas criadas dever ter o mesmo tamanho, isso garante que o layout não saia com possíveis anomalias.

```json
    [
      ["ordemDeServico","ordemDeServico",""],
      ["","pagamento","pagamento"],
      ["cliente","cliente","pagamento"],
      ["cliente","cliente","endereco"],
      ["cliente","cliente","endereco"],
      ["itensServico","itensServico","pagamento"],
      ["itensServico","itensServico","tecnicoResponsavel"]
    ]
```