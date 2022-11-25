using System.Threading.Tasks;
using System.Collections.Generic;
namespace Rucula.Domain;
public interface IContentHTMLRepository
{    
    Task<ContentHTML> GetByIdAsync(string id);
    Task DeleteAsync (ContentHTML contentHTML);
    Task SaveAsync (ContentHTML contentHTML);
}
