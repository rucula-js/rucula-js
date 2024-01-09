O rucula-js é um projeto que visa receber somente  as configurações de uma determinada janela, para assim então, criar toda a estrutura que diz respeito as configurações passadas, entretando, existe uma leve exeção ao objeto de configurações global que não precisa ser configurado para cada janela e sim uma vez em todo o ciclo de vida do projeto.

> **Nota**: A configuração global configurada e chamada apenas uma vez, só faz sentido se soubermos como usa-lá em projetos [single page](https://www.devmedia.com.br/ja-ouviu-falar-em-single-page-applications/39009), como são nos casos de projetos [**Angular**](https://angular.io/) e [**React**](https://react.dev/). **Para os demais casos, será necessário informar a configuração global sempre anteriormente a chamada da criação da janela, como é no caso da [Configuração Inicial de Apresentação](configuracao.md)**.

```ts
interface globalConfiguration {
    localizations:localization[];
    environments:enviroment[];
    chosenLocalization:localization;
    chosenEnvironment:enviroment;
}
```
## Decifrando o `globalConfiguration` 

|Propriedade|tipo|obrigatório|Descrição|
|-|-|-|-|
|`localizations`|`localization[]`|sim|Array com todas as [localizações](localizacoes.md) presentes no projeto. **Aprenda sobre [Localizações](localizacoes.md)** |
|`environments`|`enviroment[]`|sim|Array com todos os [ambientes]((ambiente.md)) presentes no projeto. **Aprenda sobre [Ambientes](ambiente.md)**|
|`chosenLocalization`|`localization`|não|**Usado internamente**, essa propriedade guarda a localização usada atualmente pela janela em foco|
|`chosenEnvironment`|`enviroment`|não|**Usado internamente**, essa propriedade guarda o ambiente usado atualmente pela janela em foco|

## Exemplo de Configuração

```ts
{
    environments:[
        {
            env:"development",
            hostname:"http://localhost",
            port: "5016"
        }
    ],
    localizations:[
        {
            locales:"pt-BR",
            language:"Português",
            currency:"BRL",
            maxDecimal:5
        }
    ] 
}   

```

> **Observação Importante**: Se não especificado ou se não houver controle com coockies no ambiente(`enviroment`) ou localização(`localization`), o rucula-js usará o item da posição **`0`** do array como **opção default**.


<br>

##### Itens Relacionados
[localizações](localizacoes.md) - [Ambientes](ambiente.md)


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

