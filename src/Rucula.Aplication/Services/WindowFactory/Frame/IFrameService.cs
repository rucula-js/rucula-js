namespace Rucula.Aplication.WindowFactory;
public interface IFrameService
{
    Task InsertAsync(FrameDto input);
    Task AlterAsync(FrameDto id);
    Task DeleteAsync(string id);
    Task<FrameDto> GetAsync(string id);
    Task<IReadOnlyCollection<FrameDto>> GetAllAsync();
}