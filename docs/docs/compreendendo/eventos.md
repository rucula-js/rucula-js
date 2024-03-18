Eventos são frequentemente usados em interfaces de usuário, eles ajudam a capitar ações como clique de botão, posição no cursor durante sua movimentação, entre outros eventos que podem ser criados para resolver problemas mais específicos.

No rucula-js existem eventos em três pontos diferentes da interface de usuário. O primeiro caso são eventos que ocorrem ao clicar nos botões da janela, no segundo caso, são eventos que ocorrem durante o ciclo de vida de chamadas http's e por último, eventos que  ocorrem nos inputs presentes na interface, os famosos eventos de campos.

## Eventos de Campos
Os eventos de campos são disparados em três momentos, `before`, `input` e `after`. Cada campo possui seu evento espeficico, sendo um dos três momentos citados anteriormente juntamente com o nome do `objetoDto` e `objetoDto`. 

A seguir mostraremos os possíveis eventos para o campo `codigo` do objeto `ordemDeServico`.

```ts

    var form = document.getElementById("form-rucula-js")
    
    form?.addEventListener('before.ordemDeServico.codigo',(e) => {

    })

    form?.addEventListener('input.ordemDeServico.codigo',(e) => {

    })

    form?.addEventListener('after.ordemDeServico.codigo',(e) => {

    })

```

### A Referência do Evento

Durante o evento, um [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) é acionando e em seu objeto `datail` o identificador do campo é enviando em `name` e o elemento DOM do campo em `element`. Isso garante que com o identificador `name` ou  com o `element` presente no evento, a manipulação de outras funções presente no rucula-js seja mais fácil.

```js
{
    "name": "block.ordemDeServico.codigo",
    "element": {}
}
```
## Eventos de Botões
## Eventos de HTTP

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

