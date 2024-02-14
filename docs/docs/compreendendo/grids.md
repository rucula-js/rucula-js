# Os Grids

Para se obter a melhor experiência ao trabalhar com grid, o tabular foi a escolha perfeita. Com um rico conjunto de configurações e desempenho, o tabulator se mostra  efetivo ao mostrar suas funcionalides atreladas ao rucula-js. Você pode saber mais sobre o tabulator em [tabulator.info](http://tabulator.info/).

> **Nota:** Por padrão os grid são iniciados automáticamente para as janelas do tipo `crud`, entretanto, há situações em que o grid não faz sentido. Para esses casos utilizamos a propriedade `window.grid:false` para desebalitá-lo.


## Configurando as Colunas do Grid  

Ao iniciar uma janela no rucula-js, uma das etapas que ocorrem é a consulta e preenchimento dos dados iniciais ao grid esquerdo da janela, essa consulta se dá pela configuração do [ponto de entrada](endPoints.md) `get-all-grid`, esse é um identificador reservado especialmente para o grid que é solicitado no array de pontos de entrada no processo de construção do grid. Além  desse identificador reservado, também temos o `get-by-id`, que falaremos mais à frente.

Mas voltando ao ponto prícipal, configurações das colunas, quando iniciado a rotina de criação do grid, o rucula-js vai querer saber a configuração desejada para a janela em evidência. Para isso durante a criação da configuração da janela, utilizamos para informar a configuração das colunas o objeto `columnsGrid`, esse objeto tem o objetivo de guardar o nome da propriedade que existirá durante o termino dá consulta `get-all-grid` e o nome que será representado para o usuário. vejamos abaixo um exemplo:

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


> **Observação**: Note que  `get-all-grid` e `get-by-id` são reservados exclusivamente para o caso do grid, e que devem ser configuradas de modo que faça sentido para cada janela.

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

