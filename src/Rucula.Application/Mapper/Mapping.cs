
using AutoMapper;
using Rucula.Domain;

namespace Rucula.Aplication;
public class Mapping : Profile
{
    public Mapping()
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