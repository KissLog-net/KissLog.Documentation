.Net Core
====================

These steps describe how to install and configure KissLog for a .NET Core application.

.. contents::
   :local:

Install NuGet Package
-------------------------

.. code-block::

    PM> Install-Package KissLog.AspNetCore
   

Update appSettings.json
-------------------------

Replace `Organization ID` and `Application ID` with corresponding values from KissLog account page.

.. code-block:: javascript
    :caption: appsettings.json

    {
        "KissLog.OrganizationId": "Organization ID",
        "KissLog.ApplicationId": "Application ID"
    }

Update Startup.cs
-------------------------

.. code-block:: c#
    :linenos:
    :caption: Startup.cs

    using KissLog.Apis.v1.Listeners;
    using KissLog.AspNetCore;
    using KissLog.Listeners;
        
    namespace KissLog.Samples.AspNetCore
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
                // register dependencies
                services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
                services.AddScoped<ILogger>((context) =>
                {
                    return Logger.Factory.Get();
                });

                services.AddSession();

                services.AddMvc();
            }

            public void Configure(IApplicationBuilder app, IHostingEnvironment env)
            {
                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                }

                app.UseStaticFiles();

                app.UseSession();

                // make sure it is added after app.UseStaticFiles() and app.UseSession(), and before app.UseMvc()
                app.UseKissLogMiddleware(options => {
                    options.Listeners.Add(new KissLogApiListener(new KissLog.Apis.v1.Auth.Application(
                        Configuration["KissLog.OrganizationId"],
                        Configuration["KissLog.ApplicationId"])
                    ));
                });

                app.UseMvc(routes =>
                {
                    routes.MapRoute(
                        name: "default",
                        template: "{controller=Home}/{action=Index}/{id?}");
                });
            }
        }
    }

Use the ILogger
-------------------------

.. code-block:: c#
    :linenos:
    :caption: HomeController.cs

    using KissLog;

    namespace KissLog.Samples.AspNetCore.Controllers
    {
        public class HomeController : Controller
        {
            private readonly ILogger _logger;
            public HomeController(ILogger logger)
            {
                _logger = logger;
            }

            public IActionResult Index()
            {
                _logger.Debug("Hello world from AspNetCore!");

                return View();
            }
        }
    }
