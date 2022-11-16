using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Rucula.Infra.Ioc;
using Rucula.Aplication;

    using IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureServices((_, services) =>
        services.AddServicesRucula()
    ).Build();

    await host.RunAsync();
