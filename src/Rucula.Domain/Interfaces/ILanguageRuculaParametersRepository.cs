using System.Threading.Tasks;
using System.Collections.Generic;

namespace Rucula.Domain;
public interface ILanguageRuculaParameterRepository
{    
    Task<IEnumerable<LanguageRuculaParameter>> GetAllAsync();
    Task<LanguageRuculaParameter> GetByIdAsync(string id);
    Task SaveAsync (LanguageRuculaParameter languageRucula);
    Task UpdateAsync (LanguageRuculaParameter languageRucula);
    Task DeleteAsync (LanguageRuculaParameter languageRucula);
}
