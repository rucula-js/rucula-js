using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Rucula.Domain;
using Rucula.Aplication;
using Rucula.Aplication.WindowFactory;

namespace Rucula.Infra.Ioc;
public static class StartupDependenci
{
    public static void AddServicesRucula(this IServiceCollection services)
    {
        services.AddDbContext<ApplicationContext>(
            config => config.UseNpgsql("Host=rucula-db;Database=rucula;Username=postgres;Password=Ronald33",
            b => b.MigrationsAssembly(typeof(ApplicationContext).Assembly.FullName))
        );             
        services.AddAutoMapper(typeof(DomainToDTOMappingProfile));
        services.AddScoped<UnitOfWork>();
        services.AddScoped<WindowRepository>();
        services.AddScoped<IWindowService,WindowService>();
        services.AddScoped<IFieldService,FieldService>();
        services.AddScoped<IFrameService,FrameService>();
    }
} 
