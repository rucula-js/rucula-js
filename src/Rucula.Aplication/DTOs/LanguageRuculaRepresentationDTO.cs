namespace Rucula.Aplication;
using System.ComponentModel.DataAnnotations;
public class LanguageRuculaRepresentationDTO
{
    [Required]
    public string? Code { get; set; }
    public string? Description { get; set; }
    public string? CodeRuculaForeKey { get; set;}
}
