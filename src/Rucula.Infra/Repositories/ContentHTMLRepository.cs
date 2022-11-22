using Rucula.Domain;
using Microsoft.EntityFrameworkCore;

public class ContentHTMLRepository : IContentHTMLRepository
{
    private ApplicationContext _LanguageContext; 
    public ContentHTMLRepository(ApplicationContext context){
        this._LanguageContext = context;
    }
    public async Task DeleteAsync(ContentHTML contentHTML)
    {   
        this._LanguageContext.Remove(contentHTML);
        await _LanguageContext.SaveChangesAsync();
    }
    
    public async Task<IEnumerable<ContentHTML>> GetAllAsync()
    {
        return await _LanguageContext.ContentHTML!.ToListAsync();
    }

    public async Task<ContentHTML> GetByIdAsync(string? id)
    {
        return await this._LanguageContext.ContentHTML.FindAsync(id);       
    }

    public async Task SaveAsync(ContentHTML contentHTML)
    {
        this._LanguageContext.Add(contentHTML);
        await this._LanguageContext.SaveChangesAsync();
    }
    public async Task UpdateAsync(ContentHTML contentHTML)
    {
        this._LanguageContext.Update(contentHTML);
        await this._LanguageContext.SaveChangesAsync();
    }
}
