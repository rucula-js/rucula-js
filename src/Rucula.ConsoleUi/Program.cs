using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Rucula.Infra.Ioc;
using Rucula.Aplication;

internal class Program
{
    private static async Task Main(string[] args)
    {
        using IHost host = CreateHostBuilder(args).Build();
        await host.RunAsync();

    }

    static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureServices((_, services) =>
                services.AddServicesRucula());


}