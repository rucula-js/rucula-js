using Microsoft.AspNetCore.Mvc;
using Rucula.Aplication;
using Rucula.Aplication.WindowFactory;

namespace Rucula.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class WindowController : ControllerBase
{
   private readonly IWindowService _windowService;
   public WindowController(IWindowService windowService)
   {
      _windowService = windowService;
   }
   // [HttpGet]
   // public async Task<IReadOnlyCollection<WindowDto>> Get()
   // {
   //    return await _windowService.GetAllAsync();
   // }
   [HttpGet]
   public async Task<WindowDto>  Get(string id)
   {
      return await _windowService.GetAsync(id);
   }
   [HttpPost]
   public async Task Post([FromBody] WindowDto input)
   {
      await _windowService.InsertAsync(input);
   }
   [HttpPut]
   public async Task Put([FromBody] WindowDto input)
   {
      await _windowService.AlterAsync(input);
   }
   [HttpDelete]
   public async Task Delete(string id)
   {
      await _windowService.DeleteAsync(id);
   }
}
