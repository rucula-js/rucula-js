using Rucula.Domain;
using Microsoft.EntityFrameworkCore;

public class LanguageRepositorie : ILanguageRepository
{
    private ApplicationContext _LanguageContext; 
    public LanguageRepositorie(ApplicationContext context){
        this._LanguageContext = context;
    }
    public async Task DeleteAsync(Language Language)
    {   
        this._LanguageContext.Remove(Language);
        await _LanguageContext.SaveChangesAsync();
    }
    
    public async Task<IEnumerable<Language>> GetLanguageAsync()
    {
        return await _LanguageContext.Languages!.ToListAsync();
    }

    public async Task<Language> GetLanguageByIdAsync(int? id)
    {
        return await this._LanguageContext.Languages.FindAsync(id);       
    }

    public async Task SaveAsync(Language Language)
    {
        this._LanguageContext.Add(Language);
        await this._LanguageContext.SaveChangesAsync();
    }
    public async Task UpdateAsync(Language Language)
    {
        this._LanguageContext.Update(Language);
        await this._LanguageContext.SaveChangesAsync();
    }
}
