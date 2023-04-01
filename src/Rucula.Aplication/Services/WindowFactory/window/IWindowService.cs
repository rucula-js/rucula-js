namespace Rucula.Aplication.WindowFactory;
public interface IWindowService
{
    Task InsertAsync(WindowDto input);
    Task AlterAsync(WindowDto id);
    Task DeleteAsync(string id);
    Task<WindowDto> GetAsync(string id);
    Task<IReadOnlyCollection<WindowDto>> GetAllAsync();
}