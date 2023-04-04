using Microsoft.EntityFrameworkCore.ChangeTracking;
using Rucula.Domain.Window;
using Rucula.Infra.Repository;

public class UnitOfWork : IUnitOfWork
{
    protected  ApplicationContext _context;
    public UnitOfWork(ApplicationContext context)
    {
         this._context =  context;
    }
    private IRepository<Window>? _repoWindow;
    private IRepository<Field>? _repoField;
    private IRepository<Frame>? _repoFrame;

    public IRepository<Window>  RepoWindow
    {
        get
        {
            if (_repoWindow is null) _repoWindow = new Repository<Window>(this._context);
            return  _repoWindow;
        }
    }
    public IRepository<Field>  RepoField
    {
        get
        {
            if (_repoField is null) _repoField = new Repository<Field>(this._context);
            return  _repoField;
        }
    }
    public IRepository<Frame>  RepoFrame
    {
        get
        {
            if (_repoFrame is null) _repoFrame = new Repository<Frame>(this._context);
            return  _repoFrame;
        }
    }

    public void Save()
    {
        _context.SaveChanges();
    }
    public EntityEntry Entry<TEntity>(TEntity entity)
    {
        return _context.Entry(entity!);
    }

    private bool disposed = false;
    
    protected virtual void Dispose(bool disposing)
    {
        if (!this.disposed)
        {
            if (disposing)
            {
                _context.Dispose();
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