Unity ResolutionFailedException
=======================================

When Unity cannot resolve a dependency, it silently fails with a default exception message:

.. code-block:: none

    System.MissingMethodException:
    No parameterless constructor defined for this object.

    System.InvalidOperationException:
    An error occurred when trying to create a controller of type 'MyApp.Controllers.ProductsController'.
    Make sure that the controller has a parameterless public constructor.

The exception message doesn't give any details about the missing service.

To solve this, you can use KissLog to capture and log the Unity resolution failed exception.

**Example**

.. code-block:: c#
    :caption: UnityDependencyResolver.cs
    :linenos:
    :emphasize-lines: 26,29
    
    namespace MyApp.Mvc.Unity
    {
        public class UnityDependencyResolver : IDependencyResolver
        {
            private readonly IUnityContainer _unityContainer;
            public UnityDependencyResolver(IUnityContainer unityContainer)
            {
                _unityContainer = unityContainer;
            }

            public object GetService(Type serviceType)
            {
                try
                {
                    return _unityContainer.Resolve(serviceType);
                }
                catch (Exception ex)
                {
                    if (ex is ResolutionFailedException)
                    {
                        ResolutionFailedException unityEx = (ResolutionFailedException)ex;

                        if (serviceType.FullName.StartsWith("System.") == false)
                        {
                            // get the current http request ILogger
                            ILogger logger = Logger.Factory.Get();

                            // log the Unity exception
                            logger.Error(unityEx);
                        }
                    }

                    return null;
                }
            }

            public IEnumerable<object> GetServices(Type serviceType)
            {
                try
                {
                    return _unityContainer.ResolveAll(serviceType);
                }
                catch (ResolutionFailedException)
                {
                    return new List<object>();
                }
            }
        }
    }

.. code-block:: c#
    :caption: Global.asax
    :linenos:
    :emphasize-lines: 20-21
    
    using Unity;
    using MyApp.Mvc.Unity;

    namespace MyApp.Mvc
    {
        public class MvcApplication : System.Web.HttpApplication
        {
            protected void Application_Start()
            {
                // [...]
    
                ConfigureUnity()
            }

            private void ConfigureUnity()
            {
                IUnityContainer unityContainer = new UnityContainer();
                unityContainer.RegisterType<ProductsService>();

                IDependencyResolver dependencyResolver = new UnityDependencyResolver(unityContainer);
                DependencyResolver.SetResolver(dependencyResolver);
            }
        }
    }


**Result**

.. figure:: images/ResolutionFailedException/ResolutionFailedException.png
   :alt: ResolutionFailedException
   :align: center

   ResolutionFailedException