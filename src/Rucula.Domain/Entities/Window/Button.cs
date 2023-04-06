public class Button : Entity<string>
{
    public string Method { get; private set; }
    public string Post { get; private set; }
    public string Link { get; private set; }
    public string Icon { get; private set; }
    public string Text { get; private set; }
    public string Type { get; private set; }
    public string Color { get; private set; }
    public string Target { get; private set; }
    public string Urlrelative { get; private set; }
    public void Validation( string method, string post, string link, string icon, string text,
                            string type, string color, string target, string urlrelative)
    {
        
    }
}