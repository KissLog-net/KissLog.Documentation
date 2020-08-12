Dependency injection
=====================

.. contents:: Contents
   :local:
   :depth: 1

Scoped lifetime
----------------------------------------------

``ILogger`` has a scoped lifetime.

A separate ``ILogger`` instance must be created for each main function, and must be passed troughout the call stack.

**Example**

The ``SmtpService.Send()`` uses the same ``ILogger``  instance created on the main function ``SendResetPasswordLink()``.

.. code-block:: c#
    :caption: AccountController.cs
    :emphasize-lines: 12,20
        
    public class AccountController : Controller
    {
        private readonly SmtpService _smtpService;
        public AccountController()
        {
            _smtpService = new SmtpService();
        }

        public ActionResult SendResetPasswordLink(string emailAddress)
        {
            // create a local instance of ILogger which will be used troughout the entire method
            ILogger logger = Logger.Factory.Get();

            logger.Debug("Send reset password requested for emailAddress: " + emailAddress);

            string subject = "Reset your password";
            string body = "Hello, To reset your password please access the following url: http://localhost:53335/Account/ConfirmResetPassword?token=[...]";

            // pass the logger instance to subsequent calls
            _smtpService.Send(subject, body, emailAddress, logger);

            return RedirectToAction("Login");
        }
    }

.. code-block:: c#
    :caption: SmtpService.cs
    :emphasize-lines: 7-9,17,21,25
        
    public class SmtpService
    {
        public void Send(string subject, string body, string to, ILogger logger)
        {
            // we receive the logger as a parameter

            logger.Trace("Subject: " + subject);
            logger.Trace("Body: " + body);
            logger.Trace("Send to: " + to);
            
            MailMessage message = new MailMessage();
            message.From = new MailAddress("no-reply@example.com");
            message.Subject = subject;
            message.Body = body;
            message.To.Add(new MailAddress(to));
        
            logger.Trace("MailMessage created");		
        
            using(SmtpClient client = new SmtpClient())
            {
                logger.Debug("SmtpClient created. Sending message...");
                
                client.Send(message);
                
                logger.Debug("Message has been sent");
            }
        }
    }

Pass the ILogger as a method parameter
-----------------------------------------------------

It is recommended to pass the ``ILogger`` as a method parameter rather than passing it as a constructor parameter.

When injecting the ``ILogger`` as a constructor parameter, you can't always guarantee that the same instance will be used across all services.

.. code-block:: c#
    :caption: Recommended
    :emphasize-lines: 4
        
    public class SmtpService
    {
        // Passing the ILogger as a method parameter
        public void Send(string subject, string body, string to, ILogger logger)
        {
            logger.Trace("Subject: " + subject);
            logger.Trace("Body: " + body);
            logger.Trace("Send to: " + to);
        }
    }

.. code-block:: c#
    :caption: Not recommended
    :emphasize-lines: 5
        
    public class SmtpService
    { 
        private readonly ILogger _logger;
        
        // Passing the ILogger as a constructor parameter
        public SmtpService(ILogger logger)
        {
            _logger = logger;
        }

        public void Send(string subject, string body, string to)
        {
            _logger.Trace("Subject: " + subject);
            _logger.Trace("Body: " + body);
            _logger.Trace("Send to: " + to);
        }
    }

Web applications
----------------------------------------------

.. topic:: Create ILogger instance

    .. code-block:: c#

        ILogger logger = Logger.Factory.Get();


For web applications, the ``ILogger`` is created, shared and flushed automatically for each http request (connection).

To retrieve the current http request ``ILogger``, use ``Logger.Factory.Get()`` factory method.

.. code-block:: c#
    :caption: Accessing ILogger in a web application
    :emphasize-lines: 11

    using KissLog;
    using Microsoft.AspNetCore.Mvc;
    
    namespace MyApp.NetCore30.Controllers
    {
        public class HomeController : Controller
        {
            private readonly ILogger _logger;
            public HomeController()
            {
                _logger = Logger.Factory.Get();
            }
        }
    }


Non-web applications
----------------------------------------------

.. topic:: Create ILogger instance

    .. code-block:: c#

        ILogger logger = new Logger("/Main");

        // [...]

        Logger.NotifyListeners(logger);


For non-web applications (Console apps, Windows services), the ``ILogger`` must be created and flushed manually.

Each entry point must create a separate instance of the ``ILogger``.

.. code-block:: c#
    :caption: Program.cs
    :linenos:
    :emphasize-lines: 16,21,27,32

    namespace MyApp.ConsoleApp
    {
        class Program
        {
            static void Main(string[] args)
            {
                ConfigureKissLog();
    
                Foo();
                Bar();
            }
    
            static void Foo()
            {
                // new ILogger instance used only for Foo()
                ILogger logger = new Logger(url: "/Foo");
    
                // execute foo

                // notify the listeners
                Logger.NotifyListeners(logger);
            }

            static void Bar()
            {
                // new ILogger instance used only for Bar()
                ILogger logger = new Logger(url: "/Bar");
    
                // execute bar

                // notify the listeners
                Logger.NotifyListeners(logger);
            }
        }
    }


Dependency Injection frameworks
----------------------------------------------

``ILogger`` should be configured with Dependency Injection frameworks **only for web-based applications**:

- .NET Core
- ASP.NET MVC
- ASP.NET WebApi
- WCF services

When injecting the ``ILogger``, we resolve it **at runtime** using ``Logger.Factory.Get()`` factory method.

.. code-block:: c#
    :caption: Injecting ILogger into HomeController
    :emphasize-lines: 9

    using KissLog;
    using Microsoft.AspNetCore.Mvc;
    
    namespace MyApp.NetCore30.Controllers
    {
        public class HomeController : Controller
        {
            private readonly ILogger _logger;
            public HomeController(ILogger logger)
            {
                _logger = logger;
            }
        }
    }

.NET Core
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: c#
    :emphasize-lines: 7-10
        
    namespace MyApplication
    {
        public class Startup
        {
            public void ConfigureServices(IServiceCollection services)
            {
                services.AddScoped<ILogger>((context) =>
                {
                    return Logger.Factory.Get();
                });
            }
        }
    }

Unity
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: c#
    :emphasize-lines: 9-11
        
    namespace MyApplication
    {
        public static class UnityConfig
        {
            private static void ConfigureContainer()
            {
                var container = new UnityContainer();

                container.RegisterType<ILogger>(
                    new InjectionFactory(u => Logger.Factory.Get())
                );
            }
        }
    }

Ninject
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: c#
    :emphasize-lines: 7-10
        
    namespace MyApplication.App_Start
    {
        public static class NinjectWebCommon
        {
            private static void RegisterServices(IKernel kernel)
            {
                kernel.Bind<ILogger>().ToMethod((context) =>
                {
                    return Logger.Factory.Get();
                });
            }
        }
    }

Autofac
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: c#
    :emphasize-lines: 9-11
        
    namespace MyApplication
    {
        public static class AutofacConfig
        {
            private static void ConfigureContainer()
            {
                var builder = new ContainerBuilder();

                builder
                    .Register(p => Logger.Factory.Get())
                    .As<ILogger>();
            }
        }
    }