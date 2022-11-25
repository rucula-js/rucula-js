using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Rucula.Domain;
namespace Rucula.Aplication;
public class LanguageRuculaParameterService: ILanguageRuculaParameterService
{
    private readonly ILanguageRuculaParameterRepository _languageRuculaParameterRepository;
    private  readonly IMapper _mapper;
    public LanguageRuculaParameterService(ILanguageRuculaParameterRepository languageRuculaParameterRepository, IMapper mapper)
    {
        _languageRuculaParameterRepository = languageRuculaParameterRepository;
        _mapper = mapper;
    }
    public  async Task<IEnumerable<LanguageRuculaParameterDTO>> GetAllAsync()
    {
        var languages = await _languageRuculaParameterRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<LanguageRuculaParameterDTO>>(languages);
    }
    public async  Task<LanguageRuculaParameterDTO> GetByIdAsync(string code)
    {
        var languages = await _languageRuculaParameterRepository.GetByIdAsync(code);
        return _mapper.Map<LanguageRuculaParameterDTO>(languages);
    }
    public async Task SaveAsync(LanguageRuculaParameterDTO Language)
    {
        var languagesEntity =  _mapper.Map<LanguageRuculaParameter>(Language);
        await _languageRuculaParameterRepository.SaveAsync(languagesEntity);
    }
    public async  Task UpdateAsync(LanguageRuculaParameterDTO Language)
    {
        var languagesEntity =  _mapper.Map<LanguageRuculaParameter>(Language);
        await _languageRuculaParameterRepository.UpdateAsync(languagesEntity);
    }
    public async Task DeleteAsync(LanguageRuculaParameterDTO Language)
    {
        var languagesEntity =  _mapper.Map<LanguageRuculaParameter>(Language);
        await _languageRuculaParameterRepository.DeleteAsync(languagesEntity);
    }
}
 