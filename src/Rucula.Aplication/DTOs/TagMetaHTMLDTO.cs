namespace Rucula.Aplication;
using System.ComponentModel.DataAnnotations;
public class TagMetaHTMLDTO
{
        [Required]
        public string Guuid { get;  set; }
        public string Name { get;  set; }
        public string Propert { get;  set;}
        public string Content { get;  set;}
        public string Description { get;  set;}
}
