namespace Rucula.Domain;
public class AtributesHTML
{
    public AtributesHTML (){}
    public AtributesHTML (string code, string description, bool isAtributeClass){
        ValidateProperts(code, description, isAtributeClass);
    }
    public string Code { get; private set; }
    public string Description { get; private set; }
    public bool IsAtributeClass { get; private set;}

    private void ValidateProperts(string code, string description, bool isAtributeClass)
    {
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(code),"code is Invalid");
        ValidationPropert.ValidPropert(code.Length > 50,"Character overflow, max 50");
        ValidationPropert.ValidPropert(description.Length > 100,"Character overflow, max 100");
        this.Code = code;
        this.Description = description;
        this.IsAtributeClass = isAtributeClass;
    }
}
