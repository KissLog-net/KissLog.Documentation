Configuration
=====================

Use ``KissLogConfiguration.Options`` container to extend the logging behavior of KissLog.

.. contents:: Configuration options
   :local:

AppendExceptionDetails
-------------------------------------------------------

Gets executed everytime an exception is logged.

Use this handler to intercept specific exceptions and append additional text to the log message.

.. code-block:: c#

    private void ConfigureKissLog()
    {
        KissLogConfiguration.Options
            .AppendExceptionDetails((Exception ex) =>
            {
                StringBuilder sb = new StringBuilder();

                if (ex is ProductNotFoundException productNotFoundEx)
                {
                    sb.AppendLine("ProductNotFoundException:");
                    sb.AppendLine("ProductId = " + productNotFoundEx.ProductId);
                }

                return sb.ToString();
            });
    }

.. figure:: images/appendExceptionDetails-example.png
   :alt: AppendExceptionDetails
   :align: center

   AppendExceptionDetails

GenerateSearchKeywords
-------------------------------------------------------

Using this handler you can assign search keywords for a specific http request.

.. code-block:: c#
    :emphasize-lines: 14,16

    private void ConfigureKissLog()
    {
        KissLogConfiguration.Options
            .GenerateSearchKeywords((FlushLogArgs args) =>
            {
                var service = new GenerateSearchKeywordsService();
                List<string> defaultKeywords = service.GenerateKeywords(args).ToList();

                defaultKeywords.Add("CorrelationID:b001c6bf");

                return defaultKeywords;
            });
    }

.. figure:: images/generateKeywords-searchResult.png
   :alt: Search using keywords
   :align: center

   Search using "CorrelationID:b001c6bf" keyword

.. figure:: images/generateKeywords-requestLog.png
   :alt: Request log with matched keywords
   :align: center

   Request log with "CorrelationID:b001c6bf" keyword

CreateUserPayload
-------------------------------------------------------

This handler is used to customize the captured user display information.

.. code-block:: c#

    private void ConfigureKissLog()
    {
        KissLogConfiguration.Options
            .CreateUserPayload((KissLog.Http.HttpRequest httpRequest) =>
            {
                return new KissLog.RestClient.Requests.CreateRequestLog.User
                {
                    Name = "user@example.com",
                    Avatar = string.Format("https://eu.ui-avatars.com/api/?name={0}&size=256", "user@example.com")
                };
            });
    }

.. figure:: images/getUser-example.png
   :alt: GetUser
   :align: center

   Customized user display information


ShouldLogClaim
-------------------------------------------------------

Runtime handler used to determine if a request claim should be logged or not. Default: ``true``

.. code-block:: c#

    private void ConfigureKissLog()
    {
        KissLogConfiguration.Options
            .ShouldLogClaim((OptionsArgs.LogListenerClaimArgs args) =>
            {
                if (args.ClaimType == "secret_claim")
                    return false;

                return true;
            });
    }

ShouldLogRequestCookie
-------------------------------------------------------

Runtime handler used to determine if a request Cookie should be logged or not. Default: ``false``

.. code-block:: c#

    private void ConfigureKissLog()
    {
        KissLogConfiguration.Options
            .ShouldLogRequestCookie((OptionsArgs.LogListenerCookieArgs args) =>
            {
                if (args.CookieName == ".AspNetCore.Cookies")
                    return false;

                return true;
            });
    }

ShouldLogFormData
-------------------------------------------------------

Runtime handler used to determine if a request FormData should be logged or not. Default: ``true``

.. code-block:: c#

    private void ConfigureKissLog()
    {
        KissLogConfiguration.Options
            .ShouldLogFormData((OptionsArgs.LogListenerFormDataArgs args) =>
            {
                if (args.FormDataName == "PinNumber")
                    return false;

                return true;
            });
    }

ShouldLogRequestHeader
-------------------------------------------------------

Runtime handler used to determine if a request Header should be logged or not. Default: ``true``

.. code-block:: c#

    private void ConfigureKissLog()
    {
        KissLogConfiguration.Options
            .ShouldLogRequestHeader((OptionsArgs.LogListenerHeaderArgs args) =>
            {
                if (args.HeaderName == "X-JWT-Token")
                    return false;

                return true;
            });
    }

ShouldLogInputStream
-------------------------------------------------------

Runtime handler used to determine if a request InputStream should be logged or not. Default: ``true``

.. code-block:: c#

    private void ConfigureKissLog()
    {
        KissLogConfiguration.Options
            .ShouldLogInputStream((KissLog.Http.HttpRequest httpRequest) =>
            {
                if (httpRequest.Url.LocalPath == "/api/users/create")
                    return true;

                return false;
            });
    }

ShouldLogServerVariable
-------------------------------------------------------

Runtime handler used to determine if a request ServerVariable should be logged or not. Default: ``true``

.. code-block:: c#

    private void ConfigureKissLog()
    {
        KissLogConfiguration.Options
            .ShouldLogServerVariable((OptionsArgs.LogListenerServerVariableArgs args) =>
            {
                if (args.ServerVariableName == "SERVER_NAME")
                    return true;

                return false;
            });
    }


ShouldLogResponseBody
-------------------------------------------------------

Runtime handler used to determine if the response body should be logged or not.

``defaultValue = true`` when the response Content-Type is "application/json".

.. code-block:: c#

    private void ConfigureKissLog()
    {
        KissLogConfiguration.Options
            .ShouldLogResponseBody((KissLog.Http.HttpProperties httpProperties) =>
            {
                string url = httpProperties.Request.Url.LocalPath;

                // always log the "/Home/Index" response body
                if(string.Compare(url, "/Home/Index", true) == 0)
                    return true;

                return false;
            });
    }

.. figure:: images/responseBody.png
   :alt: /Home/Index Response Body
   :align: center

   "/Home/Index" Response body

.. figure:: images/responseBody-preview.png
   :alt: Response body preview
   :align: center

   Response body preview

ShouldLogResponseHeader
-------------------------------------------------------

Runtime handler used to determine if a response Header should be logged or not. Default: ``true``

.. code-block:: c#

    private void ConfigureKissLog()
    {
        KissLogConfiguration.Options
            .ShouldLogResponseHeader((OptionsArgs.LogListenerHeaderArgs args) =>
            {
                if (args.HeaderName == "X-Auth-Token")
                    return false;

                return true;
            });
    }


