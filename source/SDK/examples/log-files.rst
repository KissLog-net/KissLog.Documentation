Log files
=====================================================

KissLog can be used to log files. This is useful when you need to:

- Log large text messages which would normally be truncated

- Save files which have been generated / processed throughout the request

- Save response body

.. code-block:: c#
    :caption: HomeController.cs

    using KissLog.AspNetCore;

    namespace AspNetCore5.Controllers
    {
        public class HomeController : Controller
        {
            private readonly ILogger<HomeController> _logger;
            public HomeController(ILogger<HomeController> logger)
            {
                _logger = logger;
            }
    
            public IActionResult Index()
            {
                _logger.LogAsFile("This content will be saved as a file", "File.txt");
                _logger.LogFile(@"C:\\Users\\Downloads\\cyber-receipt-16117.pdf", "cyber-receipt.pdf");
                _logger.LogResponseBody(true);

                return View();
            }
        }
    }

.. figure:: images/LogFiles/RequestLog.png
   :alt: Logged files

.. figure:: images/LogFiles/Response-preview.png
   :alt: Previewing a logged file
