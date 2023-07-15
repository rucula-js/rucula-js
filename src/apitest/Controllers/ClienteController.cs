using Microsoft.AspNetCore.Mvc;
using apitest.models;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace apitest.Controllers;

[ApiController]
[Route("[controller]")]
public class ClienteController : ControllerBase
{
    public ClienteController()
    {
        Clientes.Add(new Cliente{Id=11, Nome ="Reginaldo Marinho", Rg="45887957-4", CPF="5646457821"});
    }
    private List<Cliente> Clientes = new ();

    [HttpPost]
    public void Post([FromBody]Cliente cliente)
    {
        Clientes.Add(cliente);
    }
    [HttpGet]
    public List<Cliente> Get()
    {
       return Clientes;   
    }
}
