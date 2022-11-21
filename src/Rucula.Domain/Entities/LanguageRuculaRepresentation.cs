namespace Rucula.Domain;
public class LanguageRuculaRepresentation
{
    public LanguageRuculaRepresentation (string code, string description,string codeRucula){
        ValidateProperts(code, description,codeRucula);
    }
    public string Code { get; private set; }
    public string? Description { get; private set; }
    public string? CodeRucula { get; set;}
    public LanguageRucula LanguageRucula;

    private void ValidateProperts(string code, string description,string codeRucula)
    {
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(code),"code is Invalid");
        ValidationPropert.ValidPropert(code.Length > 50,"Character overflow, max 50");

        ValidationPropert.ValidPropert(String.IsNullOrEmpty(codeRucula),"codeRucula is Invalid");
        ValidationPropert.ValidPropert(codeRucula.Length > 100,"Character overflow, max 100");
        
        ValidationPropert.ValidPropert(description.Length > 100,"Character overflow, max 100");

        this.Code = code;
        this.Description = description;
        this.CodeRucula = codeRucula;
    }
}
