KissLog for Web applications
========================================

For web applications, KissLog creates and shares the same logger instance throughout the entire http request (connection).

Logger is resolved using ``Logger.Factory.Get()`` factory method.

.. code-block:: c#

    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var logger = Logger.Factory.Get();
            logger.Trace("Hey there!");

            return View();
        }
    }


Logger is flushed automatically at the end of the http request, hence there is no need to call ``Logger.NotifyListeners()``.

Http properties
-------------------------------------------

For every request, KissLog captures all the http properties and saves them to ``logger.DataContainer.HttpProperties`` container.

.. code-block:: c#

    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var logger = Logger.Factory.Get();

            // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36"
            string userAgent = logger.DataContainer.HttpProperties.Request.UserAgent;

            // "63.69.127.254"
            string remoteAddress = logger.DataContainer.HttpProperties.Request.RemoteAddress;

            return View();
        }
    }


``FlushLogArgs.HttpProperties``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

All the collected http properties are passed to registered log listeners.

.. code-block:: c#

    public class MongoDbListener : ILogListener
    {
        public void OnFlush(FlushLogArgs args)
        {
            // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36"
            string userAgent = args.HttpProperties.Request.UserAgent;

            // 302
            int statusCode = args.HttpProperties.Response.StatusCode;
        }

        // [...]
    }


An example of all the ``HttpProperties`` values:

.. code-block:: json

    {
        "Request": {
            "StartDateTime": "2021-11-17T08:57:27.3412868Z",
            "Url": "http://localhost:61132/Home/Form?prop1=value",
            "HttpMethod": "POST",
            "UserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
            "RemoteAddress": "63.69.127.254",
            "HttpReferer": "http://localhost:61132/",
            "SessionId": "0a6cea0a-8f2b-4f67-2fb4-d32e9ab54400",
            "IsNewSession": false,
            "IsAuthenticated": false,
            "MachineName": "DESKTOP-AHFAE64",
            "Properties": {
                "Headers": [
                    {
                        "Key": "Accept", "Value": "text/html,application/xhtml+xml,application/xml"
                    }
                ],
                "Cookies": [
                    {
                        "Key": ".AspNetCore.Session", "Value": "CfDJ8AMliS5YXGWNj+v111NDjMT"
                    }
                ],
                "QueryString": [
                    {
                        "Key": "prop1", "Value": "value"
                    }
                ],
                "FormData": [
                    {
                        "Key": "Email", "Value": "p.adams@example.com"
                    }
                ],
                "ServerVariables": [
                    {
                        "Key": "SERVER_NAME", "Value": "localhost"
                    }
                ],
                "Claims": [
                    {
                        "Key": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name", "Value": "p.adams"
                    }
                ],
                "InputStream": "{\n    \"DocumentType\": \"pdf\",\n    \"DocumentNumber\": \"31690\",\n    \"ExpiryDate\": \"2022-11-16\"    \n}"
            }
        },
        "Response": {
            "StatusCode": 302,
            "EndDateTime": "2021-11-17T08:57:27.4024776Z",
            "Properties": {
                "Headers": [
                    {
                        "Key": "Location", "Value": "/"
                    }
                ],
                "ContentLength": 0
            }
        }
    }

