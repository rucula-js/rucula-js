using System.ComponentModel.DataAnnotations;
namespace Rucula.Aplication;
public class ColumnsDto : EntityDto<string>
{
    [Required]
    [MaxLength(40)]
    public string Name { get;  set; }

    [Required]
    [MaxLength(10)]
    public string WindowFk { get; set; }
}