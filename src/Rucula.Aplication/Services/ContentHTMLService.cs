using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Rucula.Domain;
namespace Rucula.Aplication;
public class ContentHTMLService: IContentEstrutureHTMLService
{
    private readonly IContentHTMLRepository _contentHTMLRepository;
    private readonly IExtractRuculaService _extractRuculaService;
    private  readonly IMapper _mapper;
    public ContentHTMLService(IContentHTMLRepository contentHTMLRepository, IExtractRuculaService extractRuculaService,IMapper mapper)
    {
        _contentHTMLRepository = contentHTMLRepository;
        _extractRuculaService = extractRuculaService; 
        _mapper = mapper;
    }
    public async  Task<ContentEstrutureDTO> GetByIdAsync(string id)
    {
        var languages = await _contentHTMLRepository.GetByIdAsync(id!);
        return _mapper.Map<ContentEstrutureDTO>(languages);
    }
    public async Task DeleteAsync(ContentEstrutureDTO Language)
    {
        var languagesEntity =  _mapper.Map<ContentEstruture>(Language);
        await _contentHTMLRepository.DeleteAsync(languagesEntity);
    }
    public async Task SaveAsync(ContentEstrutureDTO contentEstruture)
    {
        contentEstruture.ContentHTMLDTO.Content =_extractRuculaService.ConvertSintaxRucula(contentEstruture.ContentHTMLDTO.ContentLanguageRucula); 
        var languagesEntity =  _mapper.Map<ContentEstruture>(contentEstruture);
        await _contentHTMLRepository.SaveAsync(languagesEntity);
    }
}
 