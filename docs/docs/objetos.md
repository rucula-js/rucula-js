# Os Objetos

## Amarração dos Objetos

No rucula, todos os objetos são criados isoladamente um dos outros, isso facilita o desenvolvimento e manutenção da ferramenta, além de facilitar no gerenciamento da obtenção e inserção de dados. Para que cada objeto filho fique dentro do seu respectivo pai, é necessário fazer a amarração entre objetos hierarquicamente, isso garante que quando um objeto filho for passado para seu pai, ele já tenha recebido seus possiveis filhos.

``` json
{
    "joinChield":[
        {
          "key":"ordem_de_servico",
          "value":"cliente"
       },
       {
          "key":"cliente",
          "value":"endereco"
       },
       {
          "key":"ordem_de_servico",
          "value":"itens_servico"
       },
       {
          "key":"ordem_de_servico",
          "value":"tecnico_responsavel"
       },
       {
          "key":"ordem_de_servico",
          "value":"pagamento"
       }
    ],
}
```

No exemplo acima haveria um erro, porque a hierarquia não está sendo respeitada, no backgroup o rucula lê o  array da forma em que ele foi especificado, logo, teriamos `ordem_de_servico:cliente` e quando `cliente:endereco` fosse informado, haveria um erro pois o rucula não iria encontrar o objeto cliente.

``` json
{
    "joinChield":[
       {
          "key":"cliente",
          "value":"endereco"
       },
       {
          "key":"ordem_de_servico",
          "value":"cliente"
       },
       {
          "key":"ordem_de_servico",
          "value":"itens_servico"
       },
       {
          "key":"ordem_de_servico",
          "value":"tecnico_responsavel"
       },
       {
          "key":"ordem_de_servico",
          "value":"pagamento"
       }
    ],
}
```

Agora aqui não teria erro porque primero foi passado a instrução de que o objeto endereco deve ser atribuido ao cliente que por sua vez é atruido à order_de_servico

`order_de_servico:cliente:endereco`
