# Configurações de Campos

As configurações de campos representam o tipo gráfico de componente que será criado e também, para alguns casos, a representação de do tipo saída. Os tipos de saída é a configuração para casos em que a representação gráfica é diferente de uma caixa de texto normal, campos do tipo 'checkbox', 'radio' e 'select', que tem representações que representam um tipo, mas que durante sua resolução, o tipo deve ser convertido para um caso especial.

## Os Tipos

O rucula-js presta suporte para uma quantidade de compontes gráficos e tipos, na maioria dos casos os inputs do tipo `text` resolverão o problema, entretanto, haverá cenarios, onde outro tipo seja mais conveniente.

### Configurando os Tipos com as Duas Formais Possíveis

A configuração de tipo requer duas sintaxe diferentes, em primerio lugar utilizamos a sintaxe de tipo `string`, observe: `type: 'text'`. Em segundo lugar, utilizamos a sintaxe de tipo `string[2]`, isso significa que o tipo passado será um array com duas casas do tipo `string`, vejamos: `type: ['checkbox','bool']`.

## Tabela de Propriedades Comuns para Todos os Tipos

|Propriedade|Obrigatório?|Descrição|
|--|--|--|
|`propertDto`|✅|representa o nome da propriedade que devera ser criada no objeto desejado|
|`description`|✅|Nome do campo que aparecerá na tela|
|`information`||Esse campo ajuda a colocar uma informação adicional ao campo. Para visualizar use o atalho help `Ctrl+h`
|`type`|✅| Representa o tipo do campo que será utilizado na interface de usuário
|`maxLength`|✅|Tamanho máximo de caracteres permitidos
|`max`|| Numero máximo permitido
|`min`|| Número minimo permido
|`requerid`|✅| Indica obrigatoriedade no campo|
|`disable`|✅| Indica que o campo pode estar desabilitado para uso 
|`sequence`|✅| Esse campo controla a ordem dos campos criados em tela
|`value`|| Representa o valor inicial do campo, podendo ser omitido pela rotina caso o mesmo represente uma formula. Para saber mais veja [Formulas]().|

Além das opções acima, existem casos em que o tipo do campo requer uma particularidade especifica.

## Complemento da tabela para tipos especificos

|Propriedade|Obrigatório?|Descrição|Exemplo de Tipo
|--|--|--|--|
|`checkbox`||para tipo de campo`checkbox`, representa um array de chave e valor|`{"on":"2","off":"0"}`
|`combo`||para o tipo `select`,  representa um array de chave e valor| `{"value": "text", "representation": "text"},{"value": "number","representation": "number"},`

## Exempos de Casos de Uso

- text
- number
- date

```javascript
{
    "propertDto": "numero",
    "description": "Numero",
    "information": "",
    "type": "text",
    "maxLength": 32,
    "max": 0,
    "min": 0,
    "requerid": true,
    "disable": false,
    "sequence": 1,
    "id": "1565165",
    "value":"b242f3b3-aa33-4d0e-91c0-746b0c6f0afe"
}
```

- checkbox

```javascript
{
   "propertDto": "concluida",
    "description": "Concluida",
    "information": null,
    "type": "checkbox",
    "checkbox":{"on":"2","off":"0"},
    "maxLength": 20,
    "max": 0,
    "min": 0,
    "requerid": true,
    "disable": false,
    "sequence": 3,
    "id": "iscnscoin"
}
```

- select

```javascript
{
    "id": "ewfffe",
    "propertDto": "type",
    "description": "type",
    "information": null,
    "type": "select",
    "combo": [
    {
        "value": "text",
        "representation": "text"
    },
    {
        "value": "number",
        "representation": "number"
    },
    {
        "value": "select",
        "representation": "select"
    },
    {
        "value": "check",
        "representation": "check"
    },
    {
        "value": "radio",
        "representation": "radio"
    }
    ],
    "maxLength": 10,
    "max": 0,
    "min": 0,
    "requerid": true,
    "disable": false,
    "sequence": 5
}
```
|Contribuidores|
|-|
|<a href="https://github.com/reginaldo-marinho"><img width="45px" height="45px" style="border-radius:30px" alt="reginalso-marinho" title="TheLarkInn" src="https://avatars.githubusercontent.com/u/60780631?v=4"></a>|
