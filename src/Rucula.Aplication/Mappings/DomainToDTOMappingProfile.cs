
using AutoMapper;
using Rucula.Aplication.WindowFactory;
using Rucula.Domain.Window;

namespace Rucula.Aplication;
public class DomainToDTOMappingProfile : Profile
{
    public DomainToDTOMappingProfile()
    { 
        CreateMap<Window,WindowDto>().ReverseMap();
        CreateMap<Field,FieldDto>().ReverseMap();
        CreateMap<Frame,FrameDto>().ReverseMap();
        CreateMap<Columns,ColumnsDto>().ReverseMap();
        CreateMap<ColumnsGridGet,ColumnsGridGetDto>().ReverseMap();
        CreateMap<Button,ButtonDto>().ReverseMap();
        CreateMap<JoinChield,JoinChieldDto>().ReverseMap();
        
    }
}