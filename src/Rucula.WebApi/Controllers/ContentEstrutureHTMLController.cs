using Microsoft.AspNetCore.Mvc;
using Rucula.Aplication;

namespace Rucula.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ContentEstrutureHTMLController : ControllerBase
{
   private readonly IContentEstrutureHTMLService _contentHTMLService;
   private readonly IExtractRuculaService _extractRuculaService;
   private readonly ILogger<ContentHTMLDTO> _logger;

   public ContentEstrutureHTMLController(IContentEstrutureHTMLService contentHTMLService,IExtractRuculaService extractRuculaService,ILogger<ContentHTMLDTO> logger)
   {
      _contentHTMLService = contentHTMLService;
      _extractRuculaService = extractRuculaService; 
      _logger = logger;
   }
   [HttpGet]
   public async Task<ContentEstrutureDTO> Get(string id)
   {
      return await _contentHTMLService.GetByIdAsync(id);
   }
   [HttpDelete]
   public async Task Delete([FromBody] ContentEstrutureDTO contentHTML)
   {
      await _contentHTMLService.DeleteAsync(contentHTML);
   }
   [HttpPost]
   public async Task Post([FromBody] ContentEstrutureDTO contentHTML)
   {
      // contentHTML.Content =_extractRuculaService.ConvertSintaxRucula(contentHTML.ContentLanguageRucula); 
      await _contentHTMLService.SaveAsync(contentHTML);
   }
}
