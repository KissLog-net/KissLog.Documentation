Filter requests
=====================

You can configure KissLog to ignore specific requests from being logged.

This can be useful in multiple scenarios, including:

- You have repetitive requests and logging all of them would be redundant (such as ``GET /api/v1/healthcheck``)

- You want to log some requests only if they are unsucessful (``Response.StatusCode >= 400``)

- You want to log some requests based on the provided parameter values (QueryString, Headers, Form-Data etc.)

To filter the requests based on any custom conditions, extend the ``LogListenerParser``.

.. code-block:: c#
    :linenos:
        
    namespace MyApplication
    {
        public class CustomListenerParser : LogListenerParser
        {
            public override bool ShouldLog(FlushLogArgs args, ILogListener logListener)
            {
                string url = args.WebProperties.Request.Url.LocalPath;
                int httpStatusCode = (int)args.WebProperties.Response.HttpStatusCode;

                if(string.Compare(url, "/api/v1/healthcheck", true) == 0)
                {
                    if (httpStatusCode < 400)
                    {
                        // Successful status code. Do not log this request
                        return false;
                    }
                }

                return base.ShouldLog(args, logListener);
            }
        }
    }

The custom ``CustomListenerParser`` will ignore all the ``/api/v1/healthcheck`` endpoints if the response is successful.

Using the custom ``CustomListenerParser``:

.. code-block:: c#
    :linenos:
    :emphasize-lines: 7
        
    protected void Application_Start()
    {
        KissLogConfiguration.Listeners.Add(new KissLogApiListener(
            new KissLog.Apis.v1.Auth.Application("KissLog.OrganizationId", "KissLog.ApplicationId")
        )
        {
            Parser = new CustomListenerParser()
        });
    }


