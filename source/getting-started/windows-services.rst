Windows services
====================

Windows services applications have the same behavior as :doc:`console-apps`.

A typical windows service application has three events:

- OnStart() - triggered when the service starts (event)

- OnStop() - triggered when the service stops (event)

- Execute() - the actual service implementation

We log the ``Execute()`` method by using a **try-catch-finally** block to simulate the BEGIN and the END of the action.

Calling ``Logger.NotifyListeners(logger)`` in the **finally** block (line 19) ensures that the listeners will execute the ``OnFlush()`` method.

.. code-block:: c#
    :linenos:
    :emphasize-lines: 5,19

    public partial class MyService : ServiceBase
    {
        public void Execute(object source, ElapsedEventArgs e)
        {
            ILogger logger = new Logger(url: "MyService.Execute");

            try
            {
                logger.Info("executing MyService");

                // executing
            }
            catch(Exception ex)
            {
                logger.Error(ex);
            }
            finally
            {
                Logger.NotifyListeners(logger);
            }
        }
    }

``OnStart()`` and ``OnStop()`` methods are triggered by Windows.


These two methods are *events / hooks* - they don't represent the actual implementation of the service.

.. code-block:: c#
    :linenos:
    :emphasize-lines: 8,12,19,21,30,35,49

    using KissLog;

    namespace WindowsService_sample
    {
        public partial class MyService : ServiceBase
        {
            private readonly Timer timer = new Timer();
            private readonly int _triggerInterval = 1000;

            private ILogger Logger = null;

            public MyService()
            {
                ConfigureKissLog();

                InitializeComponent();
            }

            protected override void OnStart(string[] args)
            {
                Logger = new Logger();

                Logger.Info("***** Starting service *****");

                timer.Elapsed += new ElapsedEventHandler(Execute);
                timer.Interval = _triggerInterval;
                timer.Enabled = true;
            }

            protected override void OnStop()
            {
                Logger.Info("Service stopped");

                _timer.Stop();
            }

            public void Execute(object source, ElapsedEventArgs e)
            {
                ILogger logger = new Logger(url: "MyService.Execute");

                try
                {
                    logger.Info("executing MyService");

                    // executing
                }
                catch(Exception ex)
                {
                    logger.Error(ex);
                }
                finally
                {
                    KissLog.Logger.NotifyListeners(logger);
                }
            }

            private void ConfigureKissLog()
            {
                string organizationId = "0337cd29-a56e-42c1-a48a-e900f3116aa8";
                string applicationId = "b1d65503-fc9d-4d3d-9f37-3c8be9fcb450";

                // Save the logs to KissLog.net
                KissLogConfiguration.Listeners.Add(new KissLogApiListener(new KissLog.Apis.v1.Auth.Application(organizationId, applicationId))
                {
                    UseAsync = false
                });

                // Save all the KissLog logs to NLog targets (local text files)
                KissLogConfiguration.Listeners.Add(new NLogTargetListener());
            }
        }
    }

