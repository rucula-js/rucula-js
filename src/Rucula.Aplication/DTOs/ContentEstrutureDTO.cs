namespace Rucula.Aplication;
using System.ComponentModel.DataAnnotations;
public class ContentEstrutureDTO
{
        [Required]
        public string Guuid {get;set;}
        public string Description {get;set;}
        public string Next {get;set;}
        public string Previous {get;set;}
        public ContentHTMLDTO ContentHTMLFk {get;set;}
}