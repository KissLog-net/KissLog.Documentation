Unity exceptions
=====================

You can configure KissLog to capture and log Unity dependency injection exceptions.

To achive this, simply capture and log the Unity ``ResolutionFailedException`` exception.

.. code-block:: c#
    :caption: UnityDependencyResolver.cs
    :emphasize-lines: 19,26,27

    namespace MyApplication
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
                    if (ex is Microsoft.Practices.Unity.ResolutionFailedException)
                    {
                        Microsoft.Practices.Unity.ResolutionFailedException unityEx = (Microsoft.Practices.Unity.ResolutionFailedException)ex;

                        if (serviceType.FullName.StartsWith("System.") == false)
                        {
                            // log the Unity exception
                            ILogger logger = Logger.Factory.Get(categoryName: "Unity");
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
    :emphasize-lines: 10
        
    namespace MyApplication
    {
        public class MvcApplication : HttpApplication
        {
            protected void Application_Start()
            {
                UnityContainer unityContainer = UnityConfig.CreateContainer();

                IDependencyResolver dependencyResolver = new UnityDependencyResolver(unityContainer);
                DependencyResolver.SetResolver(dependencyResolver);
            }
        }
    }

.. code-block:: c#
    :caption: UnityConfig.cs
        
    namespace MyApplication
    {
        public static class UnityConfig
        {
            private static UnityContainer CreateContainer()
            {
                var container = new UnityContainer();

                container.RegisterType<ITenantConfiguration, TenantConfiguration>();
                container.RegisterType<IMemberRepository, MemberRepository>();

                return container;
            }
        }
    }
