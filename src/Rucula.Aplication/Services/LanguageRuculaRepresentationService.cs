
using AutoMapper;
using Rucula.Domain;
namespace Rucula.Aplication;
public class LanguageRuculaRepresentationService: ILanguageRuculaRepresentationService
{
    private readonly ILanguageRuculaRepresentationRepository _languageRuculaRepresentationRepository;
    private  readonly IMapper _mapper;
    public LanguageRuculaRepresentationService(ILanguageRuculaRepresentationRepository languageRuculaRepresentationRepository, IMapper mapper)
    {
        _languageRuculaRepresentationRepository = languageRuculaRepresentationRepository;
        _mapper = mapper;
    }
    public async Task DeleteAsync(LanguageRuculaRepresentationDTO languageService)
    {
        var entity =  _mapper.Map<LanguageRuculaRepresentation>(languageService);
        await _languageRuculaRepresentationRepository.DeleteAsync(entity);
    }
    public async Task<IEnumerable<LanguageRuculaRepresentationDTO>> GetAllAsync()
    {
        var entityList = await _languageRuculaRepresentationRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<LanguageRuculaRepresentationDTO>>(entityList);
    }
    public async Task<LanguageRuculaRepresentationDTO> GetByCodeAsync(string code)
    {
        var entity = await _languageRuculaRepresentationRepository.GetByCodeAsync(code);
        return _mapper.Map<LanguageRuculaRepresentationDTO>(entity);
    }
    public async  Task SaveAsync(LanguageRuculaRepresentationDTO languageService)
    {
        var entity = _mapper.Map<LanguageRuculaRepresentation>(languageService);
        await this._languageRuculaRepresentationRepository.SaveAsync(entity);
    }
    public async Task UpdateAsync(LanguageRuculaRepresentationDTO languageService)
    {
        var entity = _mapper.Map<LanguageRuculaRepresentation>(languageService);
        await this._languageRuculaRepresentationRepository.UpdateAsync(entity);
    }
}
 