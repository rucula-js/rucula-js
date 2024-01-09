A seguir, iremos mostrar como consumir a api do VIA CEP a partir de eventos de campos. O objetivo principal desse guia é mostrar a flexbilidade que existe ao se trabalhar com eventos no rucula-js.

<p align="center">
    <img alt="Exemplo de um Frame de Endereço no rucula-js" src="../../assets/viacep-com-evento-de-campo_frame-cliente-endereco.png">  
</p>


Após sair do campo `CEP` queremos preencher os demais campos com a API via CEP.

> Observe abaixo que os valores passados se dão por meio da instrução `rucula.set`



```ts
form?.addEventListener('after.endereco.cep',(e) => {
        
        let cep = (document?.getElementsByName('block.endereco.cep')[0] as HTMLInputElement).value

        const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;

        fetch(apiUrl)
        .then(response => {

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            
            return response.json();
        })
        .then(data => {

            rucula.set({ type:'block', objectDto:"endereco", propertDto: "logradouro",  value: data["logradouro"]})
            rucula.set({ type:'block', objectDto:"endereco", propertDto: "bairro", value: data["bairro"]})
            rucula.set({ type:'block', objectDto:"endereco", propertDto: "cidade", value: data["logradouro"]})
            rucula.set({ type:'block', objectDto:"endereco", propertDto: "estado", value: data["uf"]})
            rucula.set({ type:'block', objectDto:"endereco", propertDto: "pais", value:"BR"})
    
          }) 
        .catch(error => {
            console.error('Erro na requisição:', error.message);
          });
        })

```

Após o evento chamado, o frame de endereço será preenchido


<p align="center">
    <img alt="Exemplo de um Frame de Endereço no rucula-js" src="../../assets/viacep-com-evento-de-campo_frame-cliente-preenchido.png">  
</p>



