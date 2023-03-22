using Rucula.Domain;
using Microsoft.EntityFrameworkCore;

public class LanguageRuculaRepresentationRepository  : ILanguageRuculaRepresentationRepository
{
    private ApplicationContext _context; 
    public LanguageRuculaRepresentationRepository(ApplicationContext context){
        this._context = context;
    }
    public async Task DeleteAsync(LanguageRuculaRepresentation languageRuculaRepresentation)
    {   
        this._context.Remove(languageRuculaRepresentation);
        await _context.SaveChangesAsync();
    }
    public async Task<IEnumerable<LanguageRuculaRepresentation>> GetAllAsync()
    {
        return await _context.LanguageRuculaRepresentation!.ToListAsync();
    }
    public async Task<LanguageRuculaRepresentation> GetByCodeAsync(string? code)
    {
        var entity = await this._context.LanguageRuculaRepresentation!.FindAsync(code); 
        return  entity!;    
    }
    public async Task SaveAsync(LanguageRuculaRepresentation languageRucula)
    {
        this._context.Add(languageRucula);
        await this._context.SaveChangesAsync();
    }
    public async Task UpdateAsync(LanguageRuculaRepresentation languageRucula)
    {
        this._context.Update(languageRucula);
        await this._context.SaveChangesAsync();
    }
}
