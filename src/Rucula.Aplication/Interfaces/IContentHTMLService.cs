namespace Rucula.Aplication;
public interface IContentHTMLService
{
    Task<ContentHTMLDTO> GetByIdAsync(string? id);
    Task DeleteAsync (ContentHTMLDTO contentHTML);
}
 