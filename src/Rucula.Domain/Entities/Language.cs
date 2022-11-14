namespace Rucula.Domain;
public class Language
{

    public Language (int id, string name){
        this.Id = id;
        this.Name = name;
    }
    public int Id { get; private set; }
    public string? Name { get; private set; }
    public List<KeyWord> KeyWords { get; set; }

    
}
