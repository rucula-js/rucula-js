using Microsoft.EntityFrameworkCore;

namespace Rucula.Infra.Repository;
public class Repository<TEntity,TContext> : IRepository<TEntity> where TEntity:class where TContext:DbContext
{
    private readonly DbSet<TEntity> DbSet;
    public Repository(TContext context){
        this.DbSet = context.Set<TEntity>();
    }

    public TEntity Get<TPrimaryKey>(TPrimaryKey id)
    {
        var result = this.DbSet.Find(id); 
        return result;
    }
    
    public async Task<TEntity> GetAsync<TPrimaryKey>(TPrimaryKey id)
    {
        var result = await this.DbSet.FindAsync(id); 
        return result;
    }

    public async Task SaveAsync(TEntity input)
    {
        await this.DbSet.AddAsync(input);   
    }
}