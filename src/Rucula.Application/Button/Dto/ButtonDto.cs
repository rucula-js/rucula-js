namespace Rucula.Aplication;
public class ButtonDto : EntityDto<string>
{
    public string Method { get; set; }
    public string Post { get; set; }
    public string Link { get; set; }
    public string Icon { get; set; }
    public string Text { get; set; }
    public string Type { get; set; }
    public string Color { get; set; }
    public string Target { get; set; }
    public string Urlrelative { get; set; }
    public string WindowFk { get; set; }
}