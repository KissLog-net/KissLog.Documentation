Custom output rules
=====================

You can use a custom ``ILogListenerInterceptor`` to control the output rules of any log listener.

This can be useful in multiple scenarios, including:

- You have repetitive requests and logging all of them would be redundant (such as ``GET /api/v1/healthcheck``)

- You want to log some requests only if they are unsucessful (``Response.StatusCode >= 400``)

- You want to apply some custom rules based on the data being logged (QueryString, Headers, Form-Data etc.)

In the example below, we will create a custom interceptor which will ignore all the successful ``/api/healthcheck`` requests.

.. code-block:: c#
    :caption: Custom ILogListenerInterceptor:
    :linenos:
    :emphasize-lines: 21

    namespace AspNet.Mvc
    {
        public class CustomInterceptor : ILogListenerInterceptor
        {
            public bool ShouldLog(HttpRequest httpRequest, ILogListener listener)
            {
                return true;
            }

            public bool ShouldLog(LogMessage message, ILogListener listener)
            {
                return true;
            }

            public bool ShouldLog(FlushLogArgs args, ILogListener listener)
            {
                string url = args.HttpProperties.Request.Url.LocalPath;
                int statusCode = args.HttpProperties.Response.StatusCode;

                if(url == "/api/healthcheck" && statusCode == 200)
                    return false;

                return true;
            }
        }
    }

.. code-block:: c#
    :caption: Using the custom interceptor:
    :linenos:
    :emphasize-lines: 16

    namespace AspNet.Mvc
    {
        public class MvcApplication : System.Web.HttpApplication
        {
            protected void Application_Start()
            {
                // [...]
            }

            private void RegisterKissLogListeners()
            {
                KissLogConfiguration.Listeners
                    .Add(new RequestLogsApiListener(new Application(ConfigurationManager.AppSettings["KissLog.OrganizationId"], ConfigurationManager.AppSettings["KissLog.ApplicationId"]))
                    {
                        ApiUrl = ConfigurationManager.AppSettings["KissLog.ApiUrl"],
                        Interceptor = new CustomInterceptor()
                    });
            }
        }
    }
