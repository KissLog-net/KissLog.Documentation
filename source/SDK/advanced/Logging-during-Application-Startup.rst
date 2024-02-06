Logging during Application Startup
========================================

In this example we will use KissLog to save the logs generated during application startup on a local text file.

.. contents:: Application types
   :local:

ASP.NET Core / .NET6
----------------------------------------------

.. code-block:: c#
    :caption: Program.cs

    var builder = WebApplication.CreateBuilder(args);

    // register LocalTextFileListener
    KissLog.KissLogConfiguration.Listeners.Add(new LocalTextFileListener(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "logs"), FlushTrigger.OnMessage));

    // create a "Program" logger, used to log code executed during application startup
    using var loggerFactory = LoggerFactory.Create(config =>
    {
        config
            .AddConfiguration(builder.Configuration.GetSection("Logging"))
            .AddSimpleConsole()
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
    var logger = loggerFactory.CreateLogger(nameof(Program));

    logger.LogDebug("Executing an important startup code [...]");

    try
    {
        // simulating an exception during startup code

        int zero = 0;
        var result = 10 / zero;
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error executing startup code");
        throw;
    }

    // code removed for simplicity

    app.Run();

.. figure:: images/AspNetCore_startup-logs.png
   :alt: ASP.NET Core Startup logs

.NET Framework
----------------------------------------------

.. code-block:: c#
    :caption: Global.asax

    using KissLog;
    using KissLog.Listeners.FileListener;
    using System;

    namespace AspNet.Mvc
    {
        public class MvcApplication : System.Web.HttpApplication
        {
            protected void Application_Start()
            {
                AreaRegistration.RegisterAllAreas();
                RouteConfig.RegisterRoutes(RouteTable.Routes);

                 // register LocalTextFileListener
                KissLogConfiguration.Listeners.Add(new LocalTextFileListener(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "logs"), FlushTrigger.OnMessage));

                Logger logger = new Logger(url: "Application_Start");

                logger.Debug("Executing an important startup code [...]");

                try
                {
                    // simulating an exception during startup code

                    int zero = 0;
                    var result = 10 / zero;
                }
                catch (Exception ex)
                {
                    logger.Error(ex);
                    throw;
                }
                finally
                {
                    Logger.NotifyListeners(logger);
                }
            }

            // [ ... ]
        }
    }

.. figure:: images/netFramework_startup-logs.png
   :alt: .NET Framework Startup logs