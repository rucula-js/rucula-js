namespace Rucula.Domain;
public class ContentEstruture
{
    public ContentEstruture (){}
    public ContentEstruture (string guuid, string next,string previous)
    {
        ValidateProperts(guuid, next, previous);
    }
    public string Guuid { get; private set; }
    public string Next { get; private set; }
    public string Previous { get; private set; }
    public string ContentFk { get;  set; }
    public ContentHTML ContentHTML { get; set; }
    private void ValidateProperts(string guuid, string next,string previous)
    {
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(guuid),"guuid is Invalid");
        ValidationPropert.ValidPropert(guuid.Length != 36,"guuid is Invalid, len not is 36");
        ValidationPropert.ValidPropert(next.Length > 150,"next invalid, maximum character allowed is equal to 150");
        ValidationPropert.ValidPropert(previous.Length > 150,"previous invalid, maximum character allowed is equal to 150");
        
        this.Guuid = guuid;
        this.Next = next;
        this.Previous = previous;

    }
}
