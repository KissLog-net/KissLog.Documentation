Saving the logs
====================

.. contents::
   :local:
   :depth: 1

KissLog saves the logs by using log listeners.

An application can use any number of log listeners.

Register log listeners
-------------------------

Log listeners are registered at application startup using the ``KissLogConfiguration.Listeners.Add()`` method.

.. code-block:: c#
    :emphasize-lines: 12,13

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            ILogListener cloudListener = new KissLogApiListener(new Application(ConfigurationManager.AppSettings["KissLog.OrganizationId"], ConfigurationManager.AppSettings["KissLog.ApplicationId"]))
            {
                ApiUrl = "https://api.kisslog.net"
            };

            ILogListener textListener = new LocalTextFileListener(@"C:\\my-application\\logs");

            KissLogConfiguration.Listeners.Add(cloudListener);
            KissLogConfiguration.Listeners.Add(textListener);
        }
    }
    

Log listeners events
-------------------------

Log listeners are triggered automatically on three separate events:

- **OnBeginRequest()** - executed at the beginning of the http request

- **OnMessage()** - executed each time a log message is created

- **OnFlush()** - executed at the end of the http request


.. code-block:: none
    :emphasize-lines: 1,6,9,13

    GET /Home/Index                  <---- OnBeginRequest()
    

    ILogger logger = Logger.Factory.Get();

    logger.Debug("step 1");          <---- OnMessage()

    ...
    logger.Info("step n");           <---- OnMessage()


    
    HTTP 200 OK                      <---- OnFlush()


Create custom log listeners
----------------------------

Custom log listeners can be created by implementing the ``ILogListener`` interface.

.. code-block:: c#
    :linenos:
    :caption: Example:
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

        public int MinimumResponseHttpStatusCode { get; set; } = 0;
        public LogLevel MinimumLogMessageLevel { get; set; } = LogLevel.Trace;
        public LogListenerParser Parser { get; set; } = new LogListenerParser();
    }

.. code-block:: c#
    :caption: Register the listener:

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            KissLogConfiguration.Listeners.Add(new SqlListener());
        }
    }

.. admonition:: Built-in listeners
    :class: note

    :doc:`../log-listeners/KissLogApiListener`, the listener which saves the logs to KissLog.net, is using the ``OnFlush()`` method.

.. toctree::
    :maxdepth: 1
    :hidden:

    KissLogApiListener
    LocalTextFileListener
    NLogTargetListener