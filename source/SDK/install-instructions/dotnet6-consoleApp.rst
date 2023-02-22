.NET 6 Console App
====================

These steps describe how to install and configure KissLog for a .NET 6 Console application.

A full working example can be found `here <https://github.com/KissLog-net/KissLog.Sdk.Samples/tree/main/src/dotnet6_ConsoleApp>`_.

Instructions
----------------------------------------------

1. Install NuGet Package

.. code-block:: none
    :caption: Package Manager Console

    PM> Install-Package KissLog.AspNetCore
   

2. Update **appsettings.json**

.. code-block:: javascript
    :caption: appsettings.json
    :emphasize-lines: 9-11

    {
        "Logging": {
            "LogLevel": {
                "Default": "Trace",
                "Microsoft": "Information"
            }
        },

        "KissLog.OrganizationId": "_OrganizationId_",
        "KissLog.ApplicationId": "_ApplicationId_",
        "KissLog.ApiUrl": "https://api.kisslog.net"
    }

3. Update **Program.cs**

.. code-block:: c#
    :caption: Program.cs
    :linenos:
    :emphasize-lines: 1-4,6,12,17-29,38-39

    using KissLog;
    using KissLog.AspNetCore;
    using KissLog.CloudListeners.Auth;
    using KissLog.CloudListeners.RequestLogsListener;

    Logger.SetFactory(new KissLog.LoggerFactory(new Logger(url: "ConsoleApp/Main")));

    IConfiguration configuration = new ConfigurationBuilder()
        .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
        .Build();

    ConfigureKissLog(configuration);

    var services = new ServiceCollection();
    services.AddLogging(logging =>
    {
        logging
            .AddConfiguration(configuration.GetSection("Logging"))
            .AddKissLog(options =>
            {
                options.Formatter = (FormatterArgs args) =>
                {
                    if (args.Exception == null)
                        return args.DefaultValue;

                    string exceptionStr = new ExceptionFormatter().Format(args.Exception, args.Logger);
                    return string.Join(Environment.NewLine, new[] { args.DefaultValue, exceptionStr });
                };
            });
    });

    var serviceProvider = services.Build();

    ILogger logger = serviceProvider.GetRequiredService<ILogger<Program>>();

    logger.LogInformation("Hello world from dotnet 6!");
    
    var loggers = Logger.Factory.GetAll();
    Logger.NotifyListeners(loggers);

    void ConfigureKissLog(IConfiguration configuration)
    {
        KissLogConfiguration.Listeners
            .Add(new RequestLogsApiListener(new Application(configuration["KissLog.OrganizationId"], configuration["KissLog.ApplicationId"]))
            {
                ApiUrl = configuration["KissLog.ApiUrl"],
                UseAsync = false
            });
    }


