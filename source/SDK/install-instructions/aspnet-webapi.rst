ASP.NET WebApi
====================

These steps describe how to install and configure KissLog for a ASP.NET WebApi application.

A full working example can be found `here <https://github.com/KissLog-net/KissLog.Sdk.Samples/tree/main/src/netframework_WebApi>`_.

Instructions
----------------------------------------------

1. Install NuGet Package

.. code-block:: none
    :caption: Package Manager Console

    PM> Install-Package KissLog.AspNet.WebApi


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
    :emphasize-lines: 1-4,14,19-29,42,44-49

    using KissLog;
    using KissLog.AspNet.Web;
    using KissLog.CloudListeners.Auth;
    using KissLog.CloudListeners.RequestLogsListener;
    
    namespace AspNet.WebApi
    {
        public class WebApiApplication : System.Web.HttpApplication
        {
            protected void Application_Start()
            {
                GlobalConfiguration.Configure(WebApiConfig.Register);

                ConfigureKissLog();
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

            private void ConfigureKissLog()
            {
                KissLogConfiguration.Listeners
                    .Add(new RequestLogsApiListener(new Application(ConfigurationManager.AppSettings["KissLog.OrganizationId"], ConfigurationManager.AppSettings["KissLog.ApplicationId"]))
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

4. Update **WebApiConfig.cs**

.. code-block:: c#
    :caption: WebApiConfig.cs
    :linenos:
    :emphasize-lines: 12, 15

    using KissLog.AspNet.WebApi;
    using System.Web.Http;
    using System.Web.Http.ExceptionHandling;
    
    namespace AspNet.WebApi
    {
        public static class WebApiConfig
        {
            public static void Register(HttpConfiguration config)
            {
                // Add KissLog Exception logger
                config.Services.Replace(typeof(IExceptionLogger), new KissLogExceptionLogger());
    
                // Add KissLog exception filter
                config.Filters.Add(new KissLogWebApiExceptionFilterAttribute());
    
                // Web API routes
                config.MapHttpAttributeRoutes();
    
                config.Routes.MapHttpRoute(
                    name: "DefaultApi",
                    routeTemplate: "api/{controller}/{id}",
                    defaults: new { id = RouteParameter.Optional }
                );
            }
        }
    }

5. Write logs using **IKLogger**

.. code-block:: c#
    :caption: ValuesController.cs
    :linenos:
    :emphasize-lines: 1,8,11,17

    using KissLog;
    using System.Web.Http;

    namespace AspNet.WebApi.Controllers
    {
        public class ValuesController : ApiController
        {
            private readonly IKLogger _logger;
            public ValuesController()
            {
                _logger = Logger.Factory.Get();
            }

            // GET api/values
            public IEnumerable<string> Get()
            {
                _logger.Trace("Trace message");
                _logger.Debug("Debug message");
                _logger.Info("Info message");

                return new string[] { "value1", "value2" };
            }
        }
    }

.. figure:: images/AspNet-WebApi.png
   :alt: ASP.NET WebApi
   :align: center