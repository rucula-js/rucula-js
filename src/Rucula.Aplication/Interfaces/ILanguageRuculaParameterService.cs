namespace Rucula.Aplication;
public interface ILanguageRuculaParameterService
{
    Task<IEnumerable<LanguageRuculaParameterDTO>> GetAllAsync();
    Task<LanguageRuculaParameterDTO> GetByIdAsync(string code);
    Task SaveAsync (LanguageRuculaParameterDTO languageParameterService);
    Task UpdateAsync (LanguageRuculaParameterDTO languageParameterService);
    Task DeleteAsync (LanguageRuculaParameterDTO languageParameterService);
}
 