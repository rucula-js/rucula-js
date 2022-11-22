using Microsoft.EntityFrameworkCore;
using Rucula.Domain;
public class ApplicationContext : DbContext
{
    public DbSet<Language>? Languages { get; set; }
    public DbSet<LanguageRucula>? LanguagesRucula { get; set; }
    public DbSet<LanguageRuculaRepresentation>? LanguageRuculaRepresentation { get; set; }
    public DbSet<KeyWord>? KeyWords { get; set; }

    

    public ApplicationContext(DbContextOptions<ApplicationContext> options)
        : base(options){}
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationContext).Assembly);
    }


}