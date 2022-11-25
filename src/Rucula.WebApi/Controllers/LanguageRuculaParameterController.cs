using Microsoft.AspNetCore.Mvc;
using Rucula.Aplication;

namespace Rucula.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class LanguageRuculaParameterController : ControllerBase
{
   private readonly ILanguageRuculaParameterService _languageRuculaParameterService;
   private readonly ILogger<LanguageRuculaParameterDTO> _logger;

   public LanguageRuculaParameterController(ILanguageRuculaParameterService languageService,ILogger<LanguageRuculaParameterDTO> logger)
   {
      _languageRuculaParameterService = languageService;
      _logger = logger;
   }
   [HttpGet("GetAll")]
   public async Task<IEnumerable<LanguageRuculaParameterDTO>> GetAllAsync()
   {
      return await _languageRuculaParameterService.GetAllAsync();
   }
   
   [HttpGet("GetById")]
   public async Task<LanguageRuculaParameterDTO> GetByIdAsync(string code)
   {
      return await _languageRuculaParameterService.GetByIdAsync(code);
   }
   [HttpPost]
   public async Task Post([FromBody] LanguageRuculaParameterDTO language)
   {
      await _languageRuculaParameterService.SaveAsync(language);
   }

   [HttpPut]
   public async Task Put([FromBody] LanguageRuculaParameterDTO language)
   {
      await _languageRuculaParameterService.UpdateAsync(language);
   }

   [HttpDelete]
   public async Task Deletsse([FromBody] LanguageRuculaParameterDTO language)
   {
      await _languageRuculaParameterService.DeleteAsync(language);
   }
}
