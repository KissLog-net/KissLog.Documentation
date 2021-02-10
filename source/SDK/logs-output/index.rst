Logs output
====================

KissLog saves the logs to multiple output locations by using log listeners.

Log listeners are registered at application startup using the ``KissLogConfiguration.Listeners`` container.

.. code-block:: c#
    :emphasize-lines: 9-10

    using KissLog;

    namespace MyApplication
    {
        public class MvcApplication : System.Web.HttpApplication
        {
            private void RegisterKissLogListeners()
            {
                KissLogConfiguration.Listeners.Add(new RequestLogsApiListener());
                KissLogConfiguration.Listeners.Add(new LocalTextFileListener()));
            }
        }
    }

.. contents:: Log listeners
   :local:

kisslog.net
----------------------------------------------

`RequestLogsApiListener <https://github.com/KissLog-net/KissLog.Sdk/blob/master/src/KissLog.CloudListeners/RequestLogsListener/RequestLogsApiListener.cs>`_ saves the logs to kisslog.net (or KissLog on-premises).

.. figure:: images/RequestLogsApiListener-output.png
   :alt: kisslog.net output
   :align: center

.. code-block:: c#

    using KissLog;
    using KissLog.CloudListeners.Auth;
    using KissLog.CloudListeners.RequestLogsListener;

    namespace MyApplication
    {
        public class MvcApplication : System.Web.HttpApplication
        {
            // [...]

            private void RegisterKissLogListeners()
            {
                KissLogConfiguration.Listeners.Add(new RequestLogsApiListener(new Application("0337cd29-a56e-42c1-a48a-e900f3116aa8", "35f66045-16df-4a3a-9cb4-b1762b464348"))
                {
                    ApiUrl = "https://api.kisslog.net"
                });
            }
        }
    }


    
Local text files
----------------------------------------------

`LocalTextFileListener <https://github.com/KissLog-net/KissLog.Sdk/blob/master/src/KissLog/Listeners/LocalTextFileListener.cs>`_ saves the logs on local text files.

.. figure:: images/localTextFileListener-output.png
   :alt: Local text files output
   :align: center

.. code-block:: c#

    using KissLog;

    namespace MyApplication
    {
        public class MvcApplication : System.Web.HttpApplication
        {
            // [...]

            private void RegisterKissLogListeners()
            {
                KissLogConfiguration.Listeners.Add(new LocalTextFileListener(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Logs"))
                {
                    FlushTrigger = FlushTrigger.OnMessage
                });
            }
        }
    }


NLog
----------------------------------------------

`NLogTargetListener <https://github.com/KissLog-net/KissLog.Sdk/blob/master/src/KissLog.Adapters.NLog/NLogTargetListener.cs>`_ saves the logs created with ``KissLog.ILogger`` to all the NLog targets defined in **NLog.config**.

This is useful when you want to use save the logs to both kisslog.net and NLog text-files.

.. figure:: images/nlog-output.png
   :alt: NLog output
   :align: center

.. figure:: images/NLog.config.png
   :alt: NLog.config
   :align: center

.. code-block:: c#

    using KissLog;

    namespace MyApplication
    {
        public class MvcApplication : System.Web.HttpApplication
        {
            // [...]

            private void RegisterKissLogListeners()
            {
                KissLogConfiguration.Listeners.Add(new NLogTargetListener());
            }
        }
    }

Custom listeners
----------------------------------------------

Custom log listeners can be created by implementing the ``ILogListener`` interface.

.. code-block:: c#
    :caption: DebugOutputListener.cs
    :emphasize-lines: 11,18,30

    public class DebugOutputListener : ILogListener
    {
        public int MinimumResponseHttpStatusCode { get; set; } = 0;
        public LogLevel MinimumLogMessageLevel { get; set; } = LogLevel.Trace;
        public LogListenerParser Parser { get; set; } = new LogListenerParser();

        public void OnBeginRequest(HttpRequest httpRequest, ILogger logger)
        {
            string text = string.Format(">>>>>> {0} {1}", httpRequest.HttpMethod, httpRequest.Url.PathAndQuery);

            Debug.WriteLine(text);
        }

        public void OnMessage(LogMessage message, ILogger logger)
        {
            string text = string.Format(">>>>>> {0} {1}", message.LogLevel, message.Message);

            Debug.WriteLine(text);
        }

        public void OnFlush(FlushLogArgs args, ILogger logger)
        {
            HttpRequest request = args.WebProperties.Request;
            HttpResponse response = args.WebProperties.Response;

            int httpStatusCode = (int)response.HttpStatusCode;

            string text = string.Format(">>>>>> Completed {0}", httpStatusCode);

            Debug.WriteLine(text);
        }
    }

.. code-block:: c#

    using KissLog;

    namespace MyApplication
    {
        public class MvcApplication : System.Web.HttpApplication
        {
            // [...]

            private void RegisterKissLogListeners()
            {
                KissLogConfiguration.Listeners.Add(new DebugOutputListener());
            }
        }
    }

.. figure:: images/debugOutputListener-output.png
   :alt: DebugOutputListener output
   :align: center

Another custom log listener can be found on the :doc:`/SDK/examples/MongoDbListener` example.

