Getting started
================

.. code-block:: c#
    :linenos:

    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ILogger logger = Logger.Factory.Get();

            logger.Info("/Home/Index has been triggered");
        }
    }

    public class Foo
    {
        public void Bar(string productId, double price)
        {
            ILogger logger = Logger.Factory.Get();

            logger.Debug("Bar begin with args: {productId}, {price}");
        }
    }

.. toctree::
   :maxdepth: 1
   :hidden:
   
   console-apps
   windows-services

