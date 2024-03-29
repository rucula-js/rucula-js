```json
{
  "name": "Ordem de Serviço",
  "pathController": "/OrdemServico",
  "type": "crud",
  "messageHome": "Ordem de Serviço",
  "iconHome": "bi-rocket-takeoff",
  "this": "ordemDeServico",
  "frames": [
    {
      "name": "Header OS",
      "objectDto": "ordemDeServico",
      "fields": [
        {
          "propertDto": "codigo",
          "description": "Código",
          "maxLength": 40,
          "requerid":true
        },
        {
          "propertDto": "dataAbertura",
          "description": "Data de Abertura",
          "type": "date"
        },
        {
          "propertDto": "totalServico",
          "description": "Total de Serviço",
          "type": "currency"
        },
        {
          "propertDto": "dataConclusao",
          "description": "Data de Conclusão",
          "type": "date"
        },
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
        },
        {
          "propertDto": "infIni",
          "description": "Informações Iniciais",
          "type": "textarea",
          "maxLength": 5
        }
      ]
    },
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
    },
    {
      "name": "Cliente - Endereço",
      "objectDto": "endereco",
      "fields": [
        {
          "propertDto": "cep",
          "description": "CEP",
          "maxLength": 9
        },
        {
          "propertDto": "logradouro",
          "description": "Logradouro",
          "maxLength": 150
        },
        {
          "propertDto": "complemento",
          "description": "Complemento",
          "information": "",
          "maxLength": 20
        },
        {
          "propertDto": "bairro",
          "description": "Bairro",
          "maxLength": 30
        },
        {
          "propertDto": "cidade",
          "description": "Cidade",
          "maxLength": 40
        },
        {
          "propertDto": "estado",
          "description": "Estado",
          "maxLength": 30
        },
        {
          "propertDto": "pais",
          "description": "País",
          "maxLength": 50
        }
      ]
    },
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
    },
    {
      "name": "🧑‍🔧 Técnico Responsavel",
      "objectDto": "tecnicoResponsavel",
      "fields": [
        {
          "propertDto": "nome",
          "description": "Nome",
          "maxLength": 100
        },
        {
          "propertDto": "telefone",
          "description": "Telefone",
          "maxLength": 15
        },
        {
          "propertDto": "email",
          "description": "Email",
          "maxLength": 100
        }
      ]
    },
    {
      "name": "💵 Pagamento",
      "objectDto": "pagamento",
      "fields": [
        {
          "propertDto": "formaDePagamento",
          "description": "Forma de Pagamento",
          "maxLength": 100
        },
        {
          "propertDto": "valorTotalPago",
          "description": "Valor Total Pago",
          "type": "currency"
        },
        {
          "propertDto": "dataPagamento",
          "description": "Data de Pagamento",
          "type": "date"        
        }
      ]
    }
  ],
  "columnsGrid": [
    {
      "title": "codigo",
      "field": "codigo"
    },
    {
      "title": "data Abertura",
      "field": "dataAbertura"
    }
  ],
  "paramsGrid": "/{{codigo}}",
  "button": [
    {
      "icon": "bi bi-save",
      "type": "button",
      "target": "r-a-save",
      "endPoint": "create-os"
    },
    {
      "icon": "bi bi-wrench",
      "type": "button",
      "target": "r-a-alter",
      "endPoint": "update-os"
    },
    {
      "icon": "bi bi-trash3",
      "type": "button",
      "target": "r-a-delete",
      "endPoint": "delete-os"
    },
    {
      "text": "Finalizar 💵",
      "type": "button",
      "target": "q1w2e3r493469869",
      "endPoint": "delete-os"
    },
    {
      "text": "Validar  🎲",
      "type": "button",
      "target": "finalizar-compra",
      "endPoint": "delete-os"
    }
  ],
  "joinChield": [
     "cliente..endereco",
     "ordemDeServico..cliente",
     "ordemDeServico..itensServico",
     "ordemDeServico..tecnicoResponsavel",
     "ordemDeServico..pagamento"
  ],
  "endPoints": [
    {
      "name": "create-os",
      "method": "post",
      "body": "this"
    },
    {
      "name": "delete-os",
      "method": "delete",
      "params": "/{{ordemDeServico.codigo}}"
    },
    {
      "name": "update-os",
      "method": "put",
      "params": "/{{ordemDeServico.codigo}}",
      "body": "this"
    },
    {
      "name": "get-all-grid",
      "method": "get"
    },
    {
      "name": "get-by-id",
      "method": "get"
    },
    {
      "name": "documentacao",
      "method": "get",
      "params": "/{{ordemDeServico.codigo}}"
    },
    {
      "name": "finalizar-compra",
      "method": "post",
      "params": "/{{ordemDeServico.codigo}}"
    }
  ]
}
```