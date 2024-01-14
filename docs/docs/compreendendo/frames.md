
Sendo o mapeador gráfico dos objetos, os frames contém configurações que especificam seu tipo, seu eixo de apresentação para os fields e o nome do objeto que será representado.

Os tipos dos frames são representados por dois valores possíveis, `block` ou `line`. O tipo `block` é presentando por uma cardinalidade é um, já o tipo `line` pode conter mais de um registro do mesmo objeto em único frame.

> **Se não especificado o tipo do frame, o valor default `block` será usado**.

Frame do tipo `block`

```json
{
      "name": "Cliente",
      "objectDto": "cliente",
      "fields": [
        {
          "propertDto": "nome",
          "description": "Nome",
          "maxLength": 80
        },
        {
          "propertDto": "telefone",
          "description": "Telefone",
          "maxLength": 12
        },
        {
          "propertDto": "email",
          "description": "Email",
          "maxLength": 150
        }
      ]
    }
```
<p align="center">
    <img alt="Exemplo de um Frame de Endereço no rucula-js" src="../../assets/frame-type-block.png">  
</p>

Frame do tipo `line`
```json
 {
      "name": "Serviços Prestados",
      "type": "line",
      "objectDto": "itensServico",
      "fields": [
        {
          "propertDto": "descricao",
          "description": "Descrição",
          "maxLength": 100
        },
        {
          "propertDto": "valorUnitario",
          "description": "Valor Unitário",
          "type": "currency",
          "maxLength": 20
        },
        {
          "propertDto": "quantidade",
          "description": "Quantidade",
          "type": "number",
          "maxLength": 20
        },
        {
          "propertDto": "subtotal",
          "description": "Subtotal",
          "type": "currency",
          "maxLength": 50,
          "formula": [
            "=MATH(quantidade*valorUnitario)"
          ]
        }
      ]
    }
```
<p align="center">
    <img alt="Exemplo de um Frame de Endereço no rucula-js" src="../../assets/frame-type-line.png">  
</p>

```json
{
      "name": "Cliente",
      "objectDto": "cliente",
      "vertical":false, 
      "fields": [
        {
          "propertDto": "nome",
          "description": "Nome",
          "maxLength": 80
        },
        {
          "propertDto": "telefone",
          "description": "Telefone",
          "maxLength": 12
        },
        {
          "propertDto": "email",
          "description": "Email",
          "maxLength": 150
        }
      ]
    }
```
Frame do tipo `block` com orientação à fields horizontal 
<p align="center">
    <img alt="Exemplo de um Frame de Endereço no rucula-js" src="../../assets/frame-eixo-x.png">  
</p>

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