namespace Rucula.Domain;
public interface ILanguageRuculaRepository
{    
    Task<IEnumerable<LanguageRucula>> GetAllAsync();
    Task<LanguageRucula> GetByIdAsync(int? id);
    Task SaveAsync (LanguageRucula languageRucula);
    Task UpdateAsync (LanguageRucula languageRucula);
    Task DeleteAsync (LanguageRucula languageRucula);
}
