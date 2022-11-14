namespace Rucula.Aplication;
public interface ILanguageService
{
Task<IEnumerable<LanguageDTO>> GetLanguageAsync();
    Task<LanguageDTO> GetLanguageByIdAsync(int? id);
    Task SaveAsync (LanguageDTO Language);
    Task UpdateAsync (LanguageDTO Language);
    Task DeleteAsync (LanguageDTO Language);
}
 