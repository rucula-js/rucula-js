namespace Rucula.Domain.Window;
public class Button : Entity<string>
{
    public Button(string id, string method, string post, string link, string icon, string text,
                            string type, string color, string target, string urlrelative)
    {
        Validation(id, method, post, link, icon, text, type, color, target, urlrelative);
    }
    public string Method { get; private set; }
    public string Post { get; private set; }
    public string Link { get; private set; }
    public string Icon { get; private set; }
    public string Text { get; private set; }
    public string Type { get; private set; }
    public string Color { get; private set; }
    public string Target { get; private set; }
    public string Urlrelative { get; private set; }
    public Window Window { get; set; }
    public string WindowFk { get; set; }
    public void Validation(string id, string method, string post, string link, string icon, string text,
                            string type, string color, string target, string urlrelative)
    {
        #region Id
        id.IsRequerid().AddThrowExceptionDomain("id is requerid");
        id.MaxLength(10).AddThrowExceptionDomain("id must be a maximum of 10 characters");
        #endregion
        method.MaxLength(20).AddThrowExceptionDomain("method must be a maximum of 20 characters");
        post.MaxLength(20).AddThrowExceptionDomain("post must be a maximum of 20 characters");
        link.MaxLength(120).AddThrowExceptionDomain("link must be a maximum of 120 characters");
        icon.MaxLength(30).AddThrowExceptionDomain("icon must be a maximum of 30 characters");
        text.MaxLength(20).AddThrowExceptionDomain("text must be a maximum of 20 characters");
        type.IsRequerid().AddThrowExceptionDomain("type is requerid");
        type.MaxLength(20).AddThrowExceptionDomain("type must be a maximum of 20 characters");
        color.MaxLength(20).AddThrowExceptionDomain("color must be a maximum of 20 characters");
        target.MaxLength(30).AddThrowExceptionDomain("target must be a maximum of 30 characters");
        urlrelative.MaxLength(100).AddThrowExceptionDomain("target must be a maximum of 100 characters");

        this.Id = id;
        this.Method = method;
        this.Post = post;
        this.Link = link;
        this.Icon = icon;
        this.Text = text;
        this.Type = type;
        this.Color = color;
        this.Target = target;
        this.Urlrelative = urlrelative;
    }
}