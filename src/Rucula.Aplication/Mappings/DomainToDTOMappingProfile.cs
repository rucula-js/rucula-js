
using AutoMapper;
using Rucula.Domain;
namespace Rucula.Aplication;
public class DomainToDTOMappingProfile : Profile
{
    public DomainToDTOMappingProfile()
    {
        CreateMap<Language,LanguageDTO>().ReverseMap();
        CreateMap<LanguageRucula,LanguageRuculaDTO>().ReverseMap();        
    }

}