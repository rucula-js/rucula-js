# Configurações de Campos

As configurações de campos podem variar, cada campo pode conter uma particulariade especifica. Abaixo, listaremos os tipos de campos e suas respectivas particularidades.

## Tabela de Propriedades Comun para Todos os Tipos

|Propriedade|Obrigatório?|Descrição|
|--|--|--|
|`propertDto`|✅|representa o nome da propriedade que devera ser criada no objeto desejado|
|`description`|✅|Nome do campo que aparecerá na tela|
|`information`||Esse campo ajuda a colocar mais detalhe no campo. Para visualizar use o atalho help `Ctrl+h`
|`type`|✅| Representa o tipo do campo que será utilizado na interface de usuário
|`maxLength`|✅|Tamanho máximo de caracteres permitidos
|`max`|| Numero máximo permitido
|`min`|| Número minimo permido
|`requerid`|✅| Indica obrigatoriedade no campo|
|`disable`|✅| Indica de o campo pode está desabilitado para alteração
|`sequence`|✅| Esse campo controla a ordem dos campos criados em tela
|`id`|✅| Identificador unido do campo
|`value`|| Representa o valor inicial do campo, podendo ser omitido pela rotina caso o mesmo represente uma formula|

Além das opções acima, exitem cados em que o tipo do campo requer uma particularidade especifica.

## Complemento da tabela pata tipo especificos

|Propriedade|Obrigatório?|Descrição|Exemplo de Tipo
|--|--|--|--|
|`checkbox`||paratipo de campo`checkbox`, representa um array de chave e valor|`{"on":"2","off":"0"}`
|`combo`||para o tipo `select`,  representa um array de chave e valor| `{"value": "text", "representation": "text"},{"value": "number","representation": "number"},`

## Exempos de Casos de Usos

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
