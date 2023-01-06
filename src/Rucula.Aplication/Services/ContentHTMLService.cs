using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Rucula.Domain;
namespace Rucula.Aplication;
public class ContentHTMLService: IContentEstrutureHTMLService
{
    private readonly IContentHTMLRepository _contentHTMLRepository;
    private  readonly IMapper _mapper;
    public ContentHTMLService(IContentHTMLRepository contentHTMLRepository, IMapper mapper)
    {
        _contentHTMLRepository = contentHTMLRepository;
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
    public async Task SaveAsync(ContentEstrutureDTO contentHTML)
    {
        var languagesEntity =  _mapper.Map<ContentEstruture>(contentHTML);
        await _contentHTMLRepository.SaveAsync(languagesEntity);
    }
}
 