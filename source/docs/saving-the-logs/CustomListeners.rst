Custom listeners
====================

Custom log listeners can be created by implementing the ``ILogListener`` interface.

When implementing custom log listeners, developers can choose any of the three events to write the persistence logic.

In the example below, to reduce the database overhead, the custom ``SqlListener`` listener is saving the logs using the **OnFlush()** event.

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

