using System.Linq.Expressions;

namespace Rucula.Infra.Repository;
public interface IRepository<TEntity> where TEntity : class
{
    TEntity Get<TPrimaryKey>(TPrimaryKey id);
    Task<TEntity> GetAsync<TPrimaryKey>(TPrimaryKey id);
    Task SaveAsync(TEntity input);
}