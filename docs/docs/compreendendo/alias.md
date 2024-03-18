No rucula-js a inserção da valores é feita na maior parte atravéz dos inputs na janela do usuário, entretanto, pode haver momentos em que se deseja fazer inserções ou leituras de formas manuais.


## O que é o Alias?

O `alias` é um nome ficticio que criamos no frame para representar de outra maneira o mesmo objeto presente no frame.

## Qual problema ele resolve?

`alias` não é só uma forma de criar identificadores menos verbosos ou uma segunda sintaxe de obtenção de propriedades e objetos, o `alias` é útil porque pode haver situações em que mais de um frame possua o mesmo nome em sua propriedade `objectDto`, isso causaria conflito, pois internamente não seria possível saber com exatidão a qual objeto se refere. Com isso o `alias` foi adotado.


Exemplo: 
    
    Objeto: Endereco = {a:22} => alias: EndCliente 
    Objeto: Endereco = {a:33 }=> alias: EndFornecedor

    EndCliente.a = 22
    EndFornecedor.a = 33

## Onde ele é Usado?

O `alias`  pode ser usado em grande parte das funções do gerenciador de objetos do rucula-js e no construtor de URL's interno. Suas capacidades são:

- ler objeto unico, isso para `frames` do tipo `block`
- ler objeto em linha, isso para `frames` do tipo `line`
- ler valores de propriedades
- inserir valores em propriedades
- complemeto para preparação de criação de URL's
