using AutoMapper;
using Rucula.Domain.Window;
using Rucula.Infra.Repository;

public class FieldService : IFieldService
{
    private readonly IRepository<Field> _repository;
    private readonly IMapper _mapper;
    public FieldService(Repository<Field> repository, IMapper mapper)
    {
        this._repository = repository;
        this._mapper = mapper;
    }
    public async Task SaveAsync(FieldDto o)
    {
        
    }
}