## Conceitos

No rucula-js existem alguns conceitos que ajudará você durante a sua utilização. Esses conceitos estão relacionados a como a interface de usuário é criada e também à como o rucula-js consegue garantir o controle dos dados informados.

## O Conceito de Janela

No Rucula, tudo que é relacionado a interface de usuário está dentro de uma `Janela`. Abaixo da `Janela` o componente mais inferior é o `Frame`, uma janela é composta de um ou mais `Frames`. 

## O Conceito Dos Frames

Os Frames são a representação gráfica dos Objetos. Assim como os objetos tem nome, propriedades, tipos e cardinalidade, os Frames também.  

### As características dos Frames e dos Objetos 

Como mencionado, os Frames são a representação gráfica dos objetos, logo, cada atributo de um objeto equivale ao mesmo atributo do Frame.  Está entendendo? Se eu configurar uma janela para três Objetos, terei na UI, uma janela com três Frames. Isso é incrível!

Vejamos a tabela de para entre Objeto e Frame

|Atributo|Objeto|Frame|
|-|-|-|
|Nome|Usuario|Usuario|
|Propriedade|Id|Id|
|Tipo|string,numero,boolean,data|input(text, number, checkbox) select(lista de seleção), radios|
|Cardinalidade|1-1 ou 1-1*N|`block ou line`|

## Conceito do Objeto Soft 🧩

Como o nome diz, os objetos no Rucula são leves, e o que isso significa? Significa que durante a inicialização da janela, os objetos são criados sem 
propriedades, com exceção daqueles campos que tem valores default ou quando a janela está em um estado de manutenção de dados. vejamos a representação:

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
### A Criação das Propriedades

Após a criação dos Objetos, as propriedades já estão aptas a serem criadas. Essas propriedades são criadas com base em eventos que ocorrem na interface de usuario, mais precisamente quando há perda de foco no **input** do usuário. Esse evento da inicio a uma serie de verificações que no meio de uma das suas instruções, a Propriedade é criada no seu devido Objeto.

**Nota:** Você deve estar se perguntando, **"Ok, mas se o objeto é criado a cada evento no input, isso não deixa o objeto anêmico e com risco de ser enviado com propriedades inexistentes?** A resposta para isso é NÂO! A seguir mostraremos o conceito da **Tabela de Dependencia**, que é sem duvidas o que dá sentido para as demais checagens das propriedades. 

## Conceito da Tabela de Dependência
Manter o controle sobre as propriedades de uma janela deve ser uma tarefa obrigatória e isso deve ser consistente. A tabela de dependência fornece tudo que é necessário para o correto funcionamento de cada input na janela, além de prestar suporte até que o Objeto esteja 100% criado.

**Nota: Além da tabela de dependência que mantém todas as dependências a serem resolvidas, por baixo dos panos também existe uma lista dependências não resolvidas, essa lista é um ponteiro para a Tabela de Dependência, e ela auxilia na performance dos inputs não resolvidos.**

### O Estado Inicial da Tabela de Dependência 
Criado antes da inicialização  dos Frames na Janela, a Tabela de Dependência segue um critério que define um padrão chave/valor, cada chave representa uma propriedade de um Objeto a ser resolvida e cada valor representa o tipo de dependência e a dependência resolvida.

#### O Padrão Chave/Valor e Suas Representações Lógicas

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

### Dependêcias não Resolvidas
Como citado anteriormente, além da tabela de dependência, existe uma lista de dependências não resolvidas. Essas dependências são criadas, removidas  e alteradas a cada interação com o usuário.
Isso que dizer que no início da Janela, quase todos, senão todos os inputs do usuário estarão como com dependência e a cada evento foco, estarão prontos para saírem da lista de **Dependências não Resolvidas**.
