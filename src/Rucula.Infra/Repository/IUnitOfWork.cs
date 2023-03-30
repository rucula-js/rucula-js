using Microsoft.EntityFrameworkCore;

public interface IUnitOfWork:IDisposable
{
        void Save();
}