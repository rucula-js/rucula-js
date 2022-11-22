namespace Rucula.Aplication;
public interface ILanguageRuculaRepresentationService
{
    Task<IEnumerable<LanguageRuculaRepresentationDTO>> GetAllAsync();
    Task<LanguageRuculaRepresentationDTO> GetByCodeAsync(string code);
    Task SaveAsync (LanguageRuculaRepresentationDTO languageService);
    Task UpdateAsync (LanguageRuculaRepresentationDTO languageService);
    Task DeleteAsync (LanguageRuculaRepresentationDTO languageService);
}
 