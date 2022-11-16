namespace Rucula.Domain;
public class KeyWord
{
     public KeyWord (int id, string name){
        ValidationPropert.ValidPropert(id < 1,"Id is Invalid");
        this.Id = id;
        ValidateProperts(name);
    }
    public KeyWord (int id, string name, int languageId){
        ValidationPropert.ValidPropert(id < 1,"Id is Invalid");
        ValidationPropert.ValidPropert(languageId < 1,"LanguageId is Invalid");
        this.Id = id;
        this.LanguageId = languageId;
        ValidateProperts(name);
    }
    public int Id { get; private set; }
    public string? Name { get; private set; }
    public int? LanguageId { get; set; }
    public Language? Language { get; set; }

    private void ValidateProperts(string name)
    {
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(name),"Sintax is Invalid");
        ValidationPropert.ValidPropert(name.Length > 30,"Character overflow, max 30");
        this.Name = name;
    }
}
