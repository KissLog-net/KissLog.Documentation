Filtering the logs
========================================

KissLog saves all the events in memory regardless of the verbosity level.

It is just before the persistence step where KissLog filters the events, at the listeners level.

Different listeners can apply different filtering rules before saving the logs.

Using ``ILogListener.Interceptor``
-----------------------------------------

The nullable ``ILogListener.Interceptor`` property can be used to control the output condition of a log listener.

If not null, the interceptor is invoked before executing the log listener events. If the result is ``false``, the corresponding method is not executed (the event won't be persisted).

An example of a custom interceptor which filters the log messages by the specified verbosity level:

.. code-block:: c#

    static void Main(string[] args)
    {
        KissLogConfiguration.Listeners
            .Add(new LocalTextFileListener("logs", FlushTrigger.OnFlush)
            {
                Interceptor = new LogLevelInterceptor(LogLevel.Warning)
            });
    }


.. code-block:: c#

    public class LogLevelInterceptor : ILogListenerInterceptor
    {
        private readonly LogLevel _minLogLevel;
        public LogLevelInterceptor(LogLevel minLogLevel)
        {
            _minLogLevel = minLogLevel;
        }

        public bool ShouldLog(LogMessage message, ILogListener listener)
        {
            if (message.LogLevel < _minLogLevel)
                return false;

            return true;
        }

        public bool ShouldLog(HttpRequest httpRequest, ILogListener listener)
        {
            return true;
        }

        public bool ShouldLog(FlushLogArgs args, ILogListener listener)
        {
            return true;
        }
    }


*Another custom interceptor example can be found :doc:`here </SDK/examples/Prevent-logging-repetitive-requests>`.*
