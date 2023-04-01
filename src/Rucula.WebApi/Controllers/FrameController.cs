using Microsoft.AspNetCore.Mvc;
using Rucula.Aplication.WindowFactory;

namespace Rucula.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class FrameController : ControllerBase
{
   private readonly IFrameService _frameService;
   public FrameController(IFrameService windowService)
   {
      _frameService = windowService;
   }
   // [HttpGet]
   // public async Task<IReadOnlyCollection<FrameDto>> Get()
   // {
   //    return await _frameService.GetAllAsync();
   // }
   [HttpGet]
   public async Task<FrameDto>  Get(string id)
   {
      return await _frameService.GetAsync(id);
   }
   [HttpPost]
   public async Task Post([FromBody] FrameDto input)
   {
      await _frameService.InsertAsync(input);
   }
   [HttpPut]
   public async Task Put([FromBody] FrameDto input)
   {
      await _frameService.AlterAsync(input);
   }
   [HttpDelete]
   public async Task Delete(string id)
   {
      await _frameService.DeleteAsync(id);
   }
}
