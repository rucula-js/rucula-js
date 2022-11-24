using System.Threading.Tasks;
using System.Collections.Generic;

namespace Rucula.Domain;
public interface ILanguageRuculaRepository
{    
    Task<IEnumerable<LanguageRucula>> GetAllAsync();
    Task<LanguageRucula> GetByIdAsync(string id);
    Task SaveAsync (LanguageRucula languageRucula);
    Task UpdateAsync (LanguageRucula languageRucula);
    Task DeleteAsync (LanguageRucula languageRucula);
}
