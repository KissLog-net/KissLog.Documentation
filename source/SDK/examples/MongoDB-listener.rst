MongoDB listener
=============================================

In this example you will create a custom ``ILogListener`` which saves the logs to MongoDB.

A full working example can be found `here <https://github.com/KissLog-net/KissLog.Sdk/tree/master/testApps/examples/MongoDbListenerExample>`_.

To start, create a custom ``ILogListener`` which instantiates a lazy MongoDb database connection.

.. code-block:: c#

    using KissLog;
    using MongoDB.Driver;
    using System;

    namespace MongoDbListenerExample.MongoDbListener
    {
        public class CustomMongoDbListener : ILogListener
        {
            private readonly Lazy<IMongoDatabase> _mongoDatabase;
            public CustomMongoDbListener(string connectionString, string databaseName)
            {
                _mongoDatabase = new Lazy<IMongoDatabase>(() =>
                {
                    var mongoClient = new MongoClient(connectionString);
                    var mongoDatabase = mongoClient.GetDatabase(databaseName);

                    return mongoDatabase;
                });
            }

            public ILogListenerInterceptor Interceptor { get; set; }

            public void OnBeginRequest(HttpRequest httpRequest)
            {
                // do nothing
            }

            public void OnMessage(KissLog.LogMessage message)
            {
                // do nothing
            }

            public void OnFlush(FlushLogArgs args)
            {
                // do nothing (for now)
            }
        }
    }


Next, define two entities which will be used to store the events in MongoDB: ``RequestLog`` and ``LogMessage``.

.. code-block:: c#

    using System;
    using System.Collections.Generic;

    namespace MongoDbListenerExample.MongoDbListener
    {
        public class RequestLog
        {
            public string Id { get; private set; } = Guid.NewGuid().ToString();
            public DateTime DateTime { get; set; }
            public string UserAgent { get; set; }
            public string HttpMethod { get; set; }
            public string AbsoluteUri { get; set; }
            public double DurationInMilliseconds { get; set; }
            public IEnumerable<KeyValuePair<string, string>> RequestHeaders { get; set; }
            public int StatusCode { get; set; }
            public IEnumerable<KeyValuePair<string, string>> ResponseHeaders { get; set; }
            public IEnumerable<LogMessage> Messages { get; set; }
        }

        public class LogMessage
        {
            public string Category { get; set; }
            public DateTime DateTime { get; set; }
            public string LogLevel { get; set; }
            public string Message { get; set; }
        }
    }


Update ``void OnFlush(FlushLogArgs args)`` method and prepare the entities which you will save in MongoDB.

.. code-block:: c#

    namespace MongoDbListenerExample.MongoDbListener
    {
        public class CustomMongoDbListener : ILogListener
        {
            // [ ... ]

            public void OnFlush(FlushLogArgs args)
            {
                var logMessages = args.MessagesGroups.SelectMany(p => p.Messages).OrderBy(p => p.DateTime).ToList();

                RequestLog requestLog = CreateModel(args.HttpProperties);
                requestLog.Messages = logMessages.Select(p => CreateModel(p)).ToList();
            }

            private LogMessage CreateModel(KissLog.LogMessage logMessage)
            {
                return new LogMessage
                {
                    Category = logMessage.CategoryName,
                    DateTime = logMessage.DateTime,
                    LogLevel = logMessage.LogLevel.ToString(),
                    Message = logMessage.Message
                };
            }

            private RequestLog CreateModel(HttpProperties httpProperties)
            {
                HttpRequest request = httpProperties.Request;
                HttpResponse response = httpProperties.Response;
                double durationInMs = (response.EndDateTime - request.StartDateTime).TotalMilliseconds;

                return new RequestLog
                {
                    DateTime = request.StartDateTime,
                    UserAgent = request.UserAgent,
                    HttpMethod = request.HttpMethod,
                    AbsoluteUri = request.Url.AbsoluteUri,
                    RequestHeaders = request.Properties.Headers,
                    DurationInMilliseconds = durationInMs,
                    StatusCode = response.StatusCode,
                    ResponseHeaders = response.Properties.Headers
                };
            }
        }
    }


Lastly, insert the entities in MongoDb database.

.. code-block:: c#

    namespace MongoDbListenerExample.MongoDbListener
    {
        public class CustomMongoDbListener : ILogListener
        {
            private readonly Lazy<IMongoDatabase> _mongoDatabase;
            public CustomMongoDbListener(string connectionString, string databaseName)
            {
                _mongoDatabase = new Lazy<IMongoDatabase>(() =>
                {
                    var mongoClient = new MongoClient(connectionString);
                    var mongoDatabase = mongoClient.GetDatabase(databaseName);

                    return mongoDatabase;
                });
            }

            public void OnFlush(FlushLogArgs args)
            {
                var logMessages = args.MessagesGroups.SelectMany(p => p.Messages).OrderBy(p => p.DateTime).ToList();

                RequestLog requestLog = CreateModel(args.HttpProperties);
                requestLog.Messages = logMessages.Select(p => CreateModel(p)).ToList();

                _mongoDatabase.Value.GetCollection<RequestLog>("RequestLog").InsertOne(requestLog);
            }

            // [ ... ]
        }
    }


Register the newly created listener:

.. code-block:: c#

    private void ConfigureKissLog()
    {
        KissLogConfiguration.Listeners
            .Add(new CustomMongoDbListener("mongodb://localhost:27017", "Logs"));
    }


.. figure:: images/MongoDBListener-output.png
   :alt: MongoDB listener

``CustomMongoDbListener`` full code:

.. code-block:: c#

    using KissLog;
    using KissLog.Http;
    using MongoDB.Driver;
    using System;
    using System.Linq;

    namespace MongoDbListenerExample.MongoDbListener
    {
        public class CustomMongoDbListener : ILogListener
        {
            private readonly Lazy<IMongoDatabase> _mongoDatabase;
            public CustomMongoDbListener(string connectionString, string databaseName)
            {
                _mongoDatabase = new Lazy<IMongoDatabase>(() =>
                {
                    var mongoClient = new MongoClient(connectionString);
                    var mongoDatabase = mongoClient.GetDatabase(databaseName);

                    return mongoDatabase;
                });
            }

            public ILogListenerInterceptor Interceptor { get; set; }

            public void OnBeginRequest(HttpRequest httpRequest)
            {
                // do nothing
            }

            public void OnMessage(KissLog.LogMessage message)
            {
                // do nothing
            }

            public void OnFlush(FlushLogArgs args)
            {
                var logMessages = args.MessagesGroups.SelectMany(p => p.Messages).OrderBy(p => p.DateTime).ToList();

                RequestLog requestLog = CreateModel(args.HttpProperties);
                requestLog.Messages = logMessages.Select(p => CreateModel(p)).ToList();

                _mongoDatabase.Value.GetCollection<RequestLog>("RequestLog").InsertOne(requestLog);
            }

            private LogMessage CreateModel(KissLog.LogMessage logMessage)
            {
                return new LogMessage
                {
                    Category = logMessage.CategoryName,
                    DateTime = logMessage.DateTime,
                    LogLevel = logMessage.LogLevel.ToString(),
                    Message = logMessage.Message
                };
            }

            private RequestLog CreateModel(HttpProperties httpProperties)
            {
                HttpRequest request = httpProperties.Request;
                HttpResponse response = httpProperties.Response;
                double durationInMs = (response.EndDateTime - request.StartDateTime).TotalMilliseconds;

                return new RequestLog
                {
                    DateTime = request.StartDateTime,
                    UserAgent = request.UserAgent,
                    HttpMethod = request.HttpMethod,
                    AbsoluteUri = request.Url.AbsoluteUri,
                    RequestHeaders = request.Properties.Headers,
                    DurationInMilliseconds = durationInMs,
                    StatusCode = response.StatusCode,
                    ResponseHeaders = response.Properties.Headers
                };
            }
        }
    }

