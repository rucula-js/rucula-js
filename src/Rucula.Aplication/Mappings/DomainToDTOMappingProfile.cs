
using AutoMapper;
using Rucula.Aplication.WindowFactory;
using Rucula.Domain;
using Rucula.Domain.Window;

namespace Rucula.Aplication;
public class DomainToDTOMappingProfile : Profile
{
    public DomainToDTOMappingProfile()
    { 
        CreateMap<Window,WindowDto>().ReverseMap();
        CreateMap<Field,FieldDto>().ReverseMap();
        CreateMap<Frame,FrameDto>().ReverseMap();
    }
}