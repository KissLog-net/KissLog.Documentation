Change log
=======================================================

.. contents:: Versions
   :local:

KissLog 5.1.2
--------------------------

KissLog.AspNetCore 5.1.2 | KissLog.AspNet.Mvc 5.1.2 | KissLog.AspNet.WebApi 5.1.2 | KissLog.CloudListeners 5.1.2

Release date: 02-05-2022

https://github.com/KissLog-net/KissLog.Sdk/releases/tag/5.1.2

**Fixes**

- Logging same InnerException throws an error (https://github.com/KissLog-net/KissLog.Sdk/issues/60)

KissLog 5.1.1
--------------------------

KissLog.AspNetCore 5.1.1 | KissLog.AspNet.Mvc 5.1.1 | KissLog.AspNet.WebApi 5.1.1 | KissLog.CloudListeners 5.1.1

Release date: 27-12-2021

https://github.com/KissLog-net/KissLog.Sdk/releases/tag/5.1.1

**Fixes**

- MachineName is null for ConsoleApps (https://github.com/KissLog-net/KissLog.Sdk/issues/56)

KissLog 5.1.0
--------------------------

KissLog.AspNetCore 5.1.0 | KissLog.AspNet.Mvc 5.1.0 | KissLog.AspNet.WebApi 5.1.0 | KissLog.CloudListeners 5.1.0

Release date: 26-12-2021

https://github.com/KissLog-net/KissLog.Sdk/releases/tag/5.1.0

**Fixes**

- MirrorStreamDecorator: Cannot access a closed Stream (https://github.com/KissLog-net/KissLog.Sdk/issues/54)

KissLog 5.0.0
--------------------------

KissLog.AspNetCore 5.0.0 | KissLog.AspNet.Mvc 5.0.0 | KissLog.AspNet.WebApi 5.0.0 | KissLog.CloudListeners 5.0.0

Release date: 06-11-2021

https://github.com/KissLog-net/KissLog.Sdk/releases/tag/5.0.0

**Improvements**

All the functionality has been rewritten from the ground up.

Introduced 630+ unit tests.

Implemented a more simplified and adaptive logging framework.

KissLog now fully supports .NET 5, both Web and Console applications.

**Migration guide**

A list of test applications using KissLog can found `on GitHub <https://github.com/KissLog-net/KissLog.Sdk/tree/master/testApps>`_.

1). **ILogger** has been renamed to **IKLogger**.

.. code-block:: c#

    // KissLog <= 4.1.0
    public void Foo()
    {
        ILogger logger = Logger.Factory.Get();
    }

    // KissLog >= 5.0.0
    public void Foo()
    {
        IKLogger logger = Logger.Factory.Get();
    }

2). ``MinimumResponseHttpStatusCode`` and ``MinimumLogMessageLevel`` have been removed from log listeners and replaced with the optional ``Interceptor`` property.

A custom ``StatusCodeInterceptor`` has been created to replace the previous functionality.

.. code-block:: c#

    // KissLog <= 4.1.0
    public void RegisterKissLogListeners()
    {
        KissLogConfiguration.Listeners
            .Add(new RequestLogsApiListener(new Application(ConfigurationManager.AppSettings["KissLog.OrganizationId"], ConfigurationManager.AppSettings["KissLog.ApplicationId"]))
            {
                ApiUrl = ConfigurationManager.AppSettings["KissLog.ApiUrl"],
                MinimumResponseHttpStatusCode = 400,
                MinimumLogMessageLevel = LogLevel.Trace
            });
    }

    // KissLog >= 5.0.0
    public void RegisterKissLogListeners()
    {
        // without specifying an interceptor
        KissLogConfiguration.Listeners
            .Add(new RequestLogsApiListener(new Application(ConfigurationManager.AppSettings["KissLog.OrganizationId"], ConfigurationManager.AppSettings["KissLog.ApplicationId"]))
            {
                ApiUrl = ConfigurationManager.AppSettings["KissLog.ApiUrl"]
            });

        // using the custom "StatusCodeInterceptor" interceptor
        KissLogConfiguration.Listeners
            .Add(new RequestLogsApiListener(new Application(ConfigurationManager.AppSettings["KissLog.OrganizationId"], ConfigurationManager.AppSettings["KissLog.ApplicationId"]))
            {
                ApiUrl = ConfigurationManager.AppSettings["KissLog.ApiUrl"],
                Interceptor = new StatusCodeInterceptor
                {
                    MinimumLogMessageLevel = LogLevel.Trace,
                    MinimumResponseHttpStatusCode = 400
                }
            })
    }

3). ``LocalTextFileListener`` has been moved to ``KissLog.Listeners.FileListener`` namespace.

.. code-block:: c#

    // KissLog <= 4.1.0
    public void RegisterKissLogListeners()
    {
        KissLogConfiguration.Listeners
            .Add(new KissLog.Listeners.LocalTextFileListener(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "logs"))
            {
                FlushTrigger = FlushTrigger.OnMessage
            });
    }

    // KissLog >= 5.0.0
    public void RegisterKissLogListeners()
    {
        KissLogConfiguration.Listeners
            .Add(new KissLog.Listeners.FileListener.LocalTextFileListener("logs", FlushTrigger.OnMessage));
    }

4). ``Options.GenerateKeywords`` has been renamed to ``GenerateSearchKeywords``.

.. code-block:: c#

    // KissLog <= 4.1.0
    public void ConfigureKissLog()
    {
        KissLogConfiguration.Options
            .GenerateKeywords((FlushLogArgs args, IList<string> defaultKeywords) =>
            {
                defaultKeywords.Add("CorrelationID:b001c6bf");
                return defaultKeywords;
            });
    }

    // KissLog >= 5.0.0
    public void ConfigureKissLog()
    {
        KissLogConfiguration.Options
            .GenerateSearchKeywords((FlushLogArgs args) =>
            {
                var service = new GenerateSearchKeywordsService();
                List<string> defaultKeywords = service.GenerateKeywords(args).ToList();

                defaultKeywords.Add("CorrelationID:b001c6bf");
                return defaultKeywords;
            });
    }

5). ``Options.GetUser`` has been renamed to ``CreateUserPayload``.

.. code-block:: c#

    // KissLog <= 4.1.0
    public void ConfigureKissLog()
    {
        KissLogConfiguration.Options
            .GetUser((RequestProperties request) =>
            {
                return new UserDetails
                {
                    Name = "user@example.com",
                    Avatar = string.Format("https://eu.ui-avatars.com/api/?name={0}&size=256", "user@example.com")
                };
            });
    }

    // KissLog >= 5.0.0
    public void ConfigureKissLog()
    {
        KissLogConfiguration.Options
            .CreateUserPayload((KissLog.Http.HttpRequest httpRequest) =>
            {
                return new KissLog.RestClient.Requests.CreateRequestLog.User
                {
                    Name = "user@example.com",
                    Avatar = string.Format("https://eu.ui-avatars.com/api/?name={0}&size=256", "user@example.com")
                };
            });
    }

6). ``Options.OnRequestLogsApiListenerException`` has been replaced with ``RequestLogsApiListener.OnException`` property.

.. code-block:: c#

    // KissLog <= 4.1.0
    public void ConfigureKissLog()
    {
        KissLogConfiguration.Options
            .OnRequestLogsApiListenerException((ExceptionArgs args) =>
            {
                var listener = new LocalTextFileListener(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Logs"))
                {
                    FlushTrigger = FlushTrigger.OnFlush
                };
                listener.OnFlush(args.FlushArgs, null);
            });
    }

    // KissLog >= 5.0.0
    public void RegisterKissLogListeners()
    {
        KissLogConfiguration.Listeners
            .Add(new RequestLogsApiListener(new Application(ConfigurationManager.AppSettings["KissLog.OrganizationId"], ConfigurationManager.AppSettings["KissLog.ApplicationId"]))
            {
                ApiUrl = ConfigurationManager.AppSettings["KissLog.ApiUrl"],
                OnException = (ExceptionArgs args) =>
                {
                    var listener = new LocalTextFileListener("logs", FlushTrigger.OnFlush);
                    listener.OnFlush(args.FlushArgs);
                }
            });
    }


KissLog.Cloud 4.2.0
--------------------------

KissLog.AspNetCore 4.2.0 | KissLog.AspNet.Mvc 4.2.0 | KissLog.AspNet.WebApi 4.2.0

Release date: 06-08-2021

**Improvements**

Implemented ``KissLogConfiguration.Options.OnRequestLogsApiListenerException()``.

This handler is invoked when the REST request to KissLog server fails.

.. code-block:: c#

    protected void Application_Start()
    {
        KissLogConfiguration.Options
            .OnRequestLogsApiListenerException((ExceptionArgs args) =>
            {
                string url = args.FlushArgs.WebProperties.Request.Url.AbsoluteUri;
                List<string> logs = args.FlushArgs.MessagesGroups.SelectMany(p => p.Messages).OrderBy(p => p.DateTime).Select(p => p.Message).ToList();
                string payload = args.Payload;

                // KissLog server returned an error while saving the request
                // we will save the logs to local text file instead

                var localTextFileListener = new LocalTextFileListener(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Logs"))
                {
                    FlushTrigger = FlushTrigger.OnFlush
                };
                localTextFileListener.OnFlush(args.FlushArgs, null);
            });
    }

KissLog 4.1.0
--------------------------

https://github.com/KissLog-net/KissLog.Sdk/releases/tag/4.1.0

KissLog.AspNetCore 4.1.0 | KissLog.AspNet.Mvc 4.1.0 | KissLog.AspNet.WebApi 4.1.0 | KissLog.CloudListeners 4.1.0

Release date: 31-01-2021

**Improvements**

Implemented AspNetCore logger provider.

With this change, logs created with ``Microsoft.Extensions.Logging.ILogger`` will be saved to kisslog.net.

.. code-block:: c#
    :emphasize-lines: 1, 9-12
    :caption: Startup.cs

    using KissLog;

    namespace MyApplication.AspNetCore
    {
        public class Startup
        {
            public void ConfigureServices(IServiceCollection services)
            {
                services.AddLogging(logging =>
                {
                    logging.AddKissLog(new KissLogAspNetCoreOptions());
                });

                services.AddControllersWithViews();
            }
        }
    }

.. code-block:: c#
    :emphasize-lines: 1,7,15
    :caption: HomeController.cs

    using Microsoft.Extensions.Logging;

    namespace MyApplication.AspNetCore.Controllers
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
                _logger.LogInformation("Hello world from KissLog!");

                return View();
            }
        }
    }

.. figure:: images/AspNetCore-LoggerProvider.png
   :alt: Microsoft.Extensions.Logging.ILogger logs
   :align: center

   Microsoft.Extensions.Logging.ILogger logs

KissLog 4.0.0
--------------------------

KissLog.AspNetCore 4.0.0 | KissLog.AspNet.Mvc 4.0.0 | KissLog.AspNet.WebApi 4.0.0 | KissLog.CloudListeners 4.0.0

Release date: 19-09-2020

**Breaking changes**

``KissLog.Apis.v1`` NuGet package has been deprecated. Use ``KissLog.CloudListeners`` instead.

``KissLogApiListener`` has been replaced with ``RequestLogsApiListener``.

**Before** (KissLog <= 3.5.6)

.. code-block:: c#
    :emphasize-lines: 1-2, 10

    using KissLog.Apis.v1.Listeners;
    using KissLog.Apis.v1.Auth;

    namespace MyApp.Mvc
    {
        public class MvcApplication : System.Web.HttpApplication
        {
            private void RegisterKissLogListeners()
            {
                KissLogConfiguration.Listeners.Add(new KissLogApiListener(new Application(
                    ConfigurationManager.AppSettings["KissLog.OrganizationId"],
                    ConfigurationManager.AppSettings["KissLog.ApplicationId"])
                )
                {
                    ApiUrl = ConfigurationManager.AppSettings["KissLog.ApiUrl"]
                });
            }
        }
    }

**After** (KissLog >= 4.0.0)

.. code-block:: c#
    :emphasize-lines: 1-2, 10

    using KissLog.CloudListeners.Auth;
    using KissLog.CloudListeners.RequestLogsListener;

    namespace MyApp.Mvc
    {
        public class MvcApplication : System.Web.HttpApplication
        {
            private void RegisterKissLogListeners()
            {
                KissLogConfiguration.Listeners.Add(new RequestLogsApiListener(new Application(
                    ConfigurationManager.AppSettings["KissLog.OrganizationId"],
                    ConfigurationManager.AppSettings["KissLog.ApplicationId"])
                )
                {
                    ApiUrl = ConfigurationManager.AppSettings["KissLog.ApiUrl"]
                });
            }
        }
    }

``ITextFormatter`` has been replaced with ``KissLog.Formatting.TextFormatter``.

KissLog 3.5.6
--------------------------

KissLog.AspNetCore 2.5.6 | KissLog.AspNet.Mvc 3.5.6 | KissLog.AspNet.WebApi 3.5.6 | KissLog.Apis.v1 2.5.6

Release date: 03-03-2020

**Breaking changes**

``KissLogConfiguration.Options.AddRequestKeywords()`` has been deprecated.

Use ``KissLogConfiguration.Options.GenerateKeywords()`` instead.

.. code-block:: c#

    protected void Application_Start()
    {
        // before
        KissLogConfiguration.Options
            .AddRequestKeywords((FlushLogArgs args) =>
            {
                return new List<string>();
            });

        // after
        KissLogConfiguration.Options
            .GenerateKeywords((FlushLogArgs args, IList<string> defaultKeywords) =>
            {
                return defaultKeywords;
            });
    }

**Improvements**

Implemented ``KissLogConfiguration.Options.GenerateKeywords()``.

This handler allows developers to specify search keywords for a particular request.

.. code-block:: c#
    :emphasize-lines: 8

    protected void Application_Start()
    {
        KissLogConfiguration.Options
            .GenerateKeywords((FlushLogArgs args, IList<string> defaultKeywords) =>
            {
                List<string> keywords = new List<string>();

                keywords.Add("CorrelationID:b001c6bf");

                return keywords;
            });
    }

Implemented ``KissLogConfiguration.Options.ShouldLogRequestFormData()``.

Using this handler, developers can prevent KissLog from reading the FormData parameters.

In the example below, we instruct KissLog not to log the FormData parameters when ``Content-Type="multipart/*"``.

.. code-block:: c#

    protected void Application_Start()
    {
        KissLogConfiguration.Options
            .ShouldLogRequestFormData((HttpRequest request) =>
            {
                string contentType = request.Properties.Headers.FirstOrDefault(p => string.Compare(p.Key, "Content-Type", true) == 0).Value;

                if (!string.IsNullOrEmpty(contentType))
                {
                    if (contentType.ToLowerInvariant().StartsWith("multipart/"))
                    {
                        return false;
                    }
                }

                return true;
            });
    }

KissLog 3.5.5
--------------------------

KissLog.AspNetCore 2.5.5 | KissLog.AspNet.Mvc 3.5.5 | KissLog.AspNet.WebApi 3.5.5

Release date: 14-12-2019

General improvements

KissLog 3.5.2
--------------------------

KissLog.AspNetCore 2.5.3 | KissLog.AspNet.Mvc 3.5.4 | KissLog.AspNet.WebApi 3.5.4

Release date: 22-11-2019

**Improvements**

Improved fire-and-forget logging for ``KissLogApiListener``.

.. code-block:: c#
    :emphasize-lines: 11

    namespace KissLog.Apis.v1.Listeners
    {
        public class KissLogApiListener : ILogListener
        {
            public void OnFlush(FlushLogArgs args, ILogger logger)
            {
                IFlusher flusher = CreateFlusher(flushProperties);

                if (UseAsync == true)
                {
                    flusher.FlushAsync(request, copy).ConfigureAwait(false);
                }
                else
                {
                    flusher.Flush(request, copy);
                }
            }
        }
    }

KissLog 3.5.1
--------------------------

KissLog.AspNetCore 2.5.1 | KissLog.AspNet.Mvc 3.5.1 | KissLog.AspNet.WebApi 3.5.1

Release date: 16-10-2019

Fixes: https://github.com/KissLog-net/KissLog.Sdk/issues/19

**Improvements**

``LogListenerParser`` exposes an additional event:

.. code-block:: c#

    public class LogListenerParser
    {
        public virtual bool ShouldLog(BeginRequestArgs args, ILogListener logListener)
        {
            HttpRequest request = args.Request;

            return true;
        }
    }


The event gets executed at the beginning of the request. If returns ``false``, the ILogListener will skip the current request.

.. code-block:: none

    Begin GET /swagger/         <---- start of the request

                                <---- ShouldFlush(BeginRequestArgs args) is executed
                                <---- if false, the listener will skip the request


    _logger.Debug("step 1");    <---- skipped
    _logger.Debug("step 2");    <---- skipped
    ...
    _logger.Debug("step n");    <---- skipped


    END 200 OK GET /swagger/    <---- end of the request



KissLog 3.5.0
--------------------------

KissLog.AspNetCore 2.5.0 | KissLog.AspNet.Mvc 3.5.0 | KissLog.AspNet.WebApi 3.5.0

Release date: 12-10-2019

**Breaking changes**

The changes will affect only the custom implementations of LogListeners.

``ILogListener`` implements two additional methods:

.. code-block:: c#
    :emphasize-lines: 3,4

    public interface ILogListener
    {
        void OnBeginRequest(HttpRequest httpRequest, ILogger logger);
        void OnMessage(LogMessage message, ILogger logger);
        void OnFlush(FlushLogArgs args, ILogger logger);
    }


- ``OnBeginRequest(HttpRequest httpRequest)`` is executed at the beginning of the HTTP request.

- ``OnMessage(LogMessage message)`` is executed each time a log message is created.

These changes allows for more flexibility when creating custom LogListeners.

**Improvements**

Updated ``LocalTextFileListener`` log listener, which now can write the logs as soon as they get created.

.. code-block:: c#
    :emphasize-lines: 5

    protected void Application_Start()
    {
        KissLogConfiguration.Listeners.Add(new LocalTextFileListener(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Logs"))
        {
            FlushTrigger = FlushTrigger.OnFlush // OnFlush | OnMessage
        });
    }


Implemented ``NLogTargetListener`` which writes the ``ILogger`` logs to the ``NLog`` targets.

This is useful when you want to save the logs to both KissLog.net cloud and to the NLog targets - defined in **NLog.config**.

.. code-block:: c#

    protected void Application_Start()
    {
        KissLogConfiguration.Listeners.Add(new NLogTargetListener());
    }


KissLog.AspNetCore 2.4.2
----------------------------------------------

KissLog.AspNet.Mvc 3.4.1 | KissLog.AspNet.WebApi 3.4.1

Release date: 26-09-2019

Fixes: https://github.com/KissLog-net/KissLog.Sdk/issues/15

KissLog.AspNetCore is now compatible with **.NET Core 3.0**

Fixed errors caused by the ``ILogger`` trying to read Request/Response content.

KissLog 3.4.0
----------------------------------------------

Release date: 05-07-2019

**Improvements**

Implemented ``logger.AddCustomProperty(key, value)`` method.

Custom properties can be viewed from the RequestLog view, and they can be accessed from within the Alerts JavaScript context.


.. code-block:: c#

    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ILogger logger = Logger.Factory.Get();

            logger.AddCustomProperty("Boolean value", true);
            logger.AddCustomProperty("Double value", 1320.04);
            logger.AddCustomProperty("String value", "Hello world!");

            return View();
        }
    }


.. figure:: images/logger_addCustomProperty.png
   :alt: logger.AddCustomProperty
   :align: center

   logger.AddCustomProperty


**Breaking changes**

For **.NET MVC** and **.NET WebApi** applications, ``Application_Error`` method needs to be updated to ensure that KissLog logs startup exceptions.

.. code-block:: c#
    :linenos:
    :emphasize-lines: 9-12

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


KissLog 3.3.0
----------------------------------------------

Implemented logging integration for Windows / Console applications.

.. code-block:: c#
    :linenos:
    :emphasize-lines: 7,11,15,20

    namespace ConsoleApp_sample
    {
        class Program
        {
            static void Main(string[] args)
            {
                ILogger logger = new Logger(url: "Main");

                try
                {
                    logger.Debug("Hello world from Console application!");
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
        }
    }

.. figure:: images/consoleApp.png
   :alt: Console application
   :align: center

   Console application

KissLog.AspNetCore 2.2.1
----------------------------------------------

Release date: 21-05-2019

Updated ``app.UseKissLogMiddleware(options)``

.. code-block:: c#
    :linenos:
    :emphasize-lines: 7-16

    public class Startup
    {
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseStaticFiles();

            app.UseKissLogMiddleware(options => {
                options.Listeners.Add(new KissLogApiListener(new KissLog.Apis.v1.Auth.Application(
                    Configuration["KissLog.OrganizationId"],
                    Configuration["KissLog.ApplicationId"])
                ));

                options.Options.ShouldLogResponseBody((logListener, logArgs, defaultValue) => {
                    return logArgs.WebRequestProperties.Response.HttpStatusCode >= System.Net.HttpStatusCode.BadRequest;
                });
            });

            app.UseMvc();
        }
    }



KissLog 3.2.0
----------------------------------------------

Release date: 19-05-2019

**Breaking changes**

**Environment** configuration has been removed.

Old usage:

.. code-block:: c#

    protected void Application_Start()
    {
        KissLogConfiguration.Listeners.Add(new KissLogApiListener(
            Configuration["KissLog.OrganizationId"],
            Configuration["KissLog.ApplicationId"],
            Configuration["KissLog.Environment"]
        ));
    }

New usage:

.. code-block:: c#

    protected void Application_Start()
    {
        KissLogConfiguration.Listeners.Add(
            new KissLogApiListener(new KissLog.Apis.v1.Auth.Application(
                Configuration["KissLog.OrganizationId"], 
                Configuration["KissLog.ApplicationId"])
            )
        );
    }


**Options**

New methods and properties:

- ``Options.AddRequestKeywords()`` - adds search keywords for the current request

.. code-block:: c#
    :caption: Find the request by searching for "checkoutFailed"

    protected void Application_Start()
    {
        KissLogConfiguration.Options
            .AddRequestKeywords((FlushLogArgs args) =>
            {
                if ((int)args.WebRequestProperties.Response.HttpStatusCode >= 400)
                {
                    if(args.WebRequestProperties.Url.LocalPath.Contains("/checkout/process"))
                    {
                        return new[] { "checkoutFailed" };
                    }
                }

                return null;
            });
    }

**General improvements and fixes**

Creating multiple log categories would not work in some scenarios.

This issue has been fixed.

.. code-block:: c#

    public void Foo(string sqlScript)
    {
        ILogger logger = Logger.Factory.Get("EntityFramework");

        logger.Debug("ExecuteSqlCommand script " + sqlScript);

        _db.Database.ExecuteSqlCommand(new RawSqlString(sqlScript));
    }


``KissLogApiListener`` has been improved.

KissLog 3.1.1
----------------------------------------------

Release date: 27-03-2019

**Options**

New methods and properties:

.. code-block:: c#

    public class Options
    {
        // runtime handler used to include / exclude ResponseBody
        ShouldLogResponseBody(Func<ILogListener, FlushLogArgs, bool, bool> handler) => defaultValue;
    }


Usage:

.. code-block:: c#

    void Application_Start()
    {
        KissLogConfiguration.Options
            .ShouldLogResponseBody((ILogListener listener, FlushLogArgs args, bool defaultValue) =>
            {
                if ((int) args.WebRequestProperties.Response.HttpStatusCode >= 400)
                {
                    // explicitly log the ResponseBody if the HTTP request was unsuccessful
                    return true;
                }

                // use the defaultValue (which is calculated based on the Response Content-Type header)
                return defaultValue;
            });
    }


KissLog 3.1.0
----------------------------------------------

Release date: 26-03-2019

Starting with this version, Response.ContentLength will be automatically logged for all the HTTP requests.

KissLog 3.0.0
----------------------------------------------

Release date: 15-03-2019

**Logger**

New methods and properties:

.. code-block:: c#
    :emphasize-lines: 3,4

    public void Foo()
    {
        ILogger logger = Logger.Factory.Get();
        FlushLogArgs args = Logger.CreateFlushArgs(logger);

        Console.WriteLine(args.MessagesGroups.Count());
    }


**KissLogConfiguration**

Removed methods and properties:

.. code-block:: c#

    public static class KissLogConfiguration
    {
        // -> moved to Options.GetUser
        Func<RequestProperties, string> GetLoggedInUserName { get; set; }
        Func<RequestProperties, string> GetLoggedInUserEmailAddress { get; set; }
        Func<RequestProperties, string> GetLoggedInUserAvatar { get; set; }

        // -> moved to Options.ShouldLogRequestInputStream
        Func<WebRequestProperties, bool> ShouldLogRequestInputStream { get; set; }

        // -> moved to Options.ShouldLogRequestCookie
        Func<string, bool> ShouldLogCookie = { get; set; }

        // -> moved to Options.AppendExceptionDetails
        Func<Exception, string> AppendExceptionDetails { get; set; }

        // removed
        Func<WebRequestProperties, bool> ShouldLogResponseBody { get; set; }
    }


New methods and properties:

.. code-block:: c#

    public static class KissLogConfiguration
    {
        // holds all the KissLog configuration
        Options Options { get; }
    }


**LogListenerParser**

Removed methods and properties:

.. code-block:: c#

    public class LogListenerParser
    {
        // removed
        List<string> KeysToObfuscate { get; set; }

        // removed
        virtual bool ShouldLog(WebRequestProperties webRequestProperties, ILogListener logListener)

        // -> moved to BeforeFlush(FlushLogArgs args, ILogListener logListener)
        virtual void AlterDataBeforePersisting(FlushLogArgs args)

        // -> moved to BeforeFlush(FlushLogArgs args, ILogListener logListener)
        virtual void RemoveDataBeforePersisting(FlushLogArgs args)
    }


New methods and properties:

.. code-block:: c#

    public class LogListenerParser
    {
        // callback which is called automatically before persisting the logs. FlushLogArgs can be altered at this step
        virtual void BeforeFlush(FlushLogArgs args, ILogListener logListener)
    }


**Options**

Container for KissLog configuration.

.. code-block:: c#

    public class Options
    {
        // JSON settings used when serializing the object arguments on log message
        JsonSerializerSettings JsonSerializerSettings { get; }

        // handler to populate the logged-in user properties (used for https://kisslog.net user interface)
        GetUser(Func<RequestProperties, UserDetails> handler)

        // runtime handlers used to include / exclude different HTTP properties
        ShouldLogRequestHeader(Func<ILogListener, FlushLogArgs, string, bool> handler) => true;
        ShouldLogRequestCookie(Func<ILogListener, FlushLogArgs, string, bool> handler) => false;
        ShouldLogRequestQueryString(Func<ILogListener, FlushLogArgs, string, bool> handler) => true;
        ShouldLogRequestFormData(Func<ILogListener, FlushLogArgs, string, bool> handler) => true;
        ShouldLogRequestServerVariable(Func<ILogListener, FlushLogArgs, string, bool> handler) => true;
        ShouldLogRequestClaim(Func<ILogListener, FlushLogArgs, string, bool> handler) => true;
        ShouldLogRequestInputStream(Func<ILogListener, FlushLogArgs, bool> handler) => true;
        ShouldLogResponseHeader(Func<ILogListener, FlushLogArgs, string, bool> handler) => true;

        // runtime handler used to toggle a specific LogListener
        ToggleListener(Func<ILogListener, FlushLogArgs, bool> handler) => true;

        // runtime handler used to append custom text when an Exception is encountered
        AppendExceptionDetails(Func<Exception, string> handler) => null;
    }
    

Usage:

.. code-block:: c#

    void Application_Start()
    {
        // update JSON settings
        KissLogConfiguration.Options
            .JsonSerializerSettings.Converters.Add(new StringEnumConverter());

        // prevent CardNumber parameter from being logged
        KissLogConfiguration.Options
            .ShouldLogRequestFormData((ILogListener listener, FlushLogArgs args, string name) =>
            {
                if (name == "CardNumber")
                    return false;

                return true;
            });

        // append EntityFramework validation exceptions to the log messages
        KissLogConfiguration.Options
            .AppendExceptionDetails((Exception ex) =>
            {
                if (ex is DbEntityValidationException dbException)
                {
                    StringBuilder sb = new StringBuilder();

                    foreach (var validationErrors in dbException.EntityValidationErrors)
                    {
                        foreach (var validationError in validationErrors.ValidationErrors)
                        {
                            sb.AppendLine(string.Format("Property: {0} Error: {1}", validationError.PropertyName, validationError.ErrorMessage));
                        }
                    }

                    return sb.ToString();
                }

                return null;
            });
    }
