using System.Threading.Tasks;
using System.Collections.Generic;
namespace Rucula.Domain;
public interface ILanguageRepository
{    
    Task<IEnumerable<Language>> GetLanguageAsync();
    Task<Language> GetLanguageByIdAsync(int? id);
    Task SaveAsync (Language Language);
    Task UpdateAsync (Language Language);
    Task DeleteAsync (Language Language);
}
