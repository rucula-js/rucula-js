using System.ComponentModel.DataAnnotations;
namespace Rucula.Aplication;
public class ColumnsGridGetDto : EntityDto<string>
{
    [Required]
    [MaxLength(40)]
    public string ParameterUrl { get; set; }
    [Required]
    [MaxLength(40)]
    public string ParameterGrid { get; set; }
    [Required]
    [MaxLength(10)]
    public string WindowFk { get; set; }    
}