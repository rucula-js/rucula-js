using Microsoft.AspNetCore.Mvc;
using Rucula.Aplication;

namespace Rucula.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ContentEstrutureHTMLController : ControllerBase
{
   private readonly IContentEstrutureHTMLService _contentEstrutureHTMLService;
   private readonly ILogger<ContentHTMLDTO> _logger;

   public ContentEstrutureHTMLController(IContentEstrutureHTMLService contentEstrutureHTMLService,ILogger<ContentHTMLDTO> logger)
   {
      _contentEstrutureHTMLService = contentEstrutureHTMLService;
      _logger = logger;
   }
   [HttpGet]
   public async Task<ContentEstrutureDTO> Get(string id)
   {
      return await _contentEstrutureHTMLService.GetByIdAsync(id);
   }
   [HttpDelete]
   public async Task Delete([FromBody] ContentEstrutureDTO ContentEstruture)
   {
      await _contentEstrutureHTMLService.DeleteAsync(ContentEstruture);
   }
   [HttpPost]
   public async Task Post([FromBody] ContentEstrutureDTO ContentEstruture)
   {
      await _contentEstrutureHTMLService.SaveAsync(ContentEstruture);
   }
}
