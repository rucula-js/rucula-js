---
title: Introdução ao Rucula
summary: Primeira Apresentação do rucula-js
authors:
    - Reginald Marinho
date: 2023-09-15
---

<h1 align="center">Rucula-js - Gerando Janelas Dinamicamente</h1>
<p align="center" >
  <img src="https://raw.githubusercontent.com/reginaldo-marinho/rucula-js/b76e809a44a66de3733e30388e29d672c8b61011/docs/assets/rucula.svg" style="width:200px">
</p>

Bem vindo ao projeto rucula-js, aqui você aprenderá a criar janelas e consumir API's Rest de uma forma mais rápida e mais consistente.  Esqueça o problema de ter que se preucupar em validar campos, efetuar cálculos matemáticos, criar e mapear objetos do tipo array e por ultimo o mais redundante, criar div's e mais div's para representar formularios que estão passiveis de erros e de falta de padronização.

## Os Níveis de Atuação do Rucula-js

O rucula funciona em três níveis, cada nivel representa um etapa e o limite do seu funcionamento

- **1° Nivel** Configuração global da aplicação - Aqui é configurado os ambientes e as localizações
- **2° Nivel** Criação e Configuração da Janela - Aqui se obtém todas estrura necessária para criação da Janela desejada
- **3° Nivel** Contrução da Jenela - Aqui o rucula-js lê as Configurações Globais e as Configurações da Janela e converte em uma interface de usuário amigavel
- **4° Nivel** - Criação e Controle dos Objetos - Com base nos eventos da Janela o Rucula-js cria e valida objetos dinamicamente até o objeto estar 100% em conformidade com as configurações passadas. Para seber mais visite [Conceitos Rucula](./conceitos.md)

**1° Nivel**
```json
{
    "environments":[
        {
            "env":"development",
            "hostname":"https://localhost",
            "port": "7299"
        }
    ],
    "localizations":[
        {
            "locales":"pt-BR",
            "language":"Português",
            "currency":"BRL",
            "maxDecimal":5
        }
    ] 
}   
```

**2° Nivel**

```json
{
    "name":"Ordem de Serviço",
    "pathController":"/api/OrdemServico",
    "urlGetAll":"",
    "urlGetId":"",
    "type":"crud",
    "frames":[
       {
          "name":"📝 Header OS",
          "type":"block",
          "objectDto":"ordemDeServico",
          "sequence":0,
          "fields":[
             {
                "propertDto":"codigo",
                "description":"Código",
                "information":"",
                "type":"text",
                "maxLength":40,
                "width":300,
                "max":0,
                "min":0,
                "requerid":true,
                "disable":false,
                "sequence":1,
                "id":"1565165",
                "value":"bb00eb36-1ec6-4e89-8183-8215735998e6"
             },
             ...Continua
          ],
          "id":"981981"
       }
       ...Continua
    ],
    "button":[
       {
          "method":"post",
          "post":"",
          "link":"",
          "icon":"bi bi-save",
          "text":"",
          "type":"button",
          "color":"",
          "target":"",
          "urlrelative":"",
          "id":"8418"
       }
       ...Continua
    ]
 }
```

**3° Nivel**
<img src="./assets/2023-09-15 23-40-52.png" style="width:100%;">

**4° Nivel**

```json
{
   "codigo":"bb00eb36-1ec6-4e89-8183-8215735998e6",
   "dataAbertura":"2023-09-08",
   "totalServico":"1115.88",
   "dataConclusao":"2023-09-10",
   "status":"false",
   "cliente":{
      "nome":"Reginaldo",
      "telefone":"Marinho",
      "email":"reginaldo@hotmail.com",
      "endereco":{
         "logradouro":"rua aurelio dias",
         "complemento":"ap 39",
         "bairro":"cecilia antunes",
         "cidade":"jundiai",
         "estado":"SP",
         "cep":"13785-99",
         "pais":"BR"
      }
   },
   "itensServico":[
      {
         "zzRowUi":0,
         "descricao":"Tróca de óleo",
         "valorUnitario":"600",
         "quantidade":"1",
         "subtotal":"600"
      },
      {
         "zzRowUi":1,
         "descricao":"Limpeza de Bico",
         "valorUnitario":"45.88",
         "quantidade":"1",
         "subtotal":"45.88"
      },
      {
         "zzRowUi":2,
         "descricao":"Troca Pneu",
         "valorUnitario":"320",
         "quantidade":"4",
         "subtotal":"1280"
      },
      {
         "zzRowUi":3,
         "descricao":"Alinhamento e Balanceamento",
         "valorUnitario":"50",
         "quantidade":"1",
         "subtotal":"50"
      }
   ],
   "tecnicoResponsavel":{
      "nome":"Carlos Santos",
      "telefone":"(11) 9876-5432",
      "email":"carlos@email.com"
   },
   "pagamento":{
      "formaDePagamento":"Cartão de Crédito",
      "valorTotalPago":"350",
      "dataPagamento":"2023-09-10"
   }
}
```

**Após a criação e validação do **4° nível**, o rucula-js estará pronto para consumir suas API's🚀**


