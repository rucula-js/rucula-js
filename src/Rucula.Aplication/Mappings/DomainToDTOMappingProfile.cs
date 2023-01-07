
using AutoMapper;
using Rucula.Domain;
namespace Rucula.Aplication;
public class DomainToDTOMappingProfile : Profile
{
    public DomainToDTOMappingProfile()
    {
        CreateMap<Language,LanguageDTO>().ReverseMap();
        CreateMap<LanguageRucula,LanguageRuculaDTO>()
            .ForMember(a => a.LanguageRuculaRepresentationDTO, b =>  b.MapFrom(a => a.LanguageRuculaRepresentation)).ReverseMap();
        CreateMap<LanguageRuculaRepresentation,LanguageRuculaRepresentationDTO>().ReverseMap();   
        CreateMap<LanguageRuculaParameter,LanguageRuculaParameterDTO>().ReverseMap();   
        CreateMap<ContentHTML,ContentHTMLDTO>().ReverseMap();
        
        CreateMap<ContentEstruture,ContentEstrutureDTO>()
            .ForMember(a => a.ContentHTMLDTO, b=> b.MapFrom(a => a.ContentHTMLFk))
            .ForMember(a => a.ContentHTMLDTO.TagMetaHTMLDTO, b=> b.MapFrom(a => a.ContentHTMLFk.TagMetaHTML))

        .ReverseMap();   

    }

}