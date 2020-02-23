Console applications
=======================

For console applications, the ``ILogger`` needs to be created and flushed manually.

This can be achieved by using a **try-catch-finally** block, which simulates the BEGIN and the END of a method.

We flush the logs in the **finally** block by executing ``Logger.NotifyListeners()`` method.

.. code-block:: c#
    :emphasize-lines: 5,9,15,21

    class Program
    {
        static void Main(string[] args)
        {
            ILogger logger = new Logger(url: "Main");

            try
            {
                logger.Info("Executing main");

                logger.Debug("Debug message");
            }
            catch(Exception ex)
            {
                logger.Error(ex);
                throw;
            }
            finally
            {
                // notify the listeners
                Logger.NotifyListeners(logger);
            }
        }
    }

.. figure:: images/console-application.png
   :alt: Logs
   :align: center

Log listeners events
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The registered log listeners are notified as following:

.. code-block:: c#

    static void Main(string[] args)
    {
        ILogger logger = new Logger(url: "Main");   // <-- OnBeginRequest()

        try
        {
            logger.Info("Executing main");          // <-- OnMessage()

            logger.Debug("Debug message");          // <-- OnMessage()
        }
        catch(Exception ex)
        {
            logger.Error(ex);                       // <-- OnMessage()
            throw;
        }
        finally
        {
            Logger.NotifyListeners(logger);         // <-- OnFlush()
        }
    }

