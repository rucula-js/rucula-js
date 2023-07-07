using AutoMapper;
using Rucula.Domain.Window;
namespace Rucula.Aplication.WindowFactory;

public class FieldService : IFieldService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public FieldService(UnitOfWork unitOfWork, IMapper mapper)
    {
        this._unitOfWork = unitOfWork;
        this._mapper = mapper;
    }
    public async Task AlterAsync(FieldDto input)
    {
        using (var unitOfWork = this._unitOfWork)
        {
            var field = await unitOfWork.RepoField.GetAsync<string>(input.Id);
            _mapper.Map(input,field);
            unitOfWork.Save();
        }
    }
    public  async Task DeleteAsync(string id)
    {
        using (var unitOfWork = this._unitOfWork)
        {
            var field = await unitOfWork.RepoField.GetAsync<string>(id);
            unitOfWork.RepoField.Delete(field);
            unitOfWork.Save();
        }
    }
    public async Task<IReadOnlyCollection<FieldDto>> GetAllAsync()
    {
        IReadOnlyCollection<FieldDto> FieldDto = null;
        using (var unitOfWork = _unitOfWork)
        {
            var result = await unitOfWork.RepoField.GetAllAsync();
            FieldDto = this._mapper.Map<IReadOnlyCollection<FieldDto>>(result);
        } 
        return FieldDto;
    }
    public async Task<FieldDto> GetAsync(string id)
    {
        FieldDto FieldDto = null;
        using (var unitOfWork = _unitOfWork)
        {
            var result = await unitOfWork.RepoField.GetAsync(id);
            FieldDto = this._mapper.Map<FieldDto>(result);
        } 
        return FieldDto;
    }
    public async Task InsertAsync(FieldDto input)
    {
        var field =_mapper.Map<Field>(input);
        using (var unitOfWork = _unitOfWork)
        {
            await unitOfWork.RepoField.InsertAsync(field);
            unitOfWork.Save();   
        } 
    }
}