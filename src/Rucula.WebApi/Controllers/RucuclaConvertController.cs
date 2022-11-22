using Microsoft.AspNetCore.Mvc;
using Rucula.Aplication;

namespace Rucula.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class RucuclaConvertController : ControllerBase
{
   private readonly IExtractRuculaService _extractRuculaService;

   public RucuclaConvertController(IExtractRuculaService extractRuculaService)
   {
      _extractRuculaService = extractRuculaService; 
   }
   [HttpPost]
   public string Post([FromBody] string contentRucula)
   {
      return  _extractRuculaService.ConvertSintaxRucula(contentRucula); 
   }
}
