AspNet MVC
====================

These steps describe how to install and configure KissLog for an Asp.Net MVC application.

.. contents::
   :local:

Install NuGet Package
-------------------------

.. code-block::

    PM> Install-Package KissLog.AspNet.Mvc


Update web.config
-------------------------

Replace `Organization ID` and `Application ID` with corresponding values from KissLog account page.

.. code-block:: xml
    :linenos:
    :caption: web.config

    <configuration>
        <appSettings>
            <add key="KissLog.OrganizationId" value="Organization ID" />
            <add key="KissLog.ApplicationId" value="Application ID" />
        </appSettings>
    </configuration>


Update Global.asax
-------------------------

.. code-block:: c#
    :linenos:
    :caption: Global.asax

    using KissLog.Apis.v1.Listeners;
    using KissLog.AspNet.Mvc;
    using KissLog.AspNet.Web;
    
    namespace KissLog.Samples.AspNetMvc
    {
        public class MvcApplication : System.Web.HttpApplication
        {
            protected void Application_Start()
            {
                AreaRegistration.RegisterAllAreas();
                RouteConfig.RegisterRoutes(RouteTable.Routes);
    
                // Add KissLog exception filter
                GlobalFilters.Filters.Add(new KissLogWebMvcExceptionFilterAttribute());
    
                ConfigureKissLog();
            }
    
            private void ConfigureKissLog()
            {
                // KissLog cloud listener
                KissLogConfiguration.Listeners.Add(new KissLogApiListener(new KissLog.Apis.v1.Auth.Application(
                    ConfigurationManager.AppSettings["KissLog.OrganizationId"],
                    ConfigurationManager.AppSettings["KissLog.ApplicationId"])
                ));
            }
    
            protected void Application_Error(object sender, EventArgs e)
            {
                Exception exception = Server.GetLastError();
                if (exception != null)
                {
                    var logger = Logger.Factory.Get();
                    logger.Error(exception);

                    if(logger.AutoFlush() == false)
                    {
                        Logger.NotifyListeners(logger);
                    }
                }
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

Use the ILogger
-------------------------

.. code-block:: c#
    :linenos:
    :caption: HomeController.cs

    using KissLog;

    namespace KissLog.Samples.AspNetMvc.Controllers
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