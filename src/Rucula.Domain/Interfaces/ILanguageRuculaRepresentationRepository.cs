namespace Rucula.Domain;
public interface ILanguageRuculaRepresentationRepository
{
    Task<IEnumerable<LanguageRuculaRepresentation>> GetAllAsync();
    Task<LanguageRuculaRepresentation> GetByCodeAsync(string code);
    Task SaveAsync (LanguageRuculaRepresentation languageRuculaRepresentation);
    Task UpdateAsync (LanguageRuculaRepresentation languageRuculaRepresentation);
    Task DeleteAsync (LanguageRuculaRepresentation languageRuculaRepresentation);
}
