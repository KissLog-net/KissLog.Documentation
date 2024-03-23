Configuration
====================

KissLog supports various configuration options using the ``KissLogConfiguration.Options`` configuration object.

.. contents:: Configuration options
   :local:

AppendExceptionDetails
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Gets executed for every logged "System.Exception". The result will be appended to the log message.

.. code-block:: c#

    KissLogConfiguration.Options
        .AppendExceptionDetails((Exception ex) =>
        {
            if(ex is DivideByZeroException zeroDivisionEx)
                return "Should check if the denominator is zero before dividing";

            return null;
        });

An example of using "AppendExceptionDetails" to log Entity Framework validation exceptions can be found  :doc:`here </SDK/examples/Entity-Framework-validation>`.

ShouldLogRequestHeader
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Determines if a request header item should be captured by a log listener. Default ``true``.

.. code-block:: c#

    KissLogConfiguration.Options
        .ShouldLogRequestHeader((OptionsArgs.LogListenerHeaderArgs args) =>
        {
            if (args.HeaderName == "X-JWT-Token" && args.Listener is RequestLogsApiListener)
                return false;

            return true;
        });


ShouldLogRequestCookie
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Determines if a cookie item should be captured by a log listener. Default ``true``.

.. code-block:: c#

    KissLogConfiguration.Options
        .ShouldLogRequestCookie((OptionsArgs.LogListenerCookieArgs args) =>
        {
            if (args.CookieName.StartsWith(".AspNetCore.") && args.Listener is RequestLogsApiListener)
                return false;

            return true;
        });


ShouldLogFormData (for log listener)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Determines if a request form data item should be captured by a log listener. Default ``true``.

.. code-block:: c#

    KissLogConfiguration.Options
        .ShouldLogFormData((OptionsArgs.LogListenerFormDataArgs args) =>
        {
            if (args.FormDataName == "password" && args.Listener is RequestLogsApiListener)
                return false;

            return true;
        });


ShouldLogServerVariable
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Determines if a server variable item should be captured by a log listener. Default ``true``.

.. code-block:: c#

    KissLogConfiguration.Options
        .ShouldLogServerVariable((OptionsArgs.LogListenerServerVariableArgs args) =>
        {
            if (args.ServerVariableName == "HTTP_COOKIE" && args.Listener is RequestLogsApiListener)
                return false;

            return true;
        });


ShouldLogClaim
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Determines if a claim should be captured by a log listener. Default ``true``.

.. code-block:: c#

    KissLogConfiguration.Options
        .ShouldLogClaim((OptionsArgs.LogListenerClaimArgs args) =>
        {
            if (args.ClaimType == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/thumbprint" && args.Listener is RequestLogsApiListener)
                return false;

            return true;
        });


ShouldLogInputStream (for log listener)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Determines if request payload should be captured by a log listener. Default ``true``.

.. code-block:: c#
    
    KissLogConfiguration.Options
        .ShouldLogInputStream((OptionsArgs.LogListenerInputStreamArgs args) =>
        {
            if (args.HttpProperties.Request.Url.LocalPath == "/api/admin/setTokens" && args.Listener is RequestLogsApiListener)
                return false;

            return true;
        });


ShouldLogResponseHeader
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Determines if a response header item should be captured by a log listener. Default ``true``.

.. code-block:: c#

    KissLogConfiguration.Options
        .ShouldLogResponseHeader((OptionsArgs.LogListenerHeaderArgs args) =>
        {
            if (args.HeaderName == "X-API-Key" && args.Listener is RequestLogsApiListener)
                return false;

            return true;
        });


ShouldLogFormData
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Determines if the request form data should be captured or not. Default ``true``.

.. code-block:: c#

    KissLogConfiguration.Options
        .ShouldLogFormData((HttpRequest httpRequest) =>
        {
            if (httpRequest.Url.LocalPath == "/Checkout/MakePayment")
                return false;

            return true;
        });


ShouldLogInputStream
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Determines if the request payload should be captured or not. Default ``true``.

.. code-block:: c#

    KissLogConfiguration.Options
        .ShouldLogInputStream((HttpRequest httpRequest) =>
        {
            if (httpRequest.Url.LocalPath == "/api/html-to-pdf")
                return false;

            return true;
        });


ShouldLogResponseBody
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Determines if the response body should be captured or not. Default ``true`` when Content-Type is "application/json".

.. code-block:: c#

    KissLogConfiguration.Options
        .ShouldLogResponseBody((HttpProperties httpProperties) =>
        {
            if (httpProperties.Response.StatusCode >= 400 && httpProperties.Request.Url.LocalPath == "/Checkout/Payment")
                return true;

            return true;
        });


GenerateSearchKeywords
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Handler used to specify the request search keywords.

"Keywords" represent a list of user-defined string values associated with each request generated by a client (e.g. a .NET application generating logs).

On logBee.net, users can search for specific requests by using any of the values associated with the "keywords" list.

.. code-block:: c#

    KissLogConfiguration.Options
        .GenerateSearchKeywords((FlushLogArgs flushArgs) =>
        {
            string? traceId = flushArgs.CustomProperties.FirstOrDefault(p => p.Key == "TRACE-ID").Value?.ToString();

            List<string> keywords = new();
            keywords.Add("00000001");

            if (!string.IsNullOrWhiteSpace(traceId))
                keywords.Add(traceId);

            return keywords;
        });

.. figure:: images/SearchForKeywords.png
   :alt: Search for keywords

Configuration example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A real use-case example of using ``AppendExceptionDetails`` handler:

.. code-block:: c#

    using KissLog;
    using KissLog.Listeners.FileListener;
    using System;

    namespace ConsoleApp_NetFramework
    {
        class Program
        {
            static void Main(string[] args)
            {
                KissLogConfiguration.Options
                    .AppendExceptionDetails((Exception ex) =>
                    {
                        if (ex is DivideByZeroException zeroDivisionEx)
                            return ">>> Should check if the denominator is zero before dividing";

                        return null;
                    });

                KissLogConfiguration.Listeners
                    .Add(new LocalTextFileListener("logs", FlushTrigger.OnFlush));

                var logger = new Logger(url: "Program/Main");

                int a = 10, b = 0;
                logger.Debug(string.Format("Preparing to divide {0} to {1}", a, b));

                try
                {
                    Console.WriteLine(a / b);
                }
                catch (Exception ex)
                {
                    logger.Error(ex);
                    throw;
                }
                finally
                {
                    Logger.NotifyListeners(logger);
                }
            }
        }
    }

.. figure:: images/AppendExceptionDetails.png
   :alt: AppendExceptionDetails
