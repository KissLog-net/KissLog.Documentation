.NET 6 Web App
====================

These steps describe how to install and configure KissLog for a .NET 6 Web application.

A full working example can be found `here <https://github.com/KissLog-net/KissLog.Sdk.Samples/tree/main/src/dotnet6_WebApp>`_.

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
    :emphasize-lines: 1-4,10-20,23,37-45

    using KissLog.AspNetCore;
    using KissLog.CloudListeners.Auth;
    using KissLog.CloudListeners.RequestLogsListener;
    using KissLog.Formatters;
    
    var builder = WebApplication.CreateBuilder(args);
    builder.Services.AddLogging(provider =>
    {
        provider
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

    builder.Services.AddHttpContextAccessor();
    builder.Services.AddRazorPages();
    builder.Services.AddControllers();

    var app = builder.Build();

    app.UseStaticFiles();
    app.UseRouting();
    app.UseAuthorization();
    app.MapRazorPages();
    app.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");

    app.UseKissLogMiddleware(options => {
        options.Listeners.Add(new RequestLogsApiListener(new Application(
            builder.Configuration["KissLog.OrganizationId"],
            builder.Configuration["KissLog.ApplicationId"])
        )
        {
            ApiUrl = builder.Configuration["KissLog.ApiUrl"]
        });
    });

    app.Run();

4. Write logs:

.. code-block:: c#
    :caption: HomeController.cs
    :linenos:
    :emphasize-lines: 7,15

    using Microsoft.AspNetCore.Mvc;
    
    namespace dotnet_WebApplication.Controllers
    {
        public class HomeController : Controller
        {
            private readonly ILogger<HomeController> _logger;
            public HomeController(ILogger<HomeController> logger)
            {
                _logger = logger;
            }

            public IActionResult Index()
            {
                _logger.LogDebug("Hello world from dotnet 6!");

                return View();
            }
        }
    }

