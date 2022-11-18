using Microsoft.AspNetCore.Mvc;
using Rucula.Aplication;

namespace Rucula.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class LanguageController : ControllerBase
{
   private readonly ILanguageService _languageService;
   private readonly ILogger<LanguageDTO> _logger;

   public LanguageController(ILanguageService languageService,ILogger<LanguageDTO> logger)
   {
      _languageService = languageService;
      _logger = logger;
   }
   [HttpGet("GetLanguageAll")]
   public async Task<IEnumerable<LanguageDTO>> GetAsync()
   {
      return await _languageService.GetLanguageAsync();
   }
   
   [HttpGet("GetLanguageById")]
   public async Task<LanguageDTO> GetByIdAsync(int id)
   {
      return await _languageService.GetLanguageByIdAsync(id);
   }
   [HttpPost(Name = "PostLanguage")]
   public async Task SaveAsync([FromBody] LanguageDTO language)
   {
      await _languageService.SaveAsync(language);
   }

   [HttpPut(Name = "UpdateLanguage")]
   public async Task UpdateAsync([FromBody] LanguageDTO language)
   {
      await _languageService.UpdateAsync(language);
   }

   [HttpDelete(Name = "DeleteLanguage")]
   public async Task DeleteAsync([FromBody] LanguageDTO language)
   {
      await _languageService.DeleteAsync(language);
   }
}
