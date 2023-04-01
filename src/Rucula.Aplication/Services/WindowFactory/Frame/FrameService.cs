using AutoMapper;
using Rucula.Domain.Window;
namespace Rucula.Aplication.WindowFactory;
public class FrameService : IFrameService
{
    private readonly UnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public FrameService(UnitOfWork unitOfWork, IMapper mapper)
    {
        this._unitOfWork = unitOfWork;
        this._mapper = mapper;
    }
    public async Task AlterAsync(FrameDto input)
    {
        using (var unitOfWork = this._unitOfWork)
        {
            var frame = await unitOfWork.RepoFrame.GetAsync<string>(input.Id);
            _mapper.Map(input,frame);
            unitOfWork.Save();
        }
    }
    public  async Task DeleteAsync(string id)
    {
        using (var unitOfWork = this._unitOfWork)
        {
            var frame = await unitOfWork.RepoFrame.GetAsync<string>(id);
            unitOfWork.RepoFrame.Delete(frame);
            unitOfWork.Save();
        }
    }
    public async Task<IReadOnlyCollection<FrameDto>> GetAllAsync()
    {
        IReadOnlyCollection<FrameDto> FrameDto = null;
        using (var unitOfWork = _unitOfWork)
        {
            var result = await unitOfWork.RepoFrame.GetAllAsync();
            FrameDto = this._mapper.Map<IReadOnlyCollection<FrameDto>>(result);
        } 
        return FrameDto;
    }
    public async Task<FrameDto> GetAsync(string id)
    {
        FrameDto FrameDto = null;
        using (var unitOfWork = _unitOfWork)
        {
            var result = await unitOfWork.RepoFrame.GetAsync(id);
            FrameDto = this._mapper.Map<FrameDto>(result);
        } 
        return FrameDto;
    }
    public async Task InsertAsync(FrameDto input)
    {
        var frame =_mapper.Map<Frame>(input);
        using (var unitOfWork = _unitOfWork)
        {
            await unitOfWork.RepoFrame.InsertAsync(frame);
            unitOfWork.Save();   
        } 
    }
}