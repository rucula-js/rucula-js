# Formulas

Existem situações em que é desejavel que o input do usuário tenha um comportamento mais eficaz para resolver determinados problemas, para isso, temos algumas formulas que toma conta de alguns comportamentos triviais durante o ciclo de vida da UI.

**Pontos Importantes**: A coluna sentido representa o local onde o resultado da formula será passado, `dentro` indica que o valor será passado para o próprio campo que contém a formula, `fora` indica que o valor passado será enviado para outro campo presenta da UI 

|Formula|Objetivo|Sentido|
|------|---------|----|
|`==objectDto.propert`|Para casos em que é necessário a obtenção de valor presente em um objeto especifico|dentro|
|`=LIN()`|Para frame do tipo `Line`, essa formula controla a contagem de linha para uma objeto array. Quando o argumento é vazio, a contagem é feita sempre da `ultima linha + 1`, exemplo:`1,2,3,4,5,6,7,8,9...`. Quando há argumento `=LIN(1000)`, o valor passado é utilizado como valor base para a contagem de linha. Exemplo: `1000,2000,3000,4000...`|dentro|
|`=MATH(propert1*propert2)`|faz a leitura das propriedades passadas e em seguida executa a expressão matematica|dentro|
|`=SUM(objectDto.propert)`|Criada exatamente para campos totalizadores, essa formula calcula o total para o campo em foco e envia para o campo totalizador|fora|

## Exemplo de utilização

```Json
        {
            "id": "78978",
            "propertDto": "total",
            "description": "total",
            "information": "",
            "type": "text",
            "maxLength": 20,
            "max": 0,
            "min": 0,
            "requerid": true,
            "disable": false,
            "sequence": 2,
            "formula":["=MATH(quantidade*preco)","=SUM(total.total)"]  
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

