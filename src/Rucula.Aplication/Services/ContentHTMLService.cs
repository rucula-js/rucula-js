using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Rucula.Domain;
namespace Rucula.Aplication;
public class ContentHTMLService: IContentHTMLService
{
    private readonly IContentHTMLRepository _contentHTMLRepository;
    private  readonly IMapper _mapper;
    public ContentHTMLService(IContentHTMLRepository contentHTMLRepository, IMapper mapper)
    {
        _contentHTMLRepository = contentHTMLRepository;
        _mapper = mapper;
    }
    public async  Task<ContentHTMLDTO> GetByIdAsync(string id)
    {
        var languages = await _contentHTMLRepository.GetByIdAsync(id!);
        return _mapper.Map<ContentHTMLDTO>(languages);
    }
    public async Task DeleteAsync(ContentHTMLDTO Language)
    {
        var languagesEntity =  _mapper.Map<ContentHTML>(Language);
        await _contentHTMLRepository.DeleteAsync(languagesEntity);
    }
}
 