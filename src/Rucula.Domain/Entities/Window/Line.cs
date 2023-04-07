namespace Rucula.Domain.Window;

public class Line : Entity<string>
{
    public List<Field> Fields { get; set; }
    public Frame Frame { get; set; }
    public string FrameFk { get; set; }
}