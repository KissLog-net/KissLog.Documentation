KissLogApiListener
====================

The KissLogApiListener saves the logs to kisslog.net (or KissLog on-premises).

.. contents::
   :local:
   :depth: 1

Usage
---------------------

.. code-block:: c#

    protected void Application_Start()
    {
        ILogListener cloudListener = new KissLogApiListener(new Application("OrganizationId", "ApplicationId"))
        {
            ApiUrl = "https://api.kisslog.net"
        };

        KissLogConfiguration.Listeners.Add(cloudListener);
    }

Replace ``"OrganizationId"`` and ``"ApplicationId"`` with values from the KissLog.net application configuration page.

.. figure:: images/kisslogApiListener-output.png
   :alt: KissLogApiListener output
   :align: center

   KissLogApiListener output

Trigger events
---------------------

KissLogApiListener is saving the logs at the end of the HTTP request by using the ``OnFlush()`` event.

.. code-block:: none
    :emphasize-lines: 9

    BEGIN [GET /Products/Details]           <---- OnBeginRequest()


    ILogger logger = Logger.Factory.Get();  

    logger.Debug("Debug message");          <---- OnMessage()  


    END [200 OK GET /Products/Details]      <---- KissLogApiListener is executed

.. code-block:: c#
    :emphasize-lines: 16

    public class KissLogApiListener : ILogListener
    {
        public void OnBeginRequest(HttpRequest httpRequest, ILogger logger)
        {
            // do nothing
        }

        public void OnMessage(LogMessage message, ILogger logger)
        {
            // do nothing
        }

        public void OnFlush(FlushLogArgs args, ILogger logger)
        {
            IKissLogApi kissLogApi = new KissLogRestApi("https://api.kisslog.net");
            kissLogApi.SaveAsync(args).ConfigureAwait(false);
        }
    }

Console applications
---------------------

For Console applications, you need to flush the listener manually.

.. code-block:: c#
    :linenos:
    :emphasize-lines: 3,17

    static void Main(string[] args)
    {
        ILogger logger = new Logger(url: "Main");

        try
        {
            
        }
        catch(Exception ex)
        {
            logger.Error(ex);
            throw;
        }
        finally
        {
            // KissLogApiListener.OnFlush() is executed
            Logger.NotifyListeners(logger);
        }
    }


When using KissLogApiListener for Console applications, specify the **UseAsync** flag to **false**.

.. code-block:: c#
    :linenos:
    :emphasize-lines: 15

    class Program
    {
        static void Main(string[] args)
        {
            ConfigureKissLog();

            // execute Main
        }

        static void ConfigureKissLog()
        {
            ILogListener cloudListener = new KissLogApiListener(new Application("OrganizationId", "ApplicationId"))
            {
                ApiUrl = "https://api.kisslog.net",
                UseAsync = false
            };

            KissLogConfiguration.Listeners.Add(cloudListener);
        }
    } 
