using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Rucula.Infra.Repository;
public interface IRepository<TEntity> : IDisposable where TEntity : class
{
    TEntity Get<TPrimaryKey>(TPrimaryKey id);
    Task<TEntity> GetAsync<TPrimaryKey>(TPrimaryKey id);
    void Insert(TEntity input);
    Task InsertAsync(TEntity input);
}