using Rucula.Domain;
using Microsoft.EntityFrameworkCore;

public class ContentHTMLRepository : IContentHTMLRepository
{
    private ApplicationContext _LanguageContext; 
    public ContentHTMLRepository(ApplicationContext context){
        this._LanguageContext = context;
    }
    public async Task DeleteAsync(ContentEstruture contentHTML)
    {   
        this._LanguageContext.Remove(contentHTML);
        await _LanguageContext.SaveChangesAsync();
    }
    public async Task<IEnumerable<ContentEstruture>> GetAllAsync()
    {
        return await _LanguageContext.ContentEstruture!.ToListAsync();
    }
    public async Task<ContentEstruture> GetByIdAsync(string id)
    {
        return await this._LanguageContext.ContentEstruture.FindAsync(id);       
    }
    public async Task SaveAsync(ContentEstruture contentHTML)
    {
        this._LanguageContext.Add(contentHTML);
        await this._LanguageContext.SaveChangesAsync();
    }
}
