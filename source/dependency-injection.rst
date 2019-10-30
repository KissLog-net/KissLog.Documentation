Dependency injection
=====================

Integrating KissLog with a dependency injection framework is a simple process.

When ask for ILogger, resolve it at runtime with ``Logger.Factory.Get()`` factory method.

.. admonition:: Non-web applications
    :class: note

    For non-web applications, do not inject the ILogger with IoC container.

    Instead, the ILogger should be created and flushed manually. Check the :doc:`../getting-started/console-apps` example.

.NET Core
-----------------------

For .NET Core appplications, ILogger is already registered as part of the install instructions.

**Startup.cs**

.. code-block:: c#
    :linenos:
    :emphasize-lines: 7-10
        
    namespace KissLog.Samples.AspNetCore
    {
        public class Startup
        {
            public void ConfigureServices(IServiceCollection services)
            {
                services.AddScoped<ILogger>((context) =>
                {
                    return Logger.Factory.Get();
                });
            }
        }
    }

Unity
-----------------------

.. code-block:: c#
    :linenos:
    :emphasize-lines: 9-11
        
    namespace MyApplication
    {
        public static class UnityConfig
        {
            private static void ConfigureContainer()
            {
                var container = new UnityContainer();

                container.RegisterType<ILogger>(
                    new InjectionFactory(u => Logger.Factory.Get())
                );
            }
        }
    }

Ninject
-----------------------

.. code-block:: c#
    :linenos:
    :emphasize-lines: 7-10
        
    namespace MyApplication.App_Start
    {
        public static class NinjectWebCommon
        {
            private static void RegisterServices(IKernel kernel)
            {
                kernel.Bind<ILogger>().ToMethod((context) =>
                {
                    return Logger.Factory.Get();
                });
            }
        }
    }

Autofac
-----------------------

.. code-block:: c#
    :linenos:
    :emphasize-lines: 9-11
        
    namespace MyApplication
    {
        public static class AutofacConfig
        {
            private static void ConfigureContainer()
            {
                var builder = new ContainerBuilder();

                builder
                    .Register(p => Logger.Factory.Get())
                    .As<ILogger>();
            }
        }
    }


