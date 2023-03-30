using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Rucula.Infra.Repository;
public class Repository<TEntity> : IRepository<TEntity> where TEntity:class 
{   private readonly DbSet<TEntity> DbSet;
    public Repository(DbContext context){
        this.DbSet = context.Set<TEntity>();
    }
    public TEntity Get<TPrimaryKey>(TPrimaryKey id)
    {
        return this.DbSet.Find(id)!;
    }
    public async Task<TEntity> GetAsync<TPrimaryKey>(TPrimaryKey id)
    {
        var result = await this.DbSet.FindAsync(id); 
        return result!;
    }
    public void Insert(TEntity input)
    {
        this.DbSet.Add(input);   
    }
    public async Task InsertAsync(TEntity input)
    {
        await this.DbSet.AddAsync(input); 
    }
    private bool disposed = false;


    protected virtual void Dispose(bool disposing)
    {
        if (!this.disposed)
        {
            if (disposing)
            {
                this.Dispose();
            }
        }
        this.disposed = true;
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
}