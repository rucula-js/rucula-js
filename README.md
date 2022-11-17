# O que é o Rucula? 
Rucula é um sistema de gerenciamento de conteudo prático, que manipula a criação de conteudos para a web. Seu objetivo principal é mapear estruturas **HTML/CSS** à uma sintaxe de modelo em formato de função que juntos transformam um simples documento na sintaxe .ruc em páginas web padronizadas e formatadas.

## A sintaxe .ruc

Criada em formato de função, a sintaxe ruc é composta pelo nome da função (identificador), parametros (características) e chaves (representação - texto).

```
A(){
}
```
* A - Identificador
* ( ) - Características
* { } - texto representativo

Vejamos um exemplo de um título que será convertido:
```
H(C=red){
    Introdução ao docwrite
}
```
```
<h1 color="red;">Introdução ao docwrite<\h1>
```
## O construtor
Diferente de outras estruturas de interpretador/conversor HTML, o Rucula tem estrutura simples que pode ser integrada em qualquer ambiente.

### Interpretadores de plataformas
Interpretadores de plataformas são disponibilizados para criar modelos que são Interpretados dentro da sua própria plataforma, o que implica em dizer que antes de utiliza-lo você precisa estar relacionado a àquela plataforma.

### O Interpretador Rucula
O Interpretador Rucula interpreta e cria a estrutura do seu projeto de forma que garanta a sua movimentação a qualquer lugar, isso permite a criação de documentos que podem ser disponibilizados em qualquer servidor HTTP, como apache, IIS, entre outros. O Rucula também permite a criação de documentação particular, isso permite ao usuario a liberdade de criar documentos pessoais.

## Onde utilizar o Rucula?
Antes de iniciarmos com a estrutura, vamos imaginar a seguinte situação:

"Após a efetivação de alguns estagiários na empresa **Foguete X**, foi necessário recrutar novos estagiarios.  Esses estagiários estão ansiosos para começar seu novo trabalho e infelismente devido a grande quantidade de trabalho que está tendo atualmente na **Foguete X**, o responsável pelos treinamentos iniciais encontra-se ocupado com outras tarefas."

Como resolver esse problema?

R: Poderia existir algum documento PDF, WORD ou qualquer outro que inicie esse novo relacionamento com esses estagiários.

O problema dessa resolução é a falta de centralização de conteúdo, falta de atualização e limitação de usabilidade.

Agora para resolver esse problema de forma mais elegante, mais produtiva e de forma mais flexível, poderíamos criar um projeto Rucula que direcione inicialmente esse trabalho.

**Nota:** Nesse exemplo estamos levando em consideração aspectos internos da Foguete X que são necessários para o desenvolvimento inicial de alguns estagiários, mas poderiamos também utilizar o Rucula para criarmos uma documentação especifica para algum ERP ou qualquer outro sistema, linguagem de programação, curso ou qualquer outro tipo de seguimento. São inumeras as opções quando se utiliza o Rucula.

