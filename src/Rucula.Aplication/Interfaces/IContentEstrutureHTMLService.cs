namespace Rucula.Aplication;
public interface IContentEstrutureHTMLService
{
    Task<ContentEstrutureDTO> GetByIdAsync(string id);
    Task DeleteAsync (ContentEstrutureDTO contentHTML);
    Task SaveAsync (ContentEstrutureDTO contentHTML);
}
 