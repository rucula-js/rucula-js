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
   public async Task<IEnumerable<LanguageRuculaDTO>> GetAllAsync()
   {
      return await _languageService.GetAllAsync();
   }
   
   [HttpGet("GetById")]
   public async Task<LanguageRuculaDTO> GetByIdAsync(string code)
   {
      return await _languageService.GetByIdAsync(code);
   }
   [HttpPost]
   public async Task<ActionResult> Post([FromBody] LanguageRuculaDTO language)
   {
      try
      {
         await _languageService.SaveAsync(language);
         return Ok(language);
      }
      catch(Exception ex)
      {
         return this.Problem(ex.Message);
      }
   }

   [HttpPut]
   public async Task Put([FromBody] LanguageRuculaDTO language)
   {
      await _languageService.UpdateAsync(language);
   }

   [HttpDelete]
   public async Task Deletsse([FromBody] LanguageRuculaDTO language)
   {
      await _languageService.DeleteAsync(language);
   }
}
