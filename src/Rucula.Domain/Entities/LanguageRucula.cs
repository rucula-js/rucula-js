namespace Rucula.Domain;
public sealed class LanguageRucula
{
    public LanguageRucula(int id, string sintax, string description)
    {
        ValidationPropert.ValidPropert(id < 1,"Id is Invalid");
        this.Id = id;
        ValidateProperts(sintax, description);
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
        ValidationPropert.ValidPropert(String.IsNullOrEmpty(sintax),"Sintax is Invalid");
        ValidationPropert.ValidPropert(sintax.Length > 100,"Character overflow, max 100");
        ValidationPropert.ValidPropert(description.Length > 200,"Character overflow, max 200");
        this.Sintax = sintax;
        this.Description = description;
    }
}