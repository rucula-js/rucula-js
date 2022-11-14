using System.Threading.Tasks;
using System.Collections.Generic;
namespace Rucula.Domain;
public interface IKeyWordRepository
{    
    Task<IEnumerable<KeyWord>> GetKeyWordAsync();
    Task<KeyWord> GetKeyWordByIdAsync(int? id);
    Task SaveAsync (KeyWord KeyWord);
    Task UpdateAsync (KeyWord KeyWord);
    Task DeleteAsync (KeyWord KeyWord);
}
