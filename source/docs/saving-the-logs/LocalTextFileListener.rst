LocalTextFileListener
==========================

The LocalTextFileListener saves the logs on local text files.

Usage
---------------------

.. code-block:: c#

    protected void Application_Start()
    {
        KissLogConfiguration.Listeners.Add(new LocalTextFileListener(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Logs"))
        {
            FlushTrigger = FlushTrigger.OnFlush // OnFlush | OnMessage
        });
    }

.. figure:: images/localTextFileListener-output.png
   :alt: LocalTextFileListener output
   :align: center

   LocalTextFileListener output

Trigger events
---------------------

FlushTrigger.OnMessage
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The listener will save the logs as soon as they are created, using ``OnMessage()`` event.

FlushTrigger.OnFlush
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The listener will save the logs at the end of the http request, using the ``OnFlush()`` event.

Console applications
---------------------

For Console applications, it is best to use the **FlushTrigger.OnMessage**, so that the logs are saved as soon as they are created.

In the example below, even if we are missing the call to ``Logger.NotifyListeners()``, the logs are still saved on the local file.

.. code-block:: c#
    :linenos:
    :emphasize-lines: 5,13,23

    class Program
    {
        static void Main(string[] args)
        {
            ConfigureKissLog();

            ILogger logger = new Logger(url: "Main");

            logger.Info("Preparing to execute Main");

            logger.Warn("Entering infinite loop");

            while (true) { }

            // will never be triggered
            Logger.NotifyListeners(logger);
        }

        static void ConfigureKissLog()
        {
            KissLogConfiguration.Listeners.Add(new LocalTextFileListener(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Logs"))
            {
                FlushTrigger = FlushTrigger.OnMessage
            });
        }
    }

.. figure:: images/localTextFileListener-onMessage-output.png
   :alt: FlushTrigger.OnMessage output
   :align: center

   FlushTrigger.OnMessage output

Using **FlushTrigger.OnMessage** is useful for long-running tasks, or when **try-catch-finally** is not practicable.

.. code-block:: c#
    :linenos:
    :emphasize-lines: 5,10,12,17

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            ConfigureKissLog();
            
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            
            ILogger logger = new Logger();

            logger.Info("Creating database...");

            var dbContext = new ApplicationDbContext();
            bool created = dbContext.Database.EnsureCreated();

            logger.Info("Database created: " + created);
        }

        private void ConfigureKissLog()
        {
            KissLogConfiguration.Listeners.Add(new LocalTextFileListener(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Logs"))
            {
                FlushTrigger = FlushTrigger.OnMessage
            });
        }
    }

