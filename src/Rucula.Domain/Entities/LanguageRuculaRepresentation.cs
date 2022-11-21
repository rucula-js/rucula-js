namespace Rucula.Domain;
public class LanguageRuculaRepresentation
{
    public LanguageRuculaRepresentation (string code, string description,string codeRuculaForeKey){
        ValidateProperts(code, description,codeRuculaForeKey);
    }
    public LanguageRuculaRepresentation (){
    }
    public string Code { get; private set; }
    public string? Description { get; private set; }
    public string? CodeRuculaForeKey { get; set;}
    public LanguageRucula LanguageRucula {get;set;}

    private void ValidateProperts(string code, string description,string codeRuculaForeKey)
    {
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(code),"code is Invalid");
        ValidationPropert.ValidPropert(code.Length > 50,"Character overflow, max 50");

        ValidationPropert.ValidPropert(String.IsNullOrEmpty(codeRuculaForeKey),"codeRucula is Invalid");
        ValidationPropert.ValidPropert(codeRuculaForeKey.Length > 100,"Character overflow, max 100");
        
        ValidationPropert.ValidPropert(description.Length > 100,"Character overflow, max 100");

        this.Code = code;
        this.Description = description;
        this.CodeRuculaForeKey = CodeRuculaForeKey;
    }
}
