# Os Grids

Para se obter a melhor experiência ao trabalhar com grid, o tabular foi a escolha perfeita. Com um rico conjunto de configurações e desempenho, o tabulator se mostra  efetivo ao mostrar suas funcionalides atreladas ao rucula-js. Veja seu site oficial em [tabulator.info](http://tabulator.info/).


## Configurando as Colunas do Grid  

Ao iniciar uma janela no  rucula-js, uma  das etapas que ocorrem é a consulta e preenchimento dos dados iniciais ao grid esquerdo da janela, essa consulta se dá pela configuração do [ponto de entrada](endPoints.md) `get-all-grid`, esse é um identificador reservado especialmente para o grid que é solicitado no array de pontos de entrada no processo de construção do grid. Além  desse identificador reservado, também temos o `get-by-id`, que falaremos mais à frente.

Mas voltando ao ponto prícipal no momento que é as configurações das colunas, quando iniciado a rotina de criação do grid, o rucula-js vai querer saber a configuração desejada para a janela em evidência. Para isso durante a criação da configuração da janela, utilizamos para informar a configuração das colunas o objeto `columnsGrid`, esse objeto tem o objetivo de guardar o nome da propriedade que existirá durante o termino dá consulta `get-all-grid` e o nome que será representado para o usuário. vejamos abaixo um exemplo:

```json
"columnsGrid":[ //objeto de configuração
    {
        "field":"codigo", // nome da propridade que exisitrá ao termino da consulta
        "title":"codigo da OS" // Nome que aparecerá para o usuário final
    },
    {
        "field":"dataAbertura",
        "title":"data Abertura"
    }
],
```

## Configurando os Parâmetros do Grid

Após a criação do grid, o rucula-js da inicio a escuta de eventos `click` no nível de linha, isso é necessário porque como qualquer outra aplicação, ao saber a linha desejada pelo usuário, uma nova solicitação no nível de linha deve ser feita ao backend, o que resulta em um objeto completo que é preenchido corretamente na interface do usuário. Esses eventos dizem ao rucula-js para executar o [ponto de entrada](endPoints.md), cuja identificação é `get-by-id`.


**Observação**: Note que  `get-all-grid` e `get-by-id` são reservados exclusivamente para o caso do grid, e que devem ser configuradas de modo que faça sentido para cada janela.

```json
"endPoints":[
      {
         "name":"create-os", // Identificador qualquer
         "method":"post",
         "body": "this"
      },
      {
         "name":"delete-os",
         "method":"delete",
         "params":"/{{ordemDeServico.codigo}}" // Identificador qualquer
      },
      {
         "name":"update-os",// Identificador qualquer
         "method":"put",
         "params":"/{{ordemDeServico.codigo}}",
         "body": "this"
      },
      {
         "name":"get-all-grid", // Identificador exclusivo
         "method":"get"
      },
      {
         "name":"get-by-id", // Identificador exclusivo
         "method":"get"
      }
    ],
```

Caso não entenda porque `get-all-grid` e `get-by-id`, mesmo quase que vazios são relevantes, veja [URL's](url.md)


**Encontrou algum erro? Tem sugestão de melhoria? Crie um relatório de bug em [rucula-js](https://github.com/rucula-js/rucula-js/issues)**