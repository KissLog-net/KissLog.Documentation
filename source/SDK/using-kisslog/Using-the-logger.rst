Using the logger
========================================

Creating a logger
-----------------------------------

A logger is a simple container which stores the created events in memory.

To create a logger, simply initialize a new ``Logger`` instance.

.. code-block:: c#

    var logger = new Logger();
    logger.Trace("We have a message");

    // 1 message
    int count = logger.DataContainer.LogMessages.Count();


Different loggers keep track of their own log messages.

.. code-block:: c#

    var logger1 = new Logger();
    logger1.Trace("Trace log");

    var logger2 = new Logger();
    logger2.Trace("Trace log");
    logger2.Debug("Debug log");

    // 1 message
    int count1 = logger1.DataContainer.LogMessages.Count();

    // 2 messages
    int count2 = logger2.DataContainer.LogMessages.Count();


Loggers must be flushed at the end of the code execution, so that the registered listeners are notified.

.. code-block:: c#

    var logger = new Logger();
    logger.Trace("Trace log");

    // flush the logger
    Logger.NotifyListeners(logger);


Using ``Logger.Factory``
-----------------------------------

``Logger.Factory`` is a static class which can be used to manage the creation of logger instances.

By default, ``Logger.Factory.Get()`` will create a new logger instance for every call.

.. code-block:: c#

    // this is
    var logger = Logger.Factory.Get();

    // equivalent to this
    var logger = new Logger();


By updating ``Logger.Factory`` you can control which logger instance is returned by ``Logger.Factory.Get()`` method.

This is especially useful when you want to use the same logger throughout the entire application execution (such as console applications).

.. code-block:: c#

    // update the Logger.Factory and make it always return the same Logger instance
    Logger.SetFactory(new LoggerFactory(new Logger()));

    var logger1 = Logger.Factory.Get();
    var logger2 = Logger.Factory.Get();

    // logger1 == logger2


A real use-case example of using ``Logger.SetFactory()``:

.. code-block:: c#

    using KissLog;
    using System.Linq;

    namespace ConsoleApp_NetFramework
    {
        class Program
        {
            static void Main(string[] args)
            {
                Logger.SetFactory(new LoggerFactory(new Logger()));

                var logger = Logger.Factory.Get();

                logger.Trace("Preparing to calculate sum");

                int result = Sum(10, 20);

                // 2 messages
                int count = logger.DataContainer.LogMessages.Count();

                // flush the logger
                Logger.NotifyListeners(logger);
            }

            static int Sum(int a, int b)
            {
                // will return the same logger instance created on line 10 and used on line 12
                var logger = Logger.Factory.Get();

                logger.Debug(string.Format("a + b = {0}", a + b));

                return a + b;
            }
        }
    }


*The example above will not save the logs to any location because there are no listeners registered.*

Using ``Logger.NotifyListeners``
-----------------------------------

When invoked, ``Logger.NotifyListeners`` will collect all the captured events from the provided loggers and will execute *OnFlush()* method for the registered listeners.

A logger can be used after the ``Logger.NotifyListeners`` has been used (though, it is recommended to use this method just before the end of the code execution).

An example of using ``Logger.NotifyListeners()``:

.. code-block:: c#

    using KissLog;
    using System.Linq;

    namespace ConsoleApp_NetFramework
    {
        class Program
        {
            static void Main(string[] args)
            {
                // register a text listener
                KissLogConfiguration.Listeners
                    .Add(new LocalTextFileListener("logs", FlushTrigger.OnFlush));

                Logger logger = new Logger();

                logger.Trace("Trace log");
                logger.Debug("Debug log");

                // 2 messages
                int count = logger.DataContainer.LogMessages.Count();

                // listeners.OnFlush() is invoked
                Logger.NotifyListeners(logger);
        }
    }


After notifying the listeners, the loggers reset their logs contaier.

.. code-block:: c#

    var logger = new Logger();
    logger.Trace("Trace log");

    // 1 message
    int count = logger.DataContainer.LogMessages.Count();

    Logger.NotifyListeners(logger);

    // 0 messages
    count = logger.DataContainer.LogMessages.Count();

