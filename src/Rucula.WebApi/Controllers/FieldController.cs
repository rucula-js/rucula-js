using Microsoft.AspNetCore.Mvc;
using Rucula.Aplication.WindowFactory;

namespace Rucula.WebApi.Controllers;

[ApiController]
[Route("[controller]")]
public class FieldController : ControllerBase
{
   private readonly IFieldService _fieldService;
   public FieldController(IFieldService windowService)
   {
      _fieldService = windowService;
   }
   [HttpGet]
   [Route("GetAll")]
   public async Task<IReadOnlyCollection<FieldDto>> Get()
   {
      return await _fieldService.GetAllAsync();
   }
   [HttpGet]
   public async Task<FieldDto>  Get(string id)
   {
      return await _fieldService.GetAsync(id);
   }
   [HttpPost]
   public async Task Post([FromBody] FieldDto input)
   {
      await _fieldService.InsertAsync(input);
   }
   [HttpPut]
   public async Task Put([FromBody] FieldDto input)
   {
      await _fieldService.AlterAsync(input);
   }
   [HttpDelete]
   public async Task Delete(string id)
   {
      await _fieldService.DeleteAsync(id);
   }
}
