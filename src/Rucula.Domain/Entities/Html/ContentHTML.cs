namespace Rucula.Domain;
public class ContentHTML
{
    public ContentHTML (){}
    public ContentHTML (string guuid, string content, string contentLanguaRucula)
    {
        ValidateProperts(guuid, content,contentLanguaRucula);
    }
    public string Guuid { get; private set; }
    public string Content { get; private set; }
    public DateTime DateCreation { get; private set; }
    public DateTime DateLastUpdate { get; private set; }
    public string ContentLanguageRucula { get; private set; }
    // FK Content Estruture
    public string ContentEstrutureForeignKey { get; private set; }
    public ContentEstruture ContentEstruture { get; private set; }
        
    private void ValidateProperts(string guuid, string content,string contentLanguaRucula)
    {
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(guuid),"guuid is Invalid");
        ValidationPropert.ValidPropert(guuid.Length != 36,"guuid is Invalid, len not is 36");
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(content),"content is Invalid");
        ValidationPropert.ValidPropert(content.Length > 1300,"content invalid, maximum character allowed is equal to 1300");
        ValidationPropert.ValidPropert(contentLanguaRucula.Length > 3000,"contentLanguaRucula invalid, maximum character allowed is equal to 3000");

        this.Guuid = guuid;
        this.Content = content;
        this.ContentLanguageRucula = contentLanguaRucula;

    }
}
