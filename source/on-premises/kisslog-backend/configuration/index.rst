Configuration
=================================

KissLog.Backend behavior can be customized by updating the ``Configuration\KissLog.json`` file.

A full example of the ``KissLog.json`` configuration file can be found `here <https://github.com/KissLog-net/KissLog-server/blob/main/KissLog.Backend/KissLog.json>`_.

.. contents:: Configuration options
   :local:

KissLogBackend.BasicAuth.Password
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Basic HTTP authentication scheme password used to connect to KissLog.Backend application.

This property should have the same value as the same property from ``KissLog.Frontend\Configuration\KissLog.json``.

.. code-block:: json
    
    {
        "KissLogBackend.BasicAuth.Password": "_This_Password_Should_Be_Replaced_"
    }

KissLogBackendUrl
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Root url pointing to KissLog.Backend application.

.. code-block:: json
    
    {
        "KissLogBackendUrl": "http://kisslog-backend.myapp.com/"
    }

KissLogFrontendUrl
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Root url pointing to KissLog.Frontend application.

.. code-block:: json
    
    {
        "KissLogFrontendUrl": "http://kisslog.myapp.com/"
    }

Database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "Database": {
            "Provider": "MongoDb",
            "MongoDb": {},
            "AzureCosmosDb": {}
        }
    }

.. list-table::
   :header-rows: 1

   * - Database.Provider
     - 
   * - MongoDb
     - Sets the database provider to MongoDB.
   * - AzureCosmosDb
     - Sets the database provider to Azure CosmosDB.

.. list-table::
   :header-rows: 1

   * - Database.MongoDb
   * - Required when "Database.Provider" is "MongoDb".

.. list-table::
   :header-rows: 1

   * - Database.AzureCosmosDb
   * - Required true when "Database.Provider" is "AzureCosmosDb".

MongoDb
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configuration used to connect to MongoDB server.

.. code-block:: json
    
    {
        "Database": {
            "MongoDb": {
                "ConnectionString": "mongodb://localhost:27017",
                "DatabaseName": "KissLogDatabase"
            },
        }
    }

AzureCosmosDb
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configuration used to connect to Azure Cosmos DB service.

.. code-block:: json
    
    {
        "Database": {
            "AzureCosmosDb": {
                "ConnectionString": "AccountEndpoint=https://kisslog-database-nosql.documents.azure.com:443/;AccountKey={_your_account_key_};",
                "ApplicationRegion": "West Europe",
                "DatabaseName": "KissLogDatabase"
            },
        }
    }


Files
~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "Files": {
            "Provider": "MongoDb",
            "MaximumFileSizeInBytes": 2097152,
            "Azure": {}
        }
    }

.. list-table::
   :header-rows: 1

   * - Files.Provider
     - 
   * - MongoDb
     - Sets the files storage provider to MongoDB.
   * - Azure
     - Sets the files storage provider to Azure Storage container.

.. list-table::
   :header-rows: 1

   * - Files.MaximumFileSizeInBytes
   * - Specifies the maximum file size (in bytes) which can be uploaded.

.. list-table::
   :header-rows: 1

   * - Files.Azure
   * - Required  when "Files.Provider" is "Azure"

Azure
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configuration used to connect to Azure Storage account.

.. code-block:: json
    
    {
        "Files": {
            "Azure": {
                "ConnectionString": "DefaultEndpointsProtocol=https;AccountName=myfilesstorage;AccountKey=A889wNrmGpz74rT5kNg53VB==;EndpointSuffix=core.windows.net"
            }
        }
    }


CreateRequestLog
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "CreateRequestLog": {
            "SaveInputStreamAsFileIfLengthGte": 5000,
            "Ignore": {},
            "Obfuscate": {},
            "Truncate": {},
            "Throttle": {}
        }
    }

.. list-table::
   :header-rows: 1

   * - CreateRequestLog.SaveInputStreamAsFileIfLengthGte
   * - If Request.InputStream content exceeds the length defined here, the value will be saved as a blob file.
       
       This helps prevent saving excesive large objects in database.

Ignore
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: json
    
    {
        "CreateRequestLog": {
            "Ignore": {
                "UrlPathPatterns": [ "(?si).js$", "(?si).css$", "(?si).map$", "(?si).xml$", "(?si).php$", "(?si).ttf" ],
                "ResponseContentTypePatterns": [ "(?si)^application/javascript", "(?si)^image/", "(?si)^application/font-" ]
            }
        }
    }

.. list-table::
   :header-rows: 1

   * - Ignore.UrlPathPatterns
   * - An array of Regex patterns used to identify requests which should be ignored based on the url path.

.. list-table::
   :header-rows: 1

   * - Ignore.ResponseContentTypePatterns
   * - An array of Regex patterns used to identify requests which should be ignored based on the ``Response.Content-Type`` header.

Obfuscate
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: json
    
    {
        "CreateRequestLog": {
            "Obfuscate": {
                "IsEnabled": true,
                "ObfuscateInputStream": false,
                "Placeholder": "<obfuscated>",
                "Patterns": [ "(?si)pass" ]
            }
        }
    }

.. list-table::
   :header-rows: 1

   * - Obfuscate.IsEnabled
     -
   * - true
     - Request parameters are parsed and any matching properties will be obfuscated.
   * - false
     - Obfuscation service is disabled.

.. list-table::
   :header-rows: 1

   * - Obfuscate.ObfuscateInputStream
     -
   * - true
     - ``Request.InputStream`` will be parsed and any matching properties will be obfuscated.
       
       This method is expensive and can affect the latency of the application.
   * - false
     - ``Request.InputStream`` will not be parsed.

.. list-table::
   :header-rows: 1

   * - Obfuscate.Placeholder
   * - Placeholder used to replace the sensitive properties matched by the Regex patterns.

.. list-table::
   :header-rows: 1

   * - Obfuscate.Patterns
   * - An array of Regex patters which are used to identify potential sensitive data.

Truncate
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configuration used to truncate request log payloads.

Before saving to database, the request log will be truncated using the limits provided by this configuration.

.. code-block:: json
    
    {
        "CreateRequestLog": {
            "Truncate": {
                "Files": {
                    "Limit": 5
                },
                "LogMessages": {
                    "Limit": 100,
                    "MessageMaxLength": 10000
                },
                "Exceptions": {
                    "Limit": 6,
                    "ExceptionMessageMaxLength": 500
                },
                "CustomProperties": {
                    "Limit": 10,
                    "KeyMaxLength": 20,
                    "ValueMaxLength": 100
                },
                "Keywords": {
                    "Limit": 6,
                    "KeywordMinLength": 5,
                    "KeywordMaxLength": 30
                },
                "RequestHeaders": {
                    "Limit": 20,
                    "KeyMaxLength": 100,
                    "ValueMaxLength": 1000
                },
                "RequestCookies": {
                    "Limit": 5,
                    "KeyMaxLength": 100,
                    "ValueMaxLength": 100
                },
                "RequestQueryString": {
                    "Limit": 30,
                    "KeyMaxLength": 100,
                    "ValueMaxLength": 1000
                },
                "RequestFormData": {
                    "Limit": 30,
                    "KeyMaxLength": 100,
                    "ValueMaxLength": 1000
                },
                "RequestServerVariables": {
                    "Limit": 30,
                    "KeyMaxLength": 100,
                    "ValueMaxLength": 1000
                },
                "RequestClaims": {
                    "Limit": 30,
                    "KeyMaxLength": 100,
                    "ValueMaxLength": 1000
                },
                "ResponseHeaders": {
                    "Limit": 30,
                    "KeyMaxLength": 100,
                    "ValueMaxLength": 1000
                }
            }
        }
    }

Throttle
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: json
    
    {
        "CreateRequestLog": {
            "Throttle": {
                "Rules": [
                    {
                        "IsEnabled": false,
                        "Organizations": ["a754e353-a0f9-48ae-ad11-66470c70d0bf"],
                        "Applications": ["26e1cf75-5ad7-49cc-b48e-798b49dc41ba"],
                        "RemoteIpAddresses": ["2.127.71.193", "228.137.250.192"],
                        "Limits": [
                            {
                                "RequestLimit": 1,
                                "IntervalInSeconds": 5,
                                "StatusCodeLt": 400
                            }
                        ]
                    }
                ]
            }
        }
    }

.. list-table::
   :header-rows: 1

   * - Throttle.Rules[]
   * - A list of throttle rules to be applied when receiving a request log.
       
       A rule can specify only one of ``Organizations``, ``Applications`` or ``RemoteIpAddresses`` filters.
       
       If a rule has no filters specified, the rule will apply for all the incoming requests.

.. list-table::
   :header-rows: 1

   * - Throttle.Rules[]
     -
   * - IsEnabled
     - Specifies if the rule is enabled.
   * - Organizations
     - An array of organization ids for which the rule will apply.
   * - Applications
     - An array of application ids for which the rule will apply.
   * - RemoteIpAddresses
     - An array of IP addresses for which the rule will apply.
   * - Limits[]
     - A list of throttle limits to be applied for the rule.

.. list-table::
   :header-rows: 1

   * - Throttle.Rules[].Limits[]
     -
   * - RequestLimit
     - Specifies how many requests should be accepted in the specified interval of time.
   * - IntervalInSeconds
     - Specifies the interval of time, in seconds, when the request limit is calculated.
   * - StatusCodeLt
     - Specifies the "< Status Code" for which the request limit is applied.


UrlTokenization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "UrlTokenization": {
            "IgnoreTokenizationUrlPathPatterns": [ "(?si)^\/[0-9]+$" ],
            "PathComponentTokenization": {
                "Characters": [ "%", " ", ":", ",", ";", "+", "%", "&", "#", "(", ")", "@", "=", "<", ">", "{", "}", "\"", "'" ],
                "Patterns": [ "(?si)(?:\\D*\\d){3}" ]
            },
        }
    }

.. list-table::
   :header-rows: 1

   * - UrlTokenization.IgnoreTokenizationUrlPathPatterns
   * - An array of Regex patterns for which the url tokenization will not be activated.
       
       .. code-block:: none

           Example: [ "(?si)^\/home\/error-(?:[0-9])+$" ]
           Because the url "/Home/Error-404" is matched by the regex, url tokenization will not be activated.

           "/Home/Error-404" ---> "/Home/Error-404"       
       
.. list-table::
   :header-rows: 1

   * - UrlTokenization.PathComponentTokenization.Characters
   * - If an url path contains any of the specified characters in this array, the path will be considered a parameter.

       .. code-block:: none

           Example: [ ":" ]
           Because the url path "/D1:P7:00A" contains ":" character, it will be considered a parameter.

           "/api/reports/generate/D1:P7:00A" ---> "/api/reports/generate/{0}"


.. list-table::
   :header-rows: 1

   * - UrlTokenization.PathComponentTokenization.Patterns
   * - An array of Regex patterns used to identify parameters inside url paths

       .. code-block:: none

           Example: [ "(?si)(?:\\D*\\d){3}" ]
           Because the url path "/APP-002" is matched by the regex (contains 3 digits), it will be considered a parameter.

           "/api/reports/generate/APP-002" ---> "/api/reports/generate/{0}"


TimeToLive
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Specifies for how long the captured logs and other data entities should be kept in database.

The time to live value can be specified in ``Days``, ``Hours`` or ``Minutes``. 

.. code-block:: json
    
    {
        "TimeToLive": {
            "RequestLog": [
                {
                    "StatusCodeLt": 400,
                    "Minutes": 2880
                },
                {
                    "StatusCodeLt": 500,
                    "Hours": 96
                },
                {
                    "StatusCodeLt": 600,
                    "Days": 6
                }
            ],
            "AlertDefinitionInvocation": {
                "Days": 30
            },
            "ApplicationAlert": {
                "Days": 30
            },
            "ApplicationChartData": {
                "Days": 30
            },
            "ApplicationData": {
                "Days": 30
            },
            "ApplicationEndpoint": {
                "Days": 30
            },
            "ApplicationException": {
                "Days": 30
            },
            "ApplicationUsage": {
                "Days": 180
            },
            "ApplicationUser": {
                "Days": 30
            },
            "HttpRefererDestination": {
                "Days": 30
            },
            "HttpRefererSource": {
                "Days": 30
            }
        }
    }

ApplicationSettings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

DeleteApplicationDataByExpiryDate
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: json
    
    {
        "ApplicationSettings": {
            "DeleteApplicationDataByExpiryDate": {
                "TriggerIntervalInMinutes": 180
            }
        }
    }

.. list-table::
   :header-rows: 1

   * - DeleteApplicationDataByExpiryDate.TriggerIntervalInMinutes
   * - Specifies the interval of time in which the delete application data service is executed.

ProcessQueues
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: json
    
    {
        "ApplicationSettings": {
            "ProcessQueues": {
                "TriggerIntervalInSeconds": 10,
                "Take": 100
            }
        }
    }

.. list-table::
   :header-rows: 1

   * - ProcessQueues.TriggerIntervalInSeconds
   * - Specifies the interval in which the entities saved in memory (queue) should be inserted in database.

.. list-table::
   :header-rows: 1

   * - ProcessQueues.Take
   * - Specifies how many items from queue should be processed at the specified interval of time.

ProcessAlerts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: json
    
    {
        "ApplicationSettings": {
            "ProcessAlerts": {
                "TriggerIntervalInSeconds": 10
            }
        }
    }

.. list-table::
   :header-rows: 1

   * - ProcessAlerts.TriggerIntervalInSeconds
   * - Specifies the interval in which the alerts are evaluated against the received request logs.
