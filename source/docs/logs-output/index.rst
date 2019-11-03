Logs output
====================

KissLog saves the logs by using **ILogListener** listeners.

Listeners are registered at application startup using the ``KissLogConfiguration.Listeners`` container.

.. code-block:: c#
    :caption: Registering log listeners 

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
    :caption: ILogListener events
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
    :caption: ILogListener events occurrence 

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

Do you want the logs to be saved as soon as they are created?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Implement the logic in the ``OnMessage()`` event.

**TextFileListener** example is saving the logs as soon as they are created, by using the ``OnMessage()`` event.

.. code-block:: c#
    :linenos:
    :emphasize-lines: 11,16,21

    public class TextFileListener : ILogListener
    {
        private readonly string _filePath;
        public TextFileListener()
        {
            _filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "logs.txt");
        }

        public void OnMessage(LogMessage message, ILogger logger)
        {
            File.AppendAllText(_filePath, message.Message);
        }

        public void OnBeginRequest(KissLog.Web.HttpRequest httpRequest, ILogger logger)
        {
            // do nothing
        }

        public void OnFlush(FlushLogArgs args, ILogger logger)
        {
            // do nothing
        }
    }

Do you want the logs to be saved at the end of the request?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Implement the logic in the ``OnFlush()`` event. 

**SqlListener** example is saving the logs at the end of the request, by using ``OnFlush()`` event. This is useful to reduce the database overhead.

.. code-block:: c#
    :linenos:
    :emphasize-lines: 11,16,41

    public class SqlListener : ILogListener
    {
        private readonly ApplicationDbContext _dbContext;
        public SqlListener()
        {
            _dbContext = new ApplicationDbContext();
        }

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
            // create "Request" entity
            Request request = new Request
            {
                DateTime = args.WebProperties.Request.StartDateTime,
                Url = args.WebProperties.Request.Url.AbsoluteUri,
                ResponseSatusCode = args.WebProperties.Response.HttpStatusCode
            };

            // create "LogMessage" entities
            IList<LogMessage> logs = args.MessagesGroups.SelectMany(p => p.Messages).Select(p => new LogMessage
            {
                Request_Id = request.Id,
                LogLevel = p.LogLevel,
                Message = p.Message,
                DateTime = p.DateTime
            }).ToList();

            _dbContext.Requests.Add(request);
            _dbContext.LogMessages.AddRange(logs);

            _dbContext.SaveChanges();
        }
    }

.. admonition:: Built-in listeners
    :class: note

    :doc:`../log-listeners/KissLogApiListener`, the listener which saves the logs to KissLog.net, is using the ``OnFlush()`` method.

.. toctree::
   :maxdepth: 1
