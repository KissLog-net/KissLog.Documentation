Logger lifecycle
========================================

Logger lifetime
---------------------------------

Logger has a scoped lifetime.

All the created events (messages) are saved in-memory and are flushed when ``Logger.NotifyListeners(logger)`` is executed.

Console applications
---------------------------------

For console applications it is important to use the same logger instance throughout the entire code execution.

You inject the logger using ``Logger.SetFactory()`` and you resolve it using ``Logger.Factory.Get()``.

Logger is flushed at the end of the code execution by calling ``Logger.NotifyListeners(logger)``.

.. code-block:: c#

    using KissLog;

    namespace ConsoleApp_NetFramework
    {
        class Program
        {
            static void Main(string[] args)
            {
                // inject the logger
                Logger.SetFactory(new LoggerFactory(new Logger()));

                // resolve the logger
                var logger = Logger.Factory.Get();
                logger.Trace("Hey, I am the same logger created on line 10");

                // flush the logger
                Logger.NotifyListeners(logger);
            }
        }
    }

Web applications
---------------------------------

For web applications the logger is created automatically by KissLog and shared throughout the entire http request.

Logger can be resolved using ``Logger.Factory.Get()``.

Logger is flushed automatically at the end of the http request, hence there is no need to call ``Logger.NotifyListeners()``.

.. code-block:: c#

    using KissLog;
    using System.Web.Mvc;

    namespace AspNet.Mvc.Controllers
    {
        public class HomeController : Controller
        {
            private readonly IKLogger _logger;
            public HomeController()
            {
                // resolve the logger
                _logger = Logger.Factory.Get();
            }

            public ActionResult Index()
            {
                _logger.Debug("Hey, I am a web application");
                return View();
            }
        }
    }


.NET Core
---------------------------------

For .NET Core (both [web applications](.NET-Core-Web-App) and [console applications](ConsoleApp-(.NET-Core))), KissLog is configured as an ``Microsoft.Extensions.Logging`` adapter.

For this reason, there is no need to inject the logger as this is automatically handled by .NET Core.

Logs are written using ``Microsoft.Extensions.Logging.ILogger<>`` interface.

Using an IoC container
---------------------------------

For web applications, IoC containers can be used to resolve at runtime the call to ``Logger.Factory.Get()``.

.. code-block:: c#

    using KissLog;
    using System.Web.Mvc;

    namespace MyApplication.Controllers
    {
        public class HomeController : Controller
        {
            private readonly IKLogger _logger;
            public HomeController(IKLogger logger)
            {
                _logger = logger;
            }

            public ActionResult Index()
            {
                _logger.Debug("Hey, I have been injected");
                return View();
            }
        }
    }


Injecting ``Logger`` using ``Ninject``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: c#

    namespace MyApplication
    {
        public static class NinjectWebCommon
        {
            private static void RegisterServices(IKernel kernel)
            {
                kernel.Bind<IKLogger>().ToMethod((context) =>
                {
                    return Logger.Factory.Get();
                });
            }
        }
    }


Injecting ``Logger`` using ``Unity``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: c#

    namespace MyApplication
    {
        public static class UnityConfig
        {
            private static void ConfigureContainer()
            {
                var container = new UnityContainer();

                container.RegisterType<IKLogger>(
                    new InjectionFactory(u => Logger.Factory.Get())
                );
            }
        }
    }


Injecting ``Logger`` using ``Autofac``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: c#

    namespace MyApplication
    {
        public static class AutofacConfig
        {
            private static void ConfigureContainer()
            {
                var builder = new ContainerBuilder();

                builder
                    .Register(p => Logger.Factory.Get())
                    .As<IKLogger>();
            }
        }
    }


