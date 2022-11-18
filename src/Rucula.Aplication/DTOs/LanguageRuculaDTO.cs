namespace Rucula.Aplication;
using System.ComponentModel.DataAnnotations;
public class LanguageRuculaDTO
{

        [Required]
        public int Id { get; set; }
        [Required]
        public string? Sintax { get;set; }
        public string? Description { get;set; }
        
}
 