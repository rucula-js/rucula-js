using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

using Rucula.Domain;

namespace Rucula.Infra.Ioc;
public static class StartupDependenci
{
    public static void AddServicesRucula(this IServiceCollection services)
    {
        services.AddDbContext<ApplicationContext>(
            config => config.UseNpgsql("Host=localhost;Database=rucula;Username=postgres;Password=Ronald33",
            b => b.MigrationsAssembly(typeof(ApplicationContext).Assembly.FullName))
        );
        services.AddScoped<ILanguageRepository,LanguageRepositorie>();
    }
} 
