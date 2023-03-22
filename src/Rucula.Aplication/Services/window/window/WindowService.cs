using AutoMapper;
using Rucula.Domain.Window;
using Rucula.Infra.Repository;

public class WindowService : IWindowService
{
    private readonly IMapper _mapper;
    private readonly IRepository<Window> _repository;
    public WindowService(Repository<Window, ApplicationContext> repository,IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }
    public async Task SaveAsync(windowDto input)
    {
        var window =_mapper.Map<Window>(input);
        await _repository.SaveAsync(window);
    }
}