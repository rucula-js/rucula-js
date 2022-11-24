namespace Rucula.Aplication;
public interface ILanguageRuculaService
{
    Task<IEnumerable<LanguageRuculaDTO>> GetAllAsync();
    Task<LanguageRuculaDTO> GetByIdAsync(string code);
    Task SaveAsync (LanguageRuculaDTO languageService);
    Task UpdateAsync (LanguageRuculaDTO languageService);
    Task DeleteAsync (LanguageRuculaDTO languageService);
}
 