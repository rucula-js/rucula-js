namespace Rucula.Domain;
public class TagMetaHTML
{

    public TagMetaHTML (){}
    public TagMetaHTML (string guuid, string name, string propert, string content ,string description){
        ValidateProperts(guuid, name, propert, content, description);
    }
    public string Guuid { get; private set; }
    public string Name { get; private set; }
    public string Propert { get; private set;}
    public string Content { get; private set;}
    public string Description { get; private set;}
    public string ContentHTMLFk { get; set;}
    
    public ContentHTML ContentHTML { get; set;}

    private void ValidateProperts(string guuid, string name, string propert, string content, string description)
    {
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(guuid),"guuid is Invalid");
        ValidationPropert.ValidPropert(guuid.Length != 36,"guuid is Invalid, len not is 36");
        
        ValidationPropert.ValidPropert(name.Length > 30,"name Character overflow, max 36");
        ValidationPropert.ValidPropert(propert.Length > 30,"propert Character overflow, max 36");

        ValidationPropert.ValidPropert(name.Length > 1 && propert.Length> 1,"name and property, only one of the options must have value");
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(name) && String.IsNullOrEmpty(propert),"name and property, one of the properties must contain value");

        ValidationPropert.ValidPropert(content.Length > 200,"content Character overflow, max 200");
        ValidationPropert.ValidPropert(description.Length > 100,"description Character overflow, max 100");

        this.Guuid = guuid;
        this.Name = name;
        this.Propert = propert;
        this.Content = content;
        this.Description = description;
    }
}
