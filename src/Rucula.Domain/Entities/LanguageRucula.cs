namespace Rucula.Domain;
public sealed class LanguageRucula
{
    public LanguageRucula(int id, string sintax, string description)
    {
        ValidationsPropert.ValidPropert(id < 1,"Id is Invalid");
        ValidateProperts(sintax, description);
        this.Id = id;
        this.Sintax = sintax;
        this.Description = description;
    }
    public LanguageRucula(string sintax, string description)
    {
        ValidateProperts(sintax, description);
        this.Sintax = sintax;
        this.Description = description;
    }
    public int Id { get; private set; }
    public string? Sintax { get; private set; }
    public string? Description { get; private set; }

    private void ValidateProperts(string sintax, string description)
    {
        ValidationsPropert.ValidPropert(String.IsNullOrEmpty(sintax),"Sintax is Invalid");
        ValidationsPropert.ValidPropert(description.Length > 200,"Description is Invalid");
    }
}