using Rucula.Domain;
using Microsoft.EntityFrameworkCore;

public class LanguageRuculaRepositorie  : ILanguageRuculaRepository
{
    private ApplicationContext _context; 
    public LanguageRuculaRepositorie(ApplicationContext context){
        this._context = context;
    }
    public async Task DeleteAsync(LanguageRucula languageRucula)
    {   
        this._context.Remove(languageRucula);
        await _context.SaveChangesAsync();
    }
    public async Task<IEnumerable<LanguageRucula>> GetAllAsync()
    {
        return await _context.LanguagesRucula!.ToListAsync();
    }
    public async Task<LanguageRucula> GetByIdAsync(int? id)
    {
        return await this._context.LanguagesRucula.FindAsync(id);       
    }
    public async Task SaveAsync(LanguageRucula languageRucula)
    {
        this._context.Add(languageRucula);
        await this._context.SaveChangesAsync();
    }
    public async Task UpdateAsync(LanguageRucula languageRucula)
    {
        this._context.Update(languageRucula);
        await this._context.SaveChangesAsync();
    }
}
