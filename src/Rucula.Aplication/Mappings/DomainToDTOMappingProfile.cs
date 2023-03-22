
using AutoMapper;
using Rucula.Domain;
using Rucula.Domain.Window;

namespace Rucula.Aplication;
public class DomainToDTOMappingProfile : Profile
{
    public DomainToDTOMappingProfile()
    {
        CreateMap<Language,LanguageDTO>().ReverseMap();
        CreateMap<LanguageRucula,LanguageRuculaDTO>()
            .ForMember(a => a.LanguageRuculaRepresentationDTO, b =>  b.MapFrom(a => a.LanguageRuculaRepresentation))
            .ReverseMap();
        CreateMap<LanguageRuculaRepresentation,LanguageRuculaRepresentationDTO>().ReverseMap();   
        CreateMap<LanguageRuculaParameter,LanguageRuculaParameterDTO>().ReverseMap();   
        CreateMap<ContentEstruture,ContentEstrutureDTO>().ReverseMap();
        CreateMap<ContentHTML,ContentHTMLDTO>().ReverseMap();
        CreateMap<TagMetaHTML,TagMetaHTMLDTO>().ReverseMap();
        
        CreateMap<Window,windowDto>().ReverseMap();


    }
}