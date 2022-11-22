namespace Rucula.Domain;
public class Language 
{
    public Language (int id, string name){
        ValidationPropert.ValidPropert(id < 1,"Id is Invalid");
        this.Id = id;
        ValidateProperts(name);
    }
     public Language (string name){
        ValidateProperts(name);
    }
    public int Id { get; private set; }
    public string Name { get; private set; }
    public List<KeyWord> KeyWords { get; set; }

    private void ValidateProperts(string name)
    {
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(name),"Sintax is Invalid");
        ValidationPropert.ValidPropert(name.Length > 30,"Character overflow, max 30");
        this.Name = name;
    }
}
