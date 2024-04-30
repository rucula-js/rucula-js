# Ambientes

Normalmente quando estamos desenvolvendo nossos projetos, utilizamos ambientes de desenvolvimento e de homologação para fins de testes. Vale a pena ressaltar que isso pode variar de empresa para empresa. Dito isso, falaremos agora do nosso controle de ambiente no rucula-js, controle que é feito a partir das configurações globais que é necessária antes da criação das janelas própriamente ditas.

```ts
interface enviroment {
    env:string;
    hostname:string;
    port?:string
}
```

## Decifrando `environments`

|Propriedade|tipo|obrigatório|Descrição|
|-|-|-|-|
|`env`|`string`|sim|Identificador do ambiente, exemplos: **DEV**, **HOM** e **PRD**|
|`hostname`|`string`|sim|Pode ser um domínio ou um IP. **Importante**: O valor informado deve conter o devido protocólo  |
|`port`|`string`|sim|porta usada no hostname|

<br>

##### Itens Relacionados
[localizações](localizacoes.md) - [Configurações Globais](configuracoesGlobais.md)

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


