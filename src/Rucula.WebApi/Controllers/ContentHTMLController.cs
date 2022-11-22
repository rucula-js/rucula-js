using Microsoft.AspNetCore.Mvc;
using Rucula.Aplication;

namespace Rucula.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class ContentHTMLController : ControllerBase
{
   private readonly IContentHTMLService _contentHTMLService;
   private readonly ILogger<ContentHTMLDTO> _logger;

   public ContentHTMLController(IContentHTMLService contentHTMLService,ILogger<ContentHTMLDTO> logger)
   {
      _contentHTMLService = contentHTMLService;
      _logger = logger;
   }
   
   [HttpGet]
   public async Task<ContentHTMLDTO> GetByIdAsync(string id)
   {
      return await _contentHTMLService.GetByIdAsync(id);
   }
   [HttpDelete]
   public async Task DeleteAsync([FromBody] ContentHTMLDTO contentHTML)
   {
      await _contentHTMLService.DeleteAsync(contentHTML);
   }
}
