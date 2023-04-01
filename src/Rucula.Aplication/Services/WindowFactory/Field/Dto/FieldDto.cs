using System.ComponentModel.DataAnnotations;
namespace Rucula.Aplication.WindowFactory;
public class FieldDto : EntityDto<string>
{
    [Required]
    [MaxLength(20)]
    public string PropertDto { get; set; }
    [Required]
    [MaxLength(20)]
    public string Description { get; set; }
    [MaxLength(50)]
    public string Information { get; set; }
    [Required]
    [MaxLength(10)]
    public string Type { get; set; }
    public short MaxLength { get; set; }
    public short Max { get; set; }
    public short Min { get; set; }
    public bool Requerid { get; set; }
    public bool  Disable { get; set; }
    public string FrameFk { get; set; }
}