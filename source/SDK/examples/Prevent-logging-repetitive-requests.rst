Prevent logging repetitive requests
=============================================

If a web application regularly executes a repetitive request, such as ``/api/healthcheck``, logging the event for every occurrence can be redundant, or it can pollute the logs output location (such as a text file).

In this example you will create a custom ``HealthCheckInterceptor`` which is configured to ignore all the 200 OK ``/api/healthcheck`` requests.

Because the logic depends on the Response.StatusCode, the interceptor binds to the ``bool ShouldLog(FlushLogArgs args)`` event, which is executed at the end of the http request.

.. code-block:: c#

    using KissLog;
    using KissLog.Http;

    namespace MyApplication
    {
        public class HealthCheckInterceptor : ILogListenerInterceptor
        {
            public bool ShouldLog(FlushLogArgs args, ILogListener listener)
            {
                if(args.HttpProperties.Request.Url.LocalPath == "/api/healthcheck")
                {
                    if (args.HttpProperties.Response.StatusCode == 200)
                        return false;
                }

                return true;
            }

            public bool ShouldLog(HttpRequest httpRequest, ILogListener listener)
            {
                return true;
            }

            public bool ShouldLog(LogMessage message, ILogListener listener)
            {
                return true;
            }
        }
    }


Using the custom interceptor:

.. code-block:: c#

    private static void ConfigureKissLog()
    {
        KissLogConfiguration.Listeners
            .Add(new RequestLogsApiListener(new Application("KissLog.OrganizationId", "KissLog.ApplicationId"))
            {
                ApiUrl = "https://api.kisslog.net",
                Interceptor = new HealthCheckInterceptor()
            });
    }
