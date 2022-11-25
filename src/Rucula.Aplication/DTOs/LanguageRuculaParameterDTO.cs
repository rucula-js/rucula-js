namespace Rucula.Aplication;
using System.ComponentModel.DataAnnotations;
public class LanguageRuculaParameterDTO
{
        [Required]
        public string Code { get; set; }
        [Required]
        public string Representation { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public bool IsCSSClass { get; set; }

}

