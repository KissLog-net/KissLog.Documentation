Saving the logs
====================

.. contents::
   :local:
   :depth: 1

KissLog saves the logs by using log listeners.

An application can use any number of log listeners.

Register log listeners
-------------------------

Log listeners are registered at application startup using the ``KissLogConfiguration.Listeners.Add()`` method.

.. code-block:: c#
    :emphasize-lines: 12,13

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            ILogListener cloudListener = new KissLogApiListener(new Application(ConfigurationManager.AppSettings["KissLog.OrganizationId"], ConfigurationManager.AppSettings["KissLog.ApplicationId"]))
            {
                ApiUrl = "https://api.kisslog.net"
            };

            ILogListener textListener = new LocalTextFileListener(@"C:\\my-application\\logs");

            KissLogConfiguration.Listeners.Add(cloudListener);
            KissLogConfiguration.Listeners.Add(textListener);
        }
    }
    

Log listeners events
-------------------------

Log listeners are triggered automatically on three separate events:

- **OnBeginRequest()** - executed at the beginning of the http request

- **OnMessage()** - executed each time a log message is created

- **OnFlush()** - executed at the end of the http request


.. code-block:: none
    :emphasize-lines: 1,6,9,13

    GET /Home/Index                  <---- OnBeginRequest()
    

    ILogger logger = Logger.Factory.Get();

    logger.Debug("step 1");          <---- OnMessage()

    ...
    logger.Info("step n");           <---- OnMessage()


    
    HTTP 200 OK                      <---- OnFlush()


.. toctree::
    :maxdepth: 1

    KissLogApiListener
    LocalTextFileListener
    NLogTargetListener
    CustomListeners