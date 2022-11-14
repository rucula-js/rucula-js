namespace Rucula.Domain;
public class KeyWord
{


     public KeyWord (int id, string name){
        this.Id = id;
        this.Name = name;
    }
    public KeyWord (int id, string name, int languageId){
        this.Id = id;
        this.Name = name;
        this.LanguageId = languageId;
    }
    public int Id { get; private set; }
    public string? Name { get; private set; }
    public int? LanguageId { get; set; }
    public Language? Language { get; set; }

    
    
}
