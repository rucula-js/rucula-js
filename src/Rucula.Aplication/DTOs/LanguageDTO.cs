namespace Rucula.Aplication;
using System.ComponentModel.DataAnnotations;
public class LanguageDTO
{

        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
}
 