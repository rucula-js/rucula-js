using System.ComponentModel.DataAnnotations;
namespace Rucula.Aplication.WindowFactory;
public class FrameDto : EntityDto<string>
{
    [Required]
    [MaxLength(20)]
    public string Name { get; set; }
    [Required]
    [MaxLength(10)]
    public string Type { get; set; }
    [Required]
    [MaxLength(20)]
    public string ObjectDto { get; set; }
    public short  Sequence { get; set; }
    public string WindowFk { get; set; }
    public IReadOnlyCollection<FieldDto> Fields {get;set;} 

}