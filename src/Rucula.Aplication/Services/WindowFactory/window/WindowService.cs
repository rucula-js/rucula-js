using AutoMapper;
using Rucula.Domain.Window;

namespace Rucula.Aplication.WindowFactory;
public class WindowService : IWindowService
{
    private readonly IMapper _mapper;
    private readonly WindowRepository _windowRepository;
    public WindowService(WindowRepository unitOfWork,IMapper mapper)
    {
        _windowRepository = unitOfWork;
        _mapper = mapper;
    }
    public async Task AlterAsync(WindowDto input)
    {
        using (var unitOfWork = this._windowRepository)
        {
            var window = await this._windowRepository.GetCompleteAsync(input.Id);
            foreach (var item in window.Frames)
            {
                foreach (var field in item.Fields)
                {
                    this._windowRepository.RepoField.Delete(_mapper.Map<Field>(field));
                }   
            }
            foreach (var item in window.Frames)
            {
                this._windowRepository.RepoFrame.Delete(_mapper.Map<Frame>(item));   
            }
            unitOfWork.RepoWindow.Delete(window);

            var windowNew = _mapper.Map<Window>(input);
            await unitOfWork.RepoWindow.InsertAsync(windowNew);

            unitOfWork.Save();
        }
    }
    public  async Task DeleteAsync(string id)
    {
        using (var unitOfWork = this._windowRepository)
        {
            var window = await unitOfWork.RepoWindow.GetAsync<string>(id);
            unitOfWork.RepoWindow.Delete(window);
            unitOfWork.Save();
        }
    }
    public async Task<IReadOnlyCollection<WindowDto>> GetAllAsync()
    {
        IReadOnlyCollection<WindowDto> windowDto = null;
        using (var unitOfWork = _windowRepository)
        {
            var result = await unitOfWork.RepoWindow.GetAllAsync();
            windowDto = this._mapper.Map<IReadOnlyCollection<WindowDto>>(result);
        } 
        return windowDto;
    }
    public async Task<WindowDto> GetAsync(string id)
    {
        WindowDto windowDto = null;
        using (var unitOfWork = _windowRepository)
        {
            var result = await unitOfWork.RepoWindow.GetAsync(id);
            windowDto = this._mapper.Map<WindowDto>(result);
        } 
        return windowDto;
    }

    public async Task<WindowDto> GetCompleteAsync(string id)
    {
        Window result;
        using (var unitOfWork = this._windowRepository)
        {
            result  = await unitOfWork.GetCompleteAsync(id);
        }
        return _mapper.Map<WindowDto>(result);
    }

    public async Task InsertAsync(WindowDto input)
    {
        var window =_mapper.Map<Window>(input);
        using (var unitOfWork = _windowRepository)
        {
            await unitOfWork.RepoWindow.InsertAsync(window);
            unitOfWork.Save();   
        } 
    }
}