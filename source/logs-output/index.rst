Logs output
====================

KissLog saves the logs by using **ILogListener** listeners.

Listeners are registered at application startup using the ``KissLogConfiguration.Listeners`` container.

.. code-block:: c#

    protected void Application_Start()
    {
        KissLogConfiguration.Listeners.Add(new KissLogApiListener(new KissLog.Apis.v1.Auth.Application(
            ConfigurationManager.AppSettings["KissLog.OrganizationId"],
            ConfigurationManager.AppSettings["KissLog.ApplicationId"])
        ));

        KissLogConfiguration.Listeners.Add(new NLogTargetListener());
    }


Listeners events
---------------------

KissLog listeners are triggered automatically on three separate events:

- **OnBeginRequest()** - executed at the beginning of the http request

- **OnMessage()** - executed each time a log message is created

- **OnFlush()** - executed at the end of the http request

.. code-block:: c#
    :emphasize-lines: 5-7

    namespace KissLog
    {
        public interface ILogListener
        {
            void OnBeginRequest(HttpRequest httpRequest, ILogger logger);
            void OnMessage(LogMessage message, ILogger logger);
            void OnFlush(FlushLogArgs args, ILogger logger);
        }
    }

.. code-block:: none

    BEGIN [GET /api/getUsers]        <---- OnBeginRequest()
    

    ILogger logger = Logger.Factory.Get();

    logger.Debug("step 1");          <---- OnMessage()

    ...
    logger.Info("step n");           <---- OnMessage()


    
    END [200 OK GET /api/getUsers]   <---- OnFlush()


Creating custom listeners
----------------------------

Custom listeners can be created by implementing the ILogListener interface.

When creating a log listener, you can use any of the three events to write the persistence logic.

.. toctree::
   :maxdepth: 1
