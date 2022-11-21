namespace Rucula.Domain;
public class TagMetaHTML
{

    public TagMetaHTML (){}
    public TagMetaHTML (string guuid, string name, string propert, string description){
        ValidateProperts(guuid, name, propert, description);
    }
    public string Guud { get; private set; }
    public string? Name { get; private set; }
    public bool? Propert { get; private set;}
    public bool? Description { get; private set;}

    private void ValidateProperts(string guuid, string name, string propert, string description)
    {
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(guuid),"guuid is Invalid");
        ValidationPropert.ValidPropert(guuid.Length != 30,"guuid is Invalid, len not is 32");
        
        ValidationPropert.ValidPropert(name.Length > 30,"name Character overflow, max 30");
        ValidationPropert.ValidPropert(propert.Length > 30,"propert Character overflow, max 30");

        ValidationPropert.ValidPropert(name.Length > 1 && propert.Length> 1,"name and property, only one of the options must have value");
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(name) || String.IsNullOrEmpty(propert),"name and property, one of the properties must contain value");

        ValidationPropert.ValidPropert(description.Length > 100,"Character overflow, max 100");
    }
}
