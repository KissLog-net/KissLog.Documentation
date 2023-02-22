.NET Core Console App
==============================

These steps describe how to install and configure KissLog for a .NET Core Console application.

A full working example can be found `here <https://github.com/KissLog-net/KissLog.Sdk.Samples/tree/main/src/dotnetcore_3.1_ConsoleApp>`_.

Instructions
----------------------------------------------

1. Install NuGet Packages

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
    :emphasize-lines: 1-5,13,23,25,33,42-53

    using KissLog;
    using KissLog.AspNetCore;
    using KissLog.CloudListeners.Auth;
    using KissLog.CloudListeners.RequestLogsListener;
    using KissLog.Formatters;

    namespace ConsoleApp_NetCore
    {
        class Program
        {
            static void Main(string[] args)
            {
                Logger.SetFactory(new KissLog.LoggerFactory(new Logger(url: "ConsoleApp/Main")));

                IConfiguration configuration = new ConfigurationBuilder()
                    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                    .Build();

                var serviceCollection = new ServiceCollection();
                ConfigureServices(serviceCollection, configuration);
                var serviceProvider = serviceCollection.BuildServiceProvider();

                ConfigureKissLog(configuration);

                ILogger logger = serviceProvider.GetService<ILogger<Program>>();

                logger.LogTrace("Trace log");
                logger.LogDebug("Debug log");
                logger.LogInformation("Information log");

                // notify the listeners
                var loggers = Logger.Factory.GetAll();
                Logger.NotifyListeners(loggers);
            }

            private static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
            {
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
            }

            private static void ConfigureKissLog(IConfiguration configuration)
            {
                KissLogConfiguration.InternalLog = (message) =>
                {
                    Console.WriteLine(message);
                };

                KissLogConfiguration.Listeners
                    .Add(new RequestLogsApiListener(new Application(configuration["KissLog.OrganizationId"], configuration["KissLog.ApplicationId"]))
                    {
                        ApiUrl = configuration["KissLog.ApiUrl"],
                        UseAsync = false
                    });
            }
        }
    }

.. figure:: images/ConsoleApp-NetCore.png
   :alt: Console App (.NET Core)
   :align: center
