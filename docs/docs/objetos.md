# Os Objetos

## Amarração dos Objetos

No rucula, todos os objetos são criados isoladamente um dos outros, isso facilita o desenvolvimento e manutenção da as propriedades que são criadas dinâmicamente. Além de facilitar no gerenciamento da obtenção e inserção de dados. Para que cada objeto filho fique dentro do seu respectivo pai, é necessário fazer a amarração entre objetos hierarquicamente, isso garante que quando um objeto filho for passado para seu pai, ele já tenha recebido seus possiveis filhos.

``` json
{
    "joinChield":[
        
          "ordem_de_servico.cliente",
          "cliente.endereco",
          "ordem_de_servico.itens_servico",
          "ordem_de_servico.tecnico_responsavel",
          "ordem_de_servico.pagamento"
    ]
}
```

No exemplo acima haveria um erro, porque a hierarquia não está sendo respeitada, no background o rucula lê o  array da forma em que ele foi especificado, logo, teriamos `ordem_de_servico:cliente` e quando `cliente:endereco` fosse informado, haveria um erro pois o rucula não iria encontrar o objeto cliente.

``` json
{
    "joinChield":[
      "cliente.endereco",
      "ordem_de_servico.cliente",
      "ordem_de_servico.itens_servico",
      "ordem_de_servico.tecnico_responsavel",
      "ordem_de_servico.pagamento"
    ],
}
```

Agora aqui não teria erro porque primero foi passado a instrução de que o objeto endereco deve ser atribuido ao cliente que por sua vez é atruido à order_de_servico

`order_de_servico:cliente:endereco`

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

