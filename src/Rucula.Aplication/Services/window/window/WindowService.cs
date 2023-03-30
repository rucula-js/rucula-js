using AutoMapper;
using Rucula.Domain.Window;
public class WindowService : IWindowService
{
    private readonly IMapper _mapper;
    private readonly UnitOfWork _unitOfWork;
    public WindowService(UnitOfWork unitOfWork,IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
    public async Task InsertAsync(windowDto input)
    {
        var window =_mapper.Map<Window>(input);
        using (var unitOfWork = _unitOfWork)
        {
            await unitOfWork.RepoWindow.InsertAsync(window);
            unitOfWork.Save();   
        } 
    }
}