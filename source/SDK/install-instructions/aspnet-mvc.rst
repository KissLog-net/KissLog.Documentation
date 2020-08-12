ASP.NET MVC
====================

These steps describe how to install and configure KissLog for an ASP.NET MVC application.

1. Install NuGet Package

.. code-block:: none
    :caption: Package Manager Console

    PM> Install-Package KissLog.AspNet.Mvc


2. Update **web.config**

.. code-block:: xml
    :caption: web.config

    <configuration>
        <appSettings>
            <add key="KissLog.OrganizationId" value="_OrganizationId_" />
            <add key="KissLog.ApplicationId" value="_ApplicationId_" />
            <add key="KissLog.ApiUrl" value="https://api.kisslog.net" />
        </appSettings>
    </configuration>

3. Update **Global.asax**

.. code-block:: c#
    :caption: Global.asax
    :linenos:
    :emphasize-lines: 1-3,17,19,22-35,37,62,78,80-85

    using KissLog.Apis.v1.Listeners;
    using KissLog.AspNet.Mvc;
    using KissLog.AspNet.Web;
    
    namespace MyApp.Mvc
    {
        public class MvcApplication : System.Web.HttpApplication
        {
            protected void Application_Start()
            {
                AreaRegistration.RegisterAllAreas();
                FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
                RouteConfig.RegisterRoutes(RouteTable.Routes);
                BundleConfig.RegisterBundles(BundleTable.Bundles);
    
                // Add KissLog exception filter
                GlobalFilters.Filters.Add(new KissLogWebMvcExceptionFilterAttribute());
    
                ConfigureKissLog();
            }
    
            protected void Application_Error(object sender, EventArgs e)
            {
                Exception exception = Server.GetLastError();
                if (exception != null)
                {
                    var logger = Logger.Factory.Get();
                    logger.Error(exception);
    
                    if (logger.AutoFlush() == false)
                    {
                        Logger.NotifyListeners(logger);
                    }
                }
            }
    
            private void ConfigureKissLog()
            {
                // optional KissLog configuration
                KissLogConfiguration.Options
                    .AppendExceptionDetails((Exception ex) =>
                    {
                        StringBuilder sb = new StringBuilder();
    
                        if (ex is System.NullReferenceException nullRefException)
                        {
                            sb.AppendLine("Important: check for null references");
                        }
    
                        return sb.ToString();
                    });
    
                // KissLog internal logs
                KissLogConfiguration.InternalLog = (message) =>
                {
                    Debug.WriteLine(message);
                };

                // register logs output
                RegisterKissLogListeners();
            }

            private void RegisterKissLogListeners()
            {
                // multiple listeners can be registered using KissLogConfiguration.Listeners.Add() method

                // add KissLog.net cloud listener
                KissLogConfiguration.Listeners.Add(new KissLogApiListener(new KissLog.Apis.v1.Auth.Application(
                    ConfigurationManager.AppSettings["KissLog.OrganizationId"],
                    ConfigurationManager.AppSettings["KissLog.ApplicationId"])
                )
                {
                    ApiUrl = ConfigurationManager.AppSettings["KissLog.ApiUrl"]
                });
            }

            // Register HttpModule
            public static KissLogHttpModule KissLogHttpModule = new KissLogHttpModule();
    
            public override void Init()
            {
                base.Init();
    
                KissLogHttpModule.Init(this);
            }
        }
    }

4. Write logs using **ILogger**

.. code-block:: c#
    :caption: HomeController.cs
    :linenos:
    :emphasize-lines: 1,8,11,16

    using KissLog;
    using System.Web.Mvc;

    namespace MyApp.Mvc.Controllers
    {
        public class HomeController : Controller
        {
            private readonly ILogger _logger;
            public HomeController()
            {
                _logger = Logger.Factory.Get();
            }
    
            public ActionResult Index()
            {
                _logger.Debug("Hello world from AspNet.Mvc!");
    
                return View();
            }
        }
    }
