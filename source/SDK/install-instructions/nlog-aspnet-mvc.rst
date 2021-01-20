NLog + ASP.NET MVC
====================

If you have an ASP.NET MVC application which is already using NLog, you can configure it to save the logs to kisslog.net.

1. Install NuGet Package

.. code-block:: none
    :caption: Package Manager Console

    PM> Install-Package KissLog.AspNet.Mvc
    PM> Install-Package KissLog.Adapters.NLog


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

3. Update **NLog.config**

.. code-block:: xml
    :caption: NLog.config
    :emphasize-lines: 3-5,9,14

    <?xml version="1.0" encoding="utf-8" ?>
    <nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
        <extensions>
            <add assembly="KissLog.Adapters.NLog"/>
        </extensions>
 
        <targets>
            <target name="logfile" xsi:type="File" fileName="${baseDir}/logs/nlog-${shortdate}.log" layout="${longdate} ${uppercase:${level}} ${message}" />
            <target name="kisslog" xsi:type="KissLog" layout="${message}" />
        </targets>
 
        <rules>
            <logger name="*" minlevel="Trace" writeTo="logfile" />
            <logger name="*" minlevel="Trace" writeTo="kisslog" />
        </rules>
    </nlog>

4. Update **Global.asax**

.. code-block:: c#
    :caption: Global.asax
    :linenos:
    :emphasize-lines: 1-6,17,19,22-35,66,81,83-88

    using KissLog;
    using KissLog.AspNet.Mvc;
    using KissLog.AspNet.Web;
    using KissLog.CloudListeners.Auth;
    using KissLog.CloudListeners.RequestLogsListener;
    using KissLog.FlushArgs;

    namespace NLog_AspNet_MVC
    {
        public class MvcApplication : System.Web.HttpApplication
        {
            protected void Application_Start()
            {
                AreaRegistration.RegisterAllAreas();
                RouteConfig.RegisterRoutes(RouteTable.Routes);

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
                    .ShouldLogResponseBody((ILogListener listener, FlushLogArgs args, bool defaultValue) =>
                    {
                        if (args.WebProperties.Request.Url.LocalPath == "/")
                            return true;

                        return defaultValue;
                    })
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

                RegisterKissLogListeners();
            }

            private void RegisterKissLogListeners()
            {
                // register KissLog.net cloud listener
                KissLogConfiguration.Listeners.Add(new RequestLogsApiListener(new Application(
                    ConfigurationManager.AppSettings["KissLog.OrganizationId"],
                    ConfigurationManager.AppSettings["KissLog.ApplicationId"])
                )
                {
                    ApiUrl = ConfigurationManager.AppSettings["KissLog.ApiUrl"]
                });
            }

            public static KissLogHttpModule KissLogHttpModule = new KissLogHttpModule();

            public override void Init()
            {
                base.Init();

                KissLogHttpModule.Init(this);
            }
        }
    }


5. Write logs using **NLog.ILogger**

.. code-block:: c#
    :caption: HomeController.cs
    :linenos:
    :emphasize-lines: 1,7,10,15

    using NLog;

    namespace NLog_AspNet_MVC.Controllers
    {
        public class HomeController : Controller
        {
            private readonly ILogger _logger;
            public HomeController()
            {
                _logger = LogManager.GetCurrentClassLogger();
            }

            public ActionResult Index()
            {
                _logger.Info("Hello world from NLog!");
                _logger.Trace("Trace message");
                _logger.Debug("Debug message");
                _logger.Info("Info message");
                _logger.Warn("Warning message");
                _logger.Error("Error message");
                _logger.Fatal("Fatal message");

                return View();
            }
        }
    }

.. figure:: images/NLog-AspNet-MVC.png
   :alt: ASP.NET MVC + NLog
   :align: center

   ASP.NET MVC + NLog

`View sample application <https://github.com/KissLog-net/KissLog.Samples/tree/master/src/NLog-AspNet-MVC>`_