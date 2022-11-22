using Microsoft.AspNetCore.Mvc;
using Rucula.Aplication;

namespace Rucula.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class LanguageRuculaRepresentationController : ControllerBase
{
   private readonly ILanguageRuculaRepresentationService _languageServiceRepresentation;
   private readonly ILogger<LanguageRuculaRepresentationDTO> _logger;
   public LanguageRuculaRepresentationController(ILanguageRuculaRepresentationService languageServiceRepresentation,ILogger<LanguageRuculaRepresentationDTO> logger)
   {
      _languageServiceRepresentation = languageServiceRepresentation;
      _logger = logger;
   }
   [HttpGet("GetAll")]
   public async Task<IEnumerable<LanguageRuculaRepresentationDTO>> Get()
   {
      return await _languageServiceRepresentation.GetAllAsync();
   }
   
   [HttpGet("GetByCode")]
   public async Task<LanguageRuculaRepresentationDTO > Get(string code)
   {
      return await _languageServiceRepresentation.GetByCodeAsync(code);
   }
   [HttpPost]
   public async Task SaveAsync([FromBody] LanguageRuculaRepresentationDTO  languageRepresentation)
   {
      await _languageServiceRepresentation.SaveAsync(languageRepresentation);
   }

   [HttpPut]
   public async Task UpdateAsync([FromBody] LanguageRuculaRepresentationDTO  languageRepresentation)
   {
      await _languageServiceRepresentation.UpdateAsync(languageRepresentation);
   }

   [HttpDelete]
   public async Task DeleteAsync([FromBody] LanguageRuculaRepresentationDTO  languageRepresentation)
   {
      await _languageServiceRepresentation.DeleteAsync(languageRepresentation);
   }
}
