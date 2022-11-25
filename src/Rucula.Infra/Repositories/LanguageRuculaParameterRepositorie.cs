using Rucula.Domain;
using Microsoft.EntityFrameworkCore;

public class LanguageRuculaParameterRepositorie : ILanguageRuculaParameterRepository
{
    private ApplicationContext _LanguageRuculaParameterContext; 
    public LanguageRuculaParameterRepositorie(ApplicationContext context){
        this._LanguageRuculaParameterContext = context;
    }
    public async Task DeleteAsync(LanguageRuculaParameter languageRuculaParameter)
    {   
        this._LanguageRuculaParameterContext.Remove(languageRuculaParameter);
        await _LanguageRuculaParameterContext.SaveChangesAsync();
    }
    public async Task<IEnumerable<LanguageRuculaParameter>> GetAllAsync()
    {
        return await _LanguageRuculaParameterContext.LanguageRuculaParameter!.ToListAsync();
    }

    public async Task<LanguageRuculaParameter> GetByIdAsync(string id)
    {
        return await this._LanguageRuculaParameterContext.LanguageRuculaParameter.FindAsync(id);       
    }
    
    public async Task SaveAsync(LanguageRuculaParameter languageRuculaParameter)
    {
        this._LanguageRuculaParameterContext.Add(languageRuculaParameter);
        await this._LanguageRuculaParameterContext.SaveChangesAsync();
    }
    public async Task UpdateAsync(LanguageRuculaParameter languageRuculaParameter)
    {
        this._LanguageRuculaParameterContext.Update(languageRuculaParameter);
        await this._LanguageRuculaParameterContext.SaveChangesAsync();
    }
}
