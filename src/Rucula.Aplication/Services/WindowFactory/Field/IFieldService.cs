namespace Rucula.Aplication.WindowFactory;
public interface IFieldService
{
    Task InsertAsync(FieldDto input);
    Task AlterAsync(FieldDto id);
    Task DeleteAsync(string id);
    Task<FieldDto> GetAsync(string id);
    Task<IReadOnlyCollection<FieldDto>> GetAllAsync();
}