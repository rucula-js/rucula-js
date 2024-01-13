
Os fields representam a entrada do usuário, eles podem ser do tipo caixa de texto, os famosos `textbox`, ou quaisquer outras representações gráficas, como `checkbox`, `combobox` e/ou `radio`, entre outras que possam vir a ser criadas. Os tipos atuais de fiels são:

- text
- number
- [select:xxxx]
- [checkbox:xxxx]
- date
- currency
- textarea
- bool
- [radio:xxxx]
- password


**No rucula-js ao configurarmos o tipo de field devemos estar ciente de que o tipo de entrada do campo não necessáriamente será o tipo de saída que será usado no objeto em construção, isso porque o tipo de entrada em formatos mais complexos como um `checkbox`, `combobox` ou `radio` não indica o tipo ideal do campo. Para que isso sejá resolvido, o rucula-js tem seus tipos de entradas e saídas para os tipos complexos.**


### Configurando os Tipos 

A configuração de tipo requer duas sintaxe diferentes, em primerio lugar utilizamos a sintaxe de tipo `string`, observe: `type: 'text'`, essa sintaxe é normalmente utilizadas quando não o field não representa um tipo de entrada que difere do tipo de saída, como são nos casos citados acima. Em segundo lugar, utilizamos a sintaxe de tipo `string[2]` para representar os tipos mais complexos: `type: ['checkbox','bool']`.

Configurando um field do tipo simples
```json
{
    "propertDto": "nome",
    "description": "Nome",
    "maxLength": 80,
    "type":"text"
}
``` 
> **Nota:** Se não especificado o tipo do field, o rucula-js utilizará o tipo  `text` como valor default.

Configurando um field do tipo complexo

```json
{
    "propertDto": "status",
    "description": "Status",
    "type": ["checkbox","bool"],
    "checkbox": {
    "on": true,
    "off": false
    },
    "groupFormat":"right",
    "value": false
}
```

>**Observe que o tipo complexo ["checkbox","bool"] também trouxe consigo uma propriedade especifica `checkbox`**


## Melhorando o Grupo do Field com `groupFormat`

`groupFormat` é a propriedade resposável por manipular o label e o field que é criado em tela, ele indica o posicionamento do label em relação ao componente que será criado. **Por padrão o  label é criado em cima do component desejado**, mas essa opção pode mudar se especificado `down`, `left` ou `rigth`.

>**Não esqueça de testar todos os casos**

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

