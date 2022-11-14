using Microsoft.Extensions.Hosting;
using Rucula.Infra.Ioc;

using IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureServices((_, services) =>
        services.AddServicesRucula()).Build();

await host.RunAsync();