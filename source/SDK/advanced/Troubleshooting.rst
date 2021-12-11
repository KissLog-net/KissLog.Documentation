Troubleshooting
========================================

When KissLog behaves unexpectedly, it is possible that there is a misalignment with the configuration.

In general, double check the install instructions and make sure you haven't missed any step. You can also compare your code with the existing `test applications <https://github.com/KissLog-net/KissLog.Sdk/tree/master/testApps>`_.

In addition, inspect the KissLog internal logs, as they might contain useful information such as configuration warnings or HTTP exceptions.

.. code-block:: c#

    KissLogConfiguration.InternalLog = (string message) =>
    {
        Debug.WriteLine(message);
    };

Depending on the behavior, there are several troubleshooting steps that you can follow.

1. "No data received" on kisslog.net 
----------------------------------------------

a.) Make sure the ``RequestLogsApiListener`` listener is registered. If necessary, use a breakpoint.

b.) Use the api key values directly instead of reading them from the configuration file (appsettings.json / web.config). 

.. code-block:: c#

    private static void ConfigureKissLog()
    {
        string organizationId = "87a5d367-96b2-4a8a-927a-0988625e2b3d";
        string applicationId = "cb5b9a65-74d0-4cc8-8566-32e4a9f8e63f";
        string apiUrl = "https://api.kisslog.net";

        KissLogConfiguration.Listeners
            .Add(new RequestLogsApiListener(new Application(organizationId, applicationId))
            {
                ApiUrl = apiUrl
            });
    }

.. figure:: images/kisslog-ApiKeys.png
   :alt: kisslog.net api keys

c.) Are you using a Console application? If yes, make sure you set the ``UseAsync`` property to ``false``.

.. code-block:: c#

    private static void ConfigureKissLog()
    {
        KissLogConfiguration.Listeners
            .Add(new RequestLogsApiListener(new Application("87a5d367-96b2-4a8a-927a-0988625e2b3d", "cb5b9a65-74d0-4cc8-8566-32e4a9f8e63f"))
            {
                ApiUrl = "https://api.kisslog.net",
                UseAsync = false
            });
    }


d.) Check the network access to https://api.kisslog.net. Open the URL in a browser - you should receive a "Running" 200 OK response.

If none of the steps above work, please `create a ticket <https://github.com/KissLog-net/KissLog.Sdk/issues>`_.

2. Some logs are missing
----------------------------------------------

This misbehavior is mostly common for Console applications and it normally happens when you write the logs using different logger instances.

To solve this, make sure that you always use the same logger instance throughout the entire code execution.

Use ``Logger.SetFactory()`` to inject the logger and ``Logger.Factory.Get()`` to resolve it:

.. code-block:: c#
    :emphasize-lines: 10,13,18,24

    using KissLog;

    namespace ConsoleApp_NetFramework
    {
        class Program
        {
            static void Main(string[] args)
            {
                // inject the logger
                Logger.SetFactory(new LoggerFactory(new Logger()));

                // resolve the logger
                var logger = Logger.Factory.Get();

                Foo();
                
                // flush the logger
                Logger.NotifyListeners(logger);
            }

            static void Foo()
            {
                // resolve the logger
                var logger = Logger.Factory.Get();

                // [...]
            }
        }
    }


If you have any other issues, or the troubleshooting steps did not help, please `create a ticket <https://github.com/KissLog-net/KissLog.Sdk/issues>`_.

