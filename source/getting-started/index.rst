Getting started
================

ILogger represents the principal component used to write log messages.

.. code-block:: c#
    :emphasize-lines: 7,12

    using KissLog;

    public class MyCacheProvider : ICacheProvider
    {
        public T Get<T>(string key)
        {
            ILogger logger = Logger.Factory.Get();

            var item = _cache.Get<T>(key);
            if(item == null)
            {
                logger.Warn(string.Format("Cache entry for {0} was not found", key));
            }

            retutn item;
        }
    }

Create instance
-------------------------

ILogger has a scoped lifetime. You create it when you need it.

Web applications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For web applications, the ILogger is created automatically per each http request (connection).

To receive the instance of the ILogger, use the ``Logger.Factory.Get()`` factory method.

.. code-block:: c#

    public void Foo()
    {
        ILogger logger = Logger.Factory.Get();
    }

Calling the factory method multiple times will return the same instance of ILogger.

.. code-block:: c#

    [TestMethod]
    public void Factory_Returns_The_Same_Instance()
    {
        for(int i = 1; i <= 5; i++)
        {
            ILogger logger = Logger.Factory.Get();
            logger.Info("Hello " + i);
        }

        ILogger myLogger = Logger.Factory.Get();

        int expected = 5;
        int actual = (Logger(myLogger)).DataContainer.LogMessages.Count();

        Assert.IsTrue(actual == expected, "Logger.Factory.Get() should return the same instance");
    }

Windows / Console applications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For non-web applications, create and flush the logger manually.

.. code-block:: c#

    static void Main(string[] args)
    {
        // create the logger
        ILogger logger = new Logger(url: "Main");

        // execute Main
        logger.Info("Executing main");

        // notify the listeners
        Logger.NotifyListeners(logger);
    }

Register the listeners
-------------------------

Listeners are registered at application startup using the ``KissLogConfiguration.Listeners`` container.

.. code-block:: c#

    protected void Application_Start()
    {
        // KissLog.net cloud listener
        KissLogConfiguration.Listeners.Add(new KissLogApiListener(new KissLog.Apis.v1.Auth.Application(
            ConfigurationManager.AppSettings["KissLog.OrganizationId"],
            ConfigurationManager.AppSettings["KissLog.ApplicationId"])
        ));

        // NLog listener -> send all the KissLog logs to NLog targets
        KissLogConfiguration.Listeners.Add(new NLogTargetListener());
    }

KissLog listeners are triggered automatically on three separate events: **OnBeginRequest**, **OnMessage** and **OnFlush**.

Custom listeners can be created by implementing the ``ILogListener`` interface.

Configuration
-------------------------

Additional configuration options are available using the ``KissLogConfiguration.Options`` options.

In the example below, we use the ``AppendExceptionDetails(Exception ex)`` handler to log EntityFramework validation exceptions.

.. code-block:: c#

    protected void Application_Start()
    {
        KissLogConfiguration.Options
            .AppendExceptionDetails((Exception ex) =>
            {
                // log EntityFramework validation errors
                if (ex is DbEntityValidationException dbException)
                {
                    StringBuilder sb = new StringBuilder();
                    sb.AppendLine("DbEntityValidationException:");

                    foreach (var error in dbException.EntityValidationErrors.SelectMany(p => p.ValidationErrors))
                    {
                        string message = string.Format("Field: {0}, Error: {1}", error.PropertyName, error.ErrorMessage);
                        sb.AppendLine(message);
                    }

                    return sb.ToString();
                }

                return null;
            });
    }

.. toctree::
   :maxdepth: 1
   :hidden:
   
   console-apps
   windows-services

