using Microsoft.AspNetCore.Mvc;
using Rucula.Aplication;

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
   [HttpPost]
   public async Task Post([FromBody] windowDto input)
   {
      await _windowService.SaveAsync(input);
   }
}
