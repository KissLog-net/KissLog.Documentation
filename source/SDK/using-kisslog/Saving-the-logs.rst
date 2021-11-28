Saving the logs
========================================

KissLog saves the logs using log listeners.

Log listeners are services implementing ``ILogListener`` interface and they are responsible for persisting the log events to an output location such as a file or a database storage.

Log listeners are registered at application startup using the ``KissLogConfiguration.Listeners`` configuration object.

.. code-block:: c#

    static void Main(string[] args)
    {
        KissLogConfiguration.Listeners
            .Add(new MongoDbLogListener("mongodb://localhost:27017"))
            .Add(new LocalTextFileListener("logs", FlushTrigger.OnFlush));

        var logger = new Logger();
        logger.Info("Hey!");

        Logger.NotifyListeners(logger);
    }


Using ``ILogListener``
---------------------------------------

``ILogListener`` interface exposes three methods which are invoked automatically on different stages of the Logger usage.

By implementing this interface you can create any custom persistence logic.

.. code-block:: c#

    public interface ILogListener
    {
        ILogListenerInterceptor Interceptor { get; }

        void OnBeginRequest(HttpRequest httpRequest);
        void OnMessage(LogMessage message);
        void OnFlush(FlushLogArgs args);
    }


*OnBeginRequest()* is executed when a Logger with ``url`` parameter is initialized.

*OnMessage()* is executed when a log message is created.

*OnFlush()* is executed when ``Logger.NotifyListeners`` is invoked.

.. code-block:: c#

    static void Main(string[] args)
    {
        var logger = new Logger(url: "Program/Main"); // <--- ILogListener.OnBeginRequest()

        logger.Debug("Hello to you");   // <--- ILogListener.OnMessage()

        Logger.NotifyListeners(logger); // <--- ILogListener.OnFlush()
    }



