
# Localizações

Diferentes localidades requerem diferentes tipos de moedas, tradução, casas decimais, entre outras coisas. Para esse tipo de controle, contamos com a interface `localization`. Vejamos suas propriedades:

```ts
interface localization{
    locales:string
    language:string
    currency:string
    maxDecimal:number
}
```

## Decifrando `localization`

|Propriedade|tipo|obrigatório|Descrição|
|-|-|-|-|
|`locales`|`string`|sim|Identificador da localização, do idioma.  Veja aqui possíveis [códigos de idiomas](https://www.ibm.com/docs/pt-br/datacap/9.1.8?topic=sszrwv-9-1-8-com-ibm-dc-develop-doc-dcdev457-htm)|
|`language`|`string`|sim|Nome da línguagem que aparecerá na interface de usuário. Exemplo: `Português`,`Português Brasil`|
|`currency`|`string`|sim|Tipo de Moéda, tipo `BRL`. Veja outras em [Conversor de Moedas - gov](https://www.bcb.gov.br/conversao)|
|`maxDecimal`|`number`|sim|Numero máximo de casas decímais para campos do tipo `currency`|

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
