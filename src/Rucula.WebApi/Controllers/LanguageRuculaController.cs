using Microsoft.AspNetCore.Mvc;
using Rucula.Aplication;

namespace Rucula.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class LanguageRuculaController : ControllerBase
{
   private readonly ILanguageRuculaService _languageService;
   private readonly ILogger<LanguageRuculaDTO> _logger;

   public LanguageRuculaController(ILanguageRuculaService languageService,ILogger<LanguageRuculaDTO> logger)
   {
      _languageService = languageService;
      _logger = logger;
   }
   [HttpGet("GetAll")]
   public async Task<IEnumerable<LanguageRuculaDTO>> GetAsync()
   {
      return await _languageService.GetAllAsync();
   }
   
   [HttpGet("GetById")]
   public async Task<LanguageRuculaDTO> GetByIdAsync(int id)
   {
      return await _languageService.GetByIdAsync(id);
   }
   [HttpPost]
   public async Task SaveAsync([FromBody] LanguageRuculaDTO language)
   {
      await _languageService.SaveAsync(language);
   }

   [HttpPut]
   public async Task UpdateAsync([FromBody] LanguageRuculaDTO language)
   {
      await _languageService.UpdateAsync(language);
   }

   [HttpDelete]
   public async Task DeleteAsync([FromBody] LanguageRuculaDTO language)
   {
      await _languageService.DeleteAsync(language);
   }
}
