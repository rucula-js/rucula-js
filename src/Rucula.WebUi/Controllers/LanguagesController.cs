using Microsoft.AspNetCore.Mvc;
using Rucula.Domain;

namespace Rucula.WebUi.Controllers;

[ApiController]
[Route("[controller]")]
public class LanguagesController : ControllerBase
{
    [HttpGet]
    public object Get ()
    {
        return 
        new {
            Id = 1,
            Name = "Reginaldo"
        };
    }
}
