using Microsoft.EntityFrameworkCore;
using Rucula.Domain;
using Rucula.Domain.Window;

public class ApplicationContext : DbContext
{
    public DbSet<Window>? Window { get; set; }
    public DbSet<Frame>? Frame { get; set; }
    public DbSet<Field>? Field { get; set; }
    public DbSet<Columns>? Columns { get; set; }
    public DbSet<ColumnsGridGet>? ColumnsGridGet { get; set; }
    public DbSet<Button>? Button { get; set; }
    public ApplicationContext(DbContextOptions<ApplicationContext> options)
        : base(options){}
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationContext).Assembly);
    }


}