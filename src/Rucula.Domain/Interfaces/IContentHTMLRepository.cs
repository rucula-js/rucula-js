using System.Threading.Tasks;
using System.Collections.Generic;
namespace Rucula.Domain;
public interface IContentHTMLRepository
{    
    Task<ContentEstruture> GetByIdAsync(string id);
    Task DeleteAsync (ContentEstruture contentHTML);
    Task SaveAsync (ContentEstruture contentHTML);
}
