namespace Rucula.Domain;
public class ContentEstruture
{
    public ContentEstruture (){}
    public ContentEstruture (string guuid,string description, string next,string previous)
    {
        ValidateProperts(guuid,description, next, previous);
    }
    public string Guuid { get; private set; }
    public string Description { get; private set; }
    public string Next { get; private set; }
    public string Previous { get; private set; }
    public ContentHTML ContentHTMLFk { get;  set; } // FK
    private void ValidateProperts(string guuid, string description, string next,string previous)
    {
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(guuid),"guuid is Invalid");
        ValidationPropert.ValidPropert(guuid.Length != 36,"guuid is Invalid, len not is 36");
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(description),"description is Invalid");
        ValidationPropert.ValidPropert(description.Length > 100 ,"description is Invalid, len not is 100");
        ValidationPropert.ValidPropert(next.Length > 150,"next invalid, maximum character allowed is equal to 150");
        ValidationPropert.ValidPropert(previous.Length > 150,"previous invalid, maximum character allowed is equal to 150");
        
        this.Guuid = guuid;
        this.Description = description;
        this.Next = next;
        this.Previous = previous;

    }
}
