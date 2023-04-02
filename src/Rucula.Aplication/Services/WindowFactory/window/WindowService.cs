using AutoMapper;
using Rucula.Domain.Window;

namespace Rucula.Aplication.WindowFactory;
public class WindowService : IWindowService
{
    private readonly IMapper _mapper;
    private readonly WindowRepository _unitOfWork;
    public WindowService(WindowRepository unitOfWork,IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
    public async Task AlterAsync(WindowDto input)
    {
        using (var unitOfWork = this._unitOfWork)
        {
            var window = await unitOfWork.RepoWindow.GetAsync<string>(input.Id);
            _mapper.Map(input,window);
            unitOfWork.Save();
        }
    }
    public  async Task DeleteAsync(string id)
    {
        using (var unitOfWork = this._unitOfWork)
        {
            var window = await unitOfWork.RepoWindow.GetAsync<string>(id);
            unitOfWork.RepoWindow.Delete(window);
            unitOfWork.Save();
        }
    }
    public async Task<IReadOnlyCollection<WindowDto>> GetAllAsync()
    {
        IReadOnlyCollection<WindowDto> windowDto = null;
        using (var unitOfWork = _unitOfWork)
        {
            var result = await unitOfWork.RepoWindow.GetAllAsync();
            windowDto = this._mapper.Map<IReadOnlyCollection<WindowDto>>(result);
        } 
        return windowDto;
    }
    public async Task<WindowDto> GetAsync(string id)
    {
        WindowDto windowDto = null;
        using (var unitOfWork = _unitOfWork)
        {
            var result = await unitOfWork.RepoWindow.GetAsync(id);
            windowDto = this._mapper.Map<WindowDto>(result);
        } 
        return windowDto;
    }

    public async Task<WindowDto> GetCompleteAsync(string id)
    {
        var result  = await this._unitOfWork.GetCompleteAsync(id);
        return _mapper.Map<WindowDto>(result);
    }

    public async Task InsertAsync(WindowDto input)
    {
        var window =_mapper.Map<Window>(input);
        using (var unitOfWork = _unitOfWork)
        {
            await unitOfWork.RepoWindow.InsertAsync(window);
            unitOfWork.Save();   
        } 
    }
}