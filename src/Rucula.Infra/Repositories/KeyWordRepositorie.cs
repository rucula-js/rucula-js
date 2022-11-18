using Rucula.Domain;
using Microsoft.EntityFrameworkCore;

public class KeyWordRepositorie : IKeyWordRepository
{
    private ApplicationContext _KeyWordContext; 
    public KeyWordRepositorie(ApplicationContext context){
        this._KeyWordContext = context;
    }
    public async Task DeleteAsync(KeyWord KeyWord)
    {   
        this._KeyWordContext.Remove(KeyWord);
        await _KeyWordContext.SaveChangesAsync();
    }    
    public async Task<IEnumerable<KeyWord>> GetAllAsync()
    {
        return await _KeyWordContext.KeyWords!.ToListAsync();
    }
    public async Task<KeyWord> GetByIdAsync(int? id)
    {
        return await this._KeyWordContext.KeyWords.FindAsync(id);       
    }
    public async Task SaveAsync(KeyWord KeyWord)
    {
        this._KeyWordContext.Add(KeyWord);
        await this._KeyWordContext.SaveChangesAsync();
    }
    public async Task UpdateAsync(KeyWord KeyWord)
    {
        this._KeyWordContext.Update(KeyWord);
        await this._KeyWordContext.SaveChangesAsync();
    }
}
