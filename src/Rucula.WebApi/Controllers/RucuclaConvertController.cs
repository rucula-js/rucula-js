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
   public ActionResult Post([FromBody] string contentRucula)
   {
      try
      {
         return Ok( new {
            content = _extractRuculaService.ConvertSintaxRucula(contentRucula)
         });
      }
      catch(Exception ex)
      {
         return this.Problem(ex.Message);
      }
   }
}
