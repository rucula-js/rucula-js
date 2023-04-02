using Microsoft.EntityFrameworkCore;
using Rucula.Domain;
using Rucula.Domain.Window;

public class ApplicationContext : DbContext
{
    public DbSet<Language>? Languages { get; set; }
    public DbSet<LanguageRucula>? LanguagesRucula { get; set; }
    public DbSet<LanguageRuculaRepresentation>? LanguageRuculaRepresentation { get; set; }
    public DbSet<LanguageRuculaParameter>? LanguageRuculaParameter { get; set; }
    public DbSet<ContentEstruture>? ContentEstruture { get; set; }
    public DbSet<KeyWord>? KeyWords { get; set; }
    public DbSet<TagMetaHTML>? TagMetaHTML { get; set; }
    public DbSet<Window>? Window { get; set; }
    public DbSet<Frame>? Frame { get; set; }
    public DbSet<Field>? Field { get; set; }
    public ApplicationContext(DbContextOptions<ApplicationContext> options)
        : base(options){}
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationContext).Assembly);
    }


}