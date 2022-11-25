public class LanguageRuculaParameter
{
    public string Code { get; private set; }
    public string Representation { get; private set; }
    public string Description { get; private set; }
    public bool IsCSSClass { get; private set; }

    public LanguageRuculaParameter ()
    {

    }
    public LanguageRuculaParameter (string code, string representation,string description, bool isCSSClass)
    {
        ValidateProperts(code, representation, description, isCSSClass);
    }
    private void ValidateProperts(string code, string representation,string description, bool isCSSClass)
    {
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(code),"code is Invalid");
        ValidationPropert.ValidPropert(code.Length > 50,"Character overflow, max 50");

        ValidationPropert.ValidPropert(String.IsNullOrEmpty(representation),"representation is Invalid");
        ValidationPropert.ValidPropert(representation.Length > 50,"Character overflow, max 50");
        
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(description),"description is Invalid");
        ValidationPropert.ValidPropert(description.Length > 100,"Character overflow, max 100");

        this.Code = code;
        this.Representation = representation;
        this.Description = description;
        this.IsCSSClass = isCSSClass;
    }
}