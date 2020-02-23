Create instance
================

.. contents::
   :local:
   :depth: 1

``ILogger`` has a scoped lifetime. 

It should be created at the beginning of a method, and flushed at the end of the methods execution.

Web applications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: c#

    ILogger logger = Logger.Factory.Get();

For web applications, the ``ILogger`` is created, shared and flushed automatically per each http request (connection).

To retrieve the current ``ILogger`` instance, use the ``Logger.Factory.Get()`` factory method. 

.. code-block:: c#
    :caption: Example: 
    :emphasize-lines: 6

    public class HomeController : Controller
    {
        private readonly ILogger _logger;
        public HomeController()
        {
            _logger = Logger.Factory.Get();
        }

        public IActionResult Index()
        {
            _logger.Debug("Hello World!");

            return View();
        }
    }

Calling the ``Logger.Factory.Get()`` method multiple times will return the same instance of ``ILogger``.

.. code-block:: c#

    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            for(int i = 1; i <= 5; i++)
            {
                ILogger logger = Logger.Factory.Get();
                logger.Info("Hello " + i);
            }

            // get the number of log messages created for the current http request
            // 5
            int numberOfLogs = (Logger(Logger.Factory.Get())).DataContainer.LogMessages.Count();

            return View();
        }
    }

Console applications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: c#

    ILogger logger = new Logger(url: "Main");

For console applications, the ``ILogger`` needs to be created and flushed manually.

This can be achieved by using a **try-catch-finally** block, which simulates the BEGIN and the END of a method.

.. code-block:: c#
    :emphasize-lines: 5,15,21

    class Program
    {
        static void Main(string[] args)
        {
            ILogger logger = new Logger(url: "Main");

            try
            {
                logger.Info("Executing main");

                // execute Main
            }
            catch(Exception ex)
            {
                logger.Error(ex);
                throw;
            }
            finally
            {
                // notify the listeners
                Logger.NotifyListeners(logger);
            }
        }
    }

The optional ``url: "Main"`` argument simulates an Uri identifier for the method which is being executed.

