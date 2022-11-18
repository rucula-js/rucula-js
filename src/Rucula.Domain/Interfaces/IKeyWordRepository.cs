namespace Rucula.Domain;
public interface IKeyWordRepository
{    
    Task<IEnumerable<KeyWord>> GetAllAsync();
    Task<KeyWord> GetByIdAsync(int? id);
    Task SaveAsync (KeyWord KeyWord);
    Task UpdateAsync (KeyWord KeyWord);
    Task DeleteAsync (KeyWord KeyWord);
}
