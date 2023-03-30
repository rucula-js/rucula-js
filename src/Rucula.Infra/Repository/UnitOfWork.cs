using Microsoft.EntityFrameworkCore;
using Rucula.Domain.Window;
using Rucula.Infra.Repository;

public class UnitOfWork : IUnitOfWork
{
    public  ApplicationContext Context;
    public UnitOfWork(ApplicationContext context)
    {
         this.Context =  context;
    }
    private IRepository<Window>? _repoWindow;

    public IRepository<Window>  RepoWindow
    {
        get
        {
            if (_repoWindow is null) _repoWindow = new Repository<Window>(this.Context);
            return  _repoWindow;
        }
    }
    public void Save()
    {
        Context.SaveChanges();
    }
    private bool disposed = false;
    
    protected virtual void Dispose(bool disposing)
    {
        if (!this.disposed)
        {
            if (disposing)
            {
                Context.Dispose();
            }
        }
        this.disposed = true;
    }

    void IDisposable.Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}