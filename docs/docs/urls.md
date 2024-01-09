# Url's 

No rucula-js a criação de url's é um processo dinâmico, que ocorre a partir da leitura de algumas propriedades presentes na configuração global da janela e na configuração particular de cada janela.


## Url Derivada da Configuração Global 

A url base, usada por todas as janelas é criada a partir da configuração global, na configuração global temos uma proriedade chamada `environments`, nela existe uma array de ambientes que darão apoio á todas as janelas, vejamos:

```json
    "environments":[
        {
            "env":"development",
            "hostname":"http://localhost",
            "port": "5016"
        }
    ]
```

|propriedade|descrição|
|--|---|
|`env`|identificador único do ambiente|
|`hostname`|Aqui deve ser o protocolo  juntamente com a url de domínio da aplicação. **Nota: Você pode usar um número ip no lugar do nome de dominio**|
|`port`| é o numero da porta da url|

Durante o processo de criação de url, o ruculs-js cria a url global padrão na seguinte forma `http://localhost:5016`


## Path Controller da Janela

Normalmente teremos janelas que fazem acesso à controllers especificos, por exemplo, ao criar uma janela chamada `Ordem de Servico` é provável que o path de serviço utilizado pela janela seja `/OrdemServico` ou algo muito semelhante, o fato é que a janela de fato terá os serviços que utiliza dentro de `/OrdemServico`. A propriedade da janela que guarda o path controller é `pathController`.

Para esse caso a url seria criada utilizando a url de dominio do ambiente atual, tendo o apoio do exemplo acima, teriamos uma url completa na seguinte forma: `http://localhost:5016/OrdemServico`


## Path Relativo de Maior Precedência


Os path's de maior precedencia tem o mesmo comportamento do `pathController`, entretanto, o **Path Relativo de Maior Precedência**, se existir, substitui o `pathController`. Isso ocorre porque diferente do exemplo acima, existem casos em que é necessário criar url's completas que fazem sentidos para casos mais especificos, por exemplo, mantendo o foco no caso anterior da `Ordem de Servico`, poderia existir um botão chamado `ChecarSaldoCliente`. Ao se tratar do cliente, provavelmente o path da url terá algo como `/Cliente`, nesse caso, ao chamar o botão `ChecarSaldoCliente`, a url completa criada seria `http://localhost:5016/Cliente`.

A proriedade representante chama-se `urlrelative`, propriedade que está presente no objeto `endPoint`.

## Observação importante

Para ambos os casos [Path Controller da Janela](PathControllerdaJanela) e [Path Relativo de Maior Precedência](PathRelativodeMaiorPrecedência), é importante entender que os dois casos se complementam, por exemplo, uma janela  de **Ordem de Serviço** ultilizada `/OrdemServico` para criar, alterar, excluir e consultar mas também pode trabalhar com quaisquer outros path's, como é o caso do `ChecarSaldoCliente`

## Os Parametros de Url's

Existem casos em que as url's devem ser criadas com parametros, para esses casos o rucula-js trabalha no nível dos **Pontos de Entradas**, sendo mais especifico, com a propriedade `params`. Como exemplo iremos mostrar duas formas de efetuar uma exclusão em uma ordem de serviço.


Com a url quase pronta  `http://localhost:5016/OrdemServico`, podemos passar os parametros em duas formas: 

- `?` seguido de `parametro={{objeto.nome}}`, caso tenha mais de um parametro, teriamos `parametro={{objeto.nome}}&parametro={{objeto.nome2}}`. Esse construção resultaria em algo como `?id={{orderServico.id}}`
- Com `/` seguido de objeto `{{objeto.nome}}`, aqui a construção seria `/{{orderServico.id}}` 

**Nota: A sintaxe de objeto propriedade {{objeto.propriedade}}, pode ser substituida por constantes, exemplo: `?id=12345` ou `/12345`**

Após a construção completa da url, teriamos `http://localhost:5016/OrdemServico?id=12345` ou `http://localhost:5016/OrdemServico/12345` 

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

