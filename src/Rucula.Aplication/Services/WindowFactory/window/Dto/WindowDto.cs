using System.ComponentModel.DataAnnotations;
using Rucula.Domain.Window;

namespace Rucula.Aplication.WindowFactory;
public class WindowDto : EntityDto<string>
{
    [Required]
    [MaxLength(10)]
    public string Name { get; set; }
    [MaxLength(60)]
    public string URLRoot { get; set; }
    [MaxLength(20)]
    public string URLGetAll { get; set; }
    [MaxLength(20)]
    public string URLGetId { get; set; }
    [Required]
    [MaxLength(10)]
    public string Type { get; set; }
    public IReadOnlyCollection<FrameDto> Frames {get;set;} 
    public IReadOnlyCollection<ColumnsDto> Columns { get; set; }
    public IReadOnlyCollection<ColumnsGridGetDto> ColumnsGridGet { get; set; } 

}