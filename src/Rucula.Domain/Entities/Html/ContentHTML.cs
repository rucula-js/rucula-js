namespace Rucula.Domain;
public class ContentHTML
{
    public ContentHTML (){}
    public ContentHTML (string guuid, string content, DateTime dateCreation, DateTime datelastUpdate)
    {
        ValidateProperts(guuid, content, dateCreation, datelastUpdate);
    }
    public string Guuid { get; private set; }
    public string Content { get; private set; }
    public DateTime DateCreation { get; private set; }
    public DateTime DateLastUpdate { get; private set; }
    public ICollection<TagMetaHTML> TagMetaHTML{ get; set; }
    public ContentEstruture ContentEstruture{ get; set; }

    private void ValidateProperts(string guuid, string content, DateTime dateCreation, DateTime datelastUpdate)
    {
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(guuid),"guuid is Invalid");
        ValidationPropert.ValidPropert(guuid.Length != 36,"guuid is Invalid, len not is 36");
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(content),"content is Invalid");
        ValidationPropert.ValidPropert(content.Length > 1300,"content invalid, maximum character allowed is equal to 1300");
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(Convert.ToString(dateCreation)),"dateCreation is requerid");
        ValidationPropert.ValidPropert(datelastUpdate < dateCreation,"date last Update less than creation date");

        this.Guuid = guuid;
        this.Content = content;
        this.DateCreation = dateCreation;
        this.DateLastUpdate = datelastUpdate;

    }
}
