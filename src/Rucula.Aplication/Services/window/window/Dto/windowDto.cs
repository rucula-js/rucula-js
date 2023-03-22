using System.ComponentModel.DataAnnotations;
public class windowDto : EntityDto<string>
{
    [Required]
    [MaxLength(10)]
    public string Name { get; set; }
    [MaxLength(20)]
    public string URLRoot { get; set; }
    [MaxLength(20)]
    public string URLGetAll { get; set; }
    [MaxLength(20)]
    public string URLGetId { get; set; }
    [Required]
    [MaxLength(10)]
    public string Type { get; set; }
}