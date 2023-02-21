.NET Core Web App
====================

These steps describe how to install and configure KissLog for a .NET Core Web Application.

A full working example can be found `here <https://github.com/KissLog-net/KissLog.Sdk.Samples/tree/main/src/dotnetcore_3.1_WebApp>`_.

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

3. Update **Startup.cs**

.. code-block:: c#
    :caption: Startup.cs
    :linenos:
    :emphasize-lines: 1-5,20,23,27-38,60

    using KissLog;
    using KissLog.AspNetCore;
    using KissLog.CloudListeners.Auth;
    using KissLog.CloudListeners.RequestLogsListener;
    using KissLog.Formatters;

    namespace AspNetCore_WebApp
    {
        public class Startup
        {
            public Startup(IConfiguration configuration)
            {
                Configuration = configuration;
            }

            public IConfiguration Configuration { get; }

            public void ConfigureServices(IServiceCollection services)
            {
                services.AddHttpContextAccessor();

                // Optional. Register IKLogger if you use KissLog.IKLogger instead of Microsoft.Extensions.Logging.ILogger<>
                services.AddScoped<IKLogger>((provider) => Logger.Factory.Get());

                services.AddLogging(logging =>
                {
                    logging.AddKissLog(options =>
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

                services.AddControllersWithViews();
            }

            public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
            {
                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                }
                else
                {
                    app.UseExceptionHandler("/Home/Error");
                }

                app.UseStaticFiles();
                app.UseRouting();
                app.UseAuthorization();
                app.UseSession();

                app.UseKissLogMiddleware(options => ConfigureKissLog(options));

                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller=Home}/{action=Index}/{id?}");
                });
            }

            private void ConfigureKissLog(IOptionsBuilder options)
            {
                KissLogConfiguration.Listeners
                    .Add(new RequestLogsApiListener(new Application(configuration["KissLog.OrganizationId"], configuration["KissLog.ApplicationId"]))
                    {
                        ApiUrl = configuration["KissLog.ApiUrl"]
                    });
            }
        }
    }

4. Write logs:

.. code-block:: c#
    :caption: HomeController.cs
    :linenos:
    :emphasize-lines: 7,15

    using Microsoft.Extensions.Logging;
    
    namespace AspNetCore_WebApp.Controllers
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
                _logger.LogTrace("Trace log");
                _logger.LogDebug("Debug log");
                _logger.LogInformation("Information log");

                return View();
            }
        }
    }

.. figure:: images/NetCore-WebApp.png
   :alt: AspNetCore Web App
   :align: center
