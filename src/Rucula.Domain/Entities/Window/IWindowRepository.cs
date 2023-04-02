using Rucula.Domain.Window;
public interface IWindowRepository
{
    Task<Window> GetCompleteAsync(string id);
}