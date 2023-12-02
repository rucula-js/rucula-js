
# Configurações de Campos

As configurações de campos representam o tipo gráfico de componente que será criado e também, para alguns casos, a representação de do tipo saída. 
> Os tipos de saída são configurados para casos em que a representação gráfica deve retornar um tipo diferente no processo de manipulação do mesmo. Campos do tipo 'checkbox', 'radio' e 'select',  tem representaçõesgráficas de um tipo, mas  durante sua resolução, o tipo deve ser convertido para um caso especial.

## Os Tipos

O rucula-js presta suporte para uma quantidade de compontes gráficos e tipos, na maioria dos casos os inputs do tipo `text` resolverão o problema, entretanto, haverá cenarios, onde outro tipo seja mais conveniente.

### Configurando os Tipos com as Duas Formais Possíveis

A configuração de tipo requer duas sintaxe diferentes, em primerio lugar utilizamos a sintaxe de tipo `string`, observe: `type: 'text'`. Em segundo lugar, utilizamos a sintaxe de tipo `string[2]`, isso significa que o tipo passado será um array com duas casas do tipo `string`, vejamos: `type: ['checkbox','bool']`.

## groupFormat

`groupFormat` é a propriedade resposável por manipular o label e o component que é criado em tela, ele indica o posicionamento do label em relação ao componente que será criado. **Por padrão o  label é criado em cima do component desejado**, mas essa opção pode mudar se especificado `down`, `left` ou `rigth`.







|Contribuidores|
|-|
|<a href="https://github.com/reginaldo-marinho"><img width="45px" height="45px" style="border-radius:30px" alt="reginalso-marinho" title="TheLarkInn" src="https://avatars.githubusercontent.com/u/60780631?v=4"></a>|
