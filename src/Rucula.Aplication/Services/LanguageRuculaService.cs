using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Rucula.Domain;
namespace Rucula.Aplication;
public class LanguageRuculaService: ILanguageRuculaService
{
    private ILanguageRuculaRepository _languageRuculaRepository;
    private  readonly IMapper _mapper;
    public LanguageRuculaService(ILanguageRuculaRepository languageRuculaRepository, IMapper mapper)
    {
        _languageRuculaRepository = _languageRuculaRepository;
        _mapper = mapper;
    }
    public  async Task<IEnumerable<LanguageRuculaDTO>> GetAllAsync()
    {
        var languages = await _languageRuculaRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<LanguageRuculaDTO>>(languages);
    }
    public async  Task<LanguageRuculaDTO> GetByIdAsync(int? id)
    {
        var languages = await _languageRuculaRepository.GetByIdAsync(id);
        return _mapper.Map<LanguageRuculaDTO>(languages);
    }
    public async Task SaveAsync(LanguageRuculaDTO Language)
    {
        var languagesEntity =  _mapper.Map<LanguageRucula>(Language);
        await _languageRuculaRepository.SaveAsync(languagesEntity);
    }
    public async  Task UpdateAsync(LanguageRuculaDTO Language)
    {
        var languagesEntity =  _mapper.Map<LanguageRucula>(Language);
        await _languageRuculaRepository.UpdateAsync(languagesEntity);
    }
    public async Task DeleteAsync(LanguageRuculaDTO Language)
    {
        var languagesEntity =  _mapper.Map<LanguageRucula>(Language);
        await _languageRuculaRepository.DeleteAsync(languagesEntity);
    }
}
 