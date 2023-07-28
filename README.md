<p align="center" >
  <img src="/assets/rucula.svg" style="width:200px">
</p>
<h1 align="center">
  Rucula-js
</h1>

## Informe a Configuração da Tela Desejada 💡

<p align="center" >
  <img src="/assets/Screenshot from 2023-07-27 23-53-09.png" style="width:80%">
</p>

## E Receba uma Tela Pronta Para Ser Usada! 👨🏻‍💻

<p align="center" >
  <img src="/assets/Screenshot from 2023-07-27 23-48-57.png" style="width:80%">
</p>
<hr>
<br>

Rucula é capaz de...
- Criar telas em minutos ✅
- Consitir inputs de entradas de usuario ✅
- Criar objetos JSON dinamicamente ✅
- Gerenciar Inputs e saber quando há inconsistências na tela ✅
- Consumir API's REST ✅
- Gerenciar de URL's ✅
- Controlar dependências pelo terminal web ✅
- Controlar o ambiente do usuário ✅

<img src="/assets/angular.png" style="width:50px;">

<img src="/assets/frame.png">

## Por que esse Projeto?
Você já parou para pensar em quanto tempo você gasta para criar uma interface que garanta todas as consistências necessárias a cada propriedade? E quanto a suas interfaces de API's, como você faria para desenvolver todo o front-end de modo que todo o suporte a solicitações HTTP siga o mesmo padrão? E se você deseja-se  utilizar mais de um projeto utilizando a mesma unidade de trabalho? E o padrão de interface, como você faria para garantir que todas as interfaces estão seguindo o mesmo padrão  de desenvolvimento?
É pensando em tudo isso que o projeto Rucula está sendo desenvolvido. A seguir mostraremos os conceitos mais importantes do projeto Rucula.

## O Conceito de Janelas 🗔
No Rucula, tudo que é relacionado a interface de usuário está dentro de uma Janela. Abaixo da janela o componente mais inferior é o **Frame**, uma janela pode ter um ou mais Frames. 

#### Os Frames 🏖️🏝️🏜️
Os Frames são a representação gráfica dos Objetos. Assim como os objetos tem nome, propriedades, tipos e cardinalidade, os Frames também.  
#### Os Objetos <--> Os Frames
Como mencionado, os Frames são a representação gráfica dos objetos, logo, cada atributo de um objeto equivale ao mesmo atributo do Frame.  Está entendendo? Se eu configurar uma janela para três Objetos, terei na UI, uma janela com três Frames. Isso é ótimo!

Vejamos a tabela de para entre Objeto e Frame

|Atributo|Objeto|Frame|
|-|-|-|
|Nome|Usuario|Usuario|
|Propriedade|Id|Id|
|Tipo|string,numero,boolean,data|input(text, number, checkbox) select(lista de seleção), radios|
|Propriedade|1-1 ou 1-1*N|`block ou line`|

## Conceito de Objeto Soft 🧩
Como o nome diz, os objetos no Rucula são leves, e o que isso significa? Significa que durante a inicialização da janela, os objetos são criados sem 
propriedades. vejamos a representação:

Estrutura do Objeto
```json
{
  "id": "",
  "nome": "",
  "idade": 0
}
```
Objeto Soft Criado
```json
{}
```
### A Criação das Propriedades🐣🥚
Após a criação dos Objetos, as propriedades já estão aptas a serem criadas. Essas propriedades são criadas com base em eventos que ocorrem na interface de usuario, mais precisamente quando há perda de foco no **input** do usuário. Esse evento da inicio a uma serie de verificações que no meio de uma das suas instruções, a Propriedade é criada no seu devido Objeto.

**Nota:** Você deve estar se perguntando, **"Ok, mas se o objeto é criado a cada evento no input, isso não deixa o objeto anêmico e com risco de ser enviado com propriedades inexistentes?** A resposta para isso é NÂO! A seguir mostraremos o conceito da **Tabela de Dependncia**, que é sem duvidas o que dá sentido para as demais checagens das propriedades. 

## Conceito da Tabela de Dependência ⛔🔒 ✅🔓
Manter o controle sobre as propriedades de uma janela deve ser uma tarefa obrigatória e isso deve ser consistente. A tabela de dependência fornece tudo que é necessário para o correto funcionamento de cada input na janela, além de prestar suporte até que o Objeto esteja 100% criado.

**Nota: Além da tabela de dependência que mantém todas as dependências a serem resolvidas, por baixo dos panos também existe uma lista dependências não resolvidas, essa lista é um ponteiro para a Tabela de Dependência, e ela auxilia na performance dos inputs não resolvidos.**

### A Criação e o Estado Inicial 
Criado antes da inicialização  dos Frames na Janela, a Tabela de Dependência segue um critério que define um padrão chave/valor, cada chave representa uma propriedade de um Objeto a ser resolvida e cada valor representa o tipo de dependência e a dependência resolvida.

##### O Padrão Chave/Valor e Suas Representações Lógicas

O padrão chave/valor não é simplesmente qualquer representação alfanumérica, dentro dele existem partes lógicas que possuem significados mais específicos.

Antes de começar, vamos imaginar que estamos criando uma Janela simples para cadastro de usuários, para isso, precisamos de um objeto que tenha as seguintes características: 
```json
{
  "id": "",
  "nome": "",
  "idade": 0
}
```
As configurações para cada propriedade do Objeto são:
|Propriedade|obrigatório|Max Len|Min|Max|
|-----------|-----------|-------|---|---|
|id         |Sim        |32     |
|nome|sim|50|
|idade|sim| 2|18|80|

Com essas definições, a rotina da tabela de dependência cria uma linha de dependência para cada propriedade, no final de tudo teríamos algo no seguinte modelo:
|Chave|Valor|
|-----|-----|
|Usuário.id. | 1,2:32,.|
|Usuario.nome. | 1,2:50,.|
|Usuário.idade. |1,2:2,3:18,4:80,.|

**Observação**: O ultimo `.` na chave presenta a cardinalidade, como não tem nada após ele, isso indica que é de 1-1, se fosse um objeto do tipo array, seria algo assim:  `Usuário.id.0 Usuario.nome.0 Usuário.idade.0`

#### As partes lógicas da Chave

As chaves são construídas a partir de três partes lógicas, [Objeto.Propriedade.Linha].
Isso pode mudar com base nas cardinalidade  1 - 1 e 1 - 1*N

|Objeto|Propriedade|Linha|
|-|-|-|
|Usuário|id||
|Usuário|nome||
|Usuário|idade||

**Nota**: Não há linha, logo o objeto é de 1 - 1

#### As Partes Lógicas do Valor

É aqui que é controlado as dependências que devem ser resolvidas. Cada dependência tem um número, atualmente existem 5 tipos possíveis de dependência para as propriedades.

|Dependência|Descrição|
|-|-|
|1|Obrigatório|
|2|Quantidade máxima de caracteres|
|3|Número máximo|
|4|Número Mínimo|
|5|Expressão Regular|

Os tipos de dependência por si só não são relevantes, para que eles possam trazer significado para as propriedades é necessário que haja algum valor de parâmetro que auxilie na dependência, esses valores são adicionados depois do número da dependência, além disso é importante saber que o que separa o código da dependência com o parâmetro de valor é o separador ":".

Vamos ao exemplo: Como vimos anteriormente, temos o Objeto usuario, tem três prioridades: `id, nome e idade`, agora, como a Tabela de Dependência se comportaria para as seguintes premissas:

|Objeto|Propriedade|Linha|1|2|3|4|5|Chave/Valor|
|-|-|-|-|-|-|-|-|-|
|Usuário|id||✅|32||||`usuario.id. 1,2:32`|
|Usuário|nome||✅|50||||`usuario.id. 1,2:50`|
|Usuário|idade||✅|2|18|80||` usuario.idade. 1,2:2,3:18,4:80`|

### O Declinio das Dependêcias📉
Como citado anteriormente, além da tabela de dependência, existe uma lista de dependências não resolvidas. Essas dependências são criadas, removidas  e alteradas a cada interação com o usuário.
Isso que dizer que no início da Janela, quase todos, senão todos os inputs do usuário estarão como com dependência e a cada evento foco, estarão prontos para saírem da lista de **Dependências não Resolvidas**.

### A Dependência Snapshot 🆘
Como sabemos, até agora aprendemos que os Objetos podem ser de 1-1 ou de 1-1*N, logo podemos afirmar que 1-1 pode ser definido como um Objeto estático e 1-1*N como um Objeto dinâmico. Nessa sessão, vamos focar nos Objetos dinâmicos.

#### A Manipulação dos Objetos Dinâmicos na Interface de Usuário

No Rucula, os Objetos do tipo array, na sua representação gráfica são Frames do tipo `line`, esses frames prestam suporte a criação e remoção de linhas, você pode utilizar os comandos: `Alt+a` para adicionar um novo linha e `Alt+d` para remover um linha.

O que acontece quando se deseja adicionar uma nova linha? Antes de responder essa pergunta, vamos explicar o que acontece no processo de criação dos Frames do tipo `line`.

Durante a criação dos frames do tipo `line`
o Rucula obtém o estado inicial da primeira linha que é criada em cada Frame da Janela e guarda em um Array do tipo HTMLElemet, isso ajuda na criação de novas linhas utilizando métodos de clone.

Como dito acima, criar linhas no Rucula é simples, bastando clonar o elemento do array, entretanto, só isso não é o suficiente para garantir a consistência da Janela. Para que tudo funcione de uma forma  efetiva, para cada evento, seja ele criação ou remoção, o Rucula também adiciona ou remove sua representação na Tabela de Dependência.

Bom, até agora aprendemos sobre como funciona todo o sistema para os Frames, mas onde que entra a bendita ** Dependência Snapshot**? Certo, agora podemos falar.

Assim como no início em que as dependencias são adicionadas na Tabela de Dependência, para cada nova linha criada, novas dependências também são adicionadas, o que pega aqui é que o Rucula deve ser capaz de obter um modelo que represente o estado inicial das dependências referente ao Frame. Para isso o Rucula criar no início da Criação da 


 o mesmo serve para a remoção de linha, para cada linha removida, dependências pertinentes a ela também são excluídas.



## O mediator HTTP 💻📡
Além da criação e manipulação dos componentes da interface de usuário, o projeto Rucula também presta suporte a solicitações HTTP. O projeto Rucula é isso, suporte fron-end e back-end.

### As operações CRUD e os Links de Suporte

|Contribuidores|
|-|
|<img src="https://avatars.githubusercontent.com/u/60780631?v=4" style="width:50px;">|




