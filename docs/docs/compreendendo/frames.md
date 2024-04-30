
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


## Obrigatoriedade e Controle
Por padrão, todos os frames cadastrados são obrigatórios, isso indica que a partir do momento que o frame estiver renderizado na tela, todas as condições relacionadas aos seus campos serão tratadas de acordo com a interavidade entre usuário e frame.

Ao informar que um frame no rucula-js **não é obrigatório**, não estamos dizendo necessáriamente que isso de fato é verdade, por vezes isso indica que ele só será obrigatoriedade a patir do momento que a interatividade entre o usuário e o frame é reconhecida. Isso ocorre porque as vezes queremos definir obrigatoriedades em determinado(s) campo(s) no nosso frame, mas que podem ser ignorados se não haver necessidade de preenchimento para aquela representação de objeto.  **Imagine isso como um objeto chamado Pedido, onde existe um campo EnderecoEntrega, dentro dele existe propriedades que são obrigatórias, mas o EnderecoEntrega não é obrigatório do ponto de vista de que ele pode ou não ter um EnderecoEntrega naquele momento.**

**Para liberar frames não obrigatórios, utilize a tecla `ESC`**

> **Nota:** Para os frames do tipo line, a opção `ESC` ficará disponivel somente se existir uma única linha do frame propriamente dito. 

<br>

##### Itens Relacionados

<a href="https://github.com/rucula-js/rucula-js">⭐ Visite o projeto rucula-js ⭐</a>

<div class="rucula-info">
    <h5>Nos ajude a melhorar o rucula-js.</h5>
    Encontrou um erro? Tem alguma sugestão?  <a href="https://github.com/rucula-js/rucula-js/issues">Abra um novo problema</a><br>    
</div>

##### Contribuidores

|Contribuidores|
|-|
|<a href="https://github.com/reginaldo-marinho"><img width="45px" height="45px" style="border-radius:30px" alt="reginalso-marinho" title="TheLarkInn" src="https://avatars.githubusercontent.com/u/60780631?v=4"></a>|
