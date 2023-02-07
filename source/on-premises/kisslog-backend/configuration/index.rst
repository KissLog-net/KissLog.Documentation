Configuration
=================================

KissLog.Backend configuration is achieved by updating the ``Configuration\KissLog.json`` file.

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
   * - ``"MongoDb"``
     - Sets the database provider to MongoDB
   * - ``"AzureCosmosDb"``
     - Sets the database provider to Azure CosmosDB

.. list-table::
   :header-rows: 1

   * - Database.MongoDb
   * - Required when ``Database.Provider = "MongoDb"``

.. list-table::
   :header-rows: 1

   * - Database.AzureCosmosDb
   * - Required true when ``Database.Provider = "AzureCosmosDb"``

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
            "MaximumFileSizeInBytes": 2097152, // 2MB
            "Azure": {}
        }
    }

.. list-table::
   :header-rows: 1

   * - Files.Provider
     - 
   * - ``"MongoDb"``
     - Sets the files storage provider to MongoDB
   * - ``"Azure"``
     - Sets the files storage provider to Azure Storage container

.. list-table::
   :header-rows: 1

   * - Files.MaximumFileSizeInBytes
   * - Specifies the maximum file size (in bytes) which can be uploaded.

.. list-table::
   :header-rows: 1

   * - Files.Azure
   * - Required  when ``Files.Provider = "Azure"``

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
            "Truncate": {}
            "Throttle": {},
        }
    }

.. list-table::
   :header-rows: 1

   * - CreateRequestLog.SaveInputStreamAsFileIfLengthGte
   * - | If Request.InputStream content exceeds the length defined here, the value will be saved as a blob file.
       | This helps prevent creating too large database objects.

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
   * - An array of Regex patterns used to identify requests which should be ignored based on the url path

.. list-table::
   :header-rows: 1

   * - Ignore.ResponseContentTypePatterns
   * - An array of Regex patterns used to identify requests which should be ignored based on the ``Response.Content-Type`` header

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
     - Request parameters are parsed and matched properties will be obfuscated
   * - false
     - Obfuscation service is disabled


+------------------------+-----------------------------------------------------------------------+
| Obfuscate.IsEnabled                                                                            |
+========================+=======================================================================+
| ``true``               | Request parameters are parsed and sensitive data will be obfuscated   |
+------------------------+-----------------------------------------------------------------------+
| ``false``              | Obfuscation service is disabled                                       |
+------------------------+-----------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------+
| Obfuscate.Placeholder                                                                        |
+==============================================================================================+
| Placeholder used to replace the sensitive data matched by the Regex patterns                 |
+----------------------------------------------------------------------------------------------+

+-----------------------------------------------------------------------------------------------------+
| Obfuscate.Patterns                                                                                  |
+=====================================================================================================+
| An array of Regex patters which are used to identify potential sensitive data                       |
+-----------------------------------------------------------------------------------------------------+


TokenizeUrl
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: json
    
    {
        "CreateRequestLog": {
            "TokenizeUrl": {
                "ParameterCharacters": [ "%", " ", ":", ",", ";", "+", "%", "&", "#", "(", ")", "@", "=", "<", ">", "{", "}", "\"", "'" ],
                "ParameterPatterns": [ "(?si)(?:\\D*\\d){3}" ],
                "SkipPatterns": [ "(?si)^\/[0-9]+$" ]
            }
        }
    }

.. list-table::
   :header-rows: 1

   * - TokenizeUrl.ParameterCharacters
   * - If an url path contains any of the specified characters in this array, the path will be considered a parameter.

       .. code-block:: none

           Example: [ ":" ]
           Because the url path "/D1:P7:00A" contains ":" character, it will be considered a parameter.

           "/api/reports/generate/D1:P7:00A" ---> "/api/reports/generate/{0}"


.. list-table::
   :header-rows: 1

   * - TokenizeUrl.ParameterPatterns
   * - An array of Regex patterns used to identify parameters inside url paths

       .. code-block:: none

           Example: [ "(?si)(?:\\D*\\d){3}" ]
           Because the url path "/APP-002" is matched by the regex (contains 3 digits), it will be considered a parameter.

           "/api/reports/generate/APP-002" ---> "/api/reports/generate/{0}"


.. list-table::
   :header-rows: 1

   * - TokenizeUrl.SkipPatterns
   * - An array of Regex patterns for which the url tokenization will not be activated.

       .. code-block:: none

           Example: [ "(?si)^\/home\/error-(?:[0-9])+$" ]
           Because the url "/Home/Error-404" is matched by the regex, url tokenization will not be activated.

           "/Home/Error-404" ---> "/Home/Error-404"


Throttle
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: json
    
    {
        "CreateRequestLog": {
            "Throttle": {
                "Rules": [
                    {
                        "IsEnabled": false,
                        "ApplicationId": "",
                        "RemoteIpAddress": "",
                        "Limits": [
                            {
                                "RequestLimit": 1,
                                "IntervalInSeconds": 5,
                                "LessThanStatusCode": 400
                            }
                        ]
                    }
                ]
            }
        }
    }

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Throttle.Rules[]                                                                                                                                                |
+=================================================================================================================================================================+
|  A list of throttle rules to be applied when receiving a request log.                                                                                           |
|                                                                                                                                                                 |
|  If none of ``ApplicationId`` or ``RemoteIpAddress`` are specified, the rule will apply for all the request logs.                                               |
+---------------------------------------+-------------------------------------------------------------------------------------------------------------------------+
| ``IsEnabled``                         | Specifies if the rule is enabled                                                                                        |
+---------------------------------------+-------------------------------------------------------------------------------------------------------------------------+
| ``ApplicationId``                     | If has value, the throttle rule will apply only for the request logs belonging to the specified ApplicationId.          |
+---------------------------------------+-------------------------------------------------------------------------------------------------------------------------+
| ``RemoteIpAddress``                   | If has value, the throttle rule will apply only for the request logs generated from the specified IP addresses.         |
+---------------------------------------+-------------------------------------------------------------------------------------------------------------------------+
| ``Limits[]``                          | A list of throttle limits to be applied for the rule.                                                                   |
+---------------------------------------+-------------------------------------------------------------------------------------------------------------------------+

.. list-table::
   :header-rows: 1

   * - Throttle.Rules[].Limits[]
     -

   * - ``RequestLimit``
     - Specifies how many requests should be accepted in the specified interval of time.
    
   * - ``IntervalInSeconds``
     - Specifies the interval of time, in seconds, when the request limit is calculated.

   * - ``LessThanStatusCode``
     - Specifies the "< Status Code" for which the request limit is applied.

Truncate
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configuration used to truncate request log payloads.

Before saving to database, the request log will be truncated using the limits provided by this configuration.

.. code-block:: json
    
    {
        "CreateRequestLog": {
            "Truncate": {
                "LogMessages": {
                    "Limit": 100,
                    "MessageMaxLength": 10000
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
                "RequestQueryString": { },
                "RequestFormData": { },
                "RequestServerVariables": { },
                "RequestClaims": { },
                "ResponseHeaders": { },
                "Keywords": { },
                "Exceptions": { }
            }
        }
    }

Alerts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Configuration used for the alers service.

.. code-block:: json
    
    {
        "Alerts": {
            "IsEnabled": true,
            "CacheIntervalInSeconds": 86400,
            "Queue": { }
        }
    }

+------------------------+-------------------------------------------------------------+
| Alerts.IsEnabled                                                                     |
+========================+=============================================================+
| ``true``               | Alerts functionality is enabled                             |
+------------------------+-------------------------------------------------------------+
| ``false``              | Alerts functionality is disabled                            |
+------------------------+-------------------------------------------------------------+

+----------------------------------------------------------------------------------------------+
| Alerts.CacheIntervalInSeconds                                                                |
+==============================================================================================+
| Specifies for how long the alerts created in the user interface                              |
| should be saved into cache memory.                                                           |
|                                                                                              |
| Saving alerts into cache memory reduces the database operations.                             |
+----------------------------------------------------------------------------------------------+

Queue
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: json
    
    {
        "Alerts": {
            "Queue": {
                "TriggerIntervalInSeconds": 30
            }
        }
    }

+----------------------------------------------------------------------------------------------+
| Queue.TriggerIntervalInSeconds                                                               |
+==============================================================================================+
| Specifies the interval in which the alerts are evaluated against the received                |
| request logs.                                                                                |
+----------------------------------------------------------------------------------------------+

Exceptions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "Exceptions": {
            "TreatErrorLogsAsExceptions": false,
            "ErrorLogExceptionType": "LogMessageException"
        }
    }

+------------------------+---------------------------------------------------------------------------+
| Exceptions.TreatErrorLogsAsExceptions | default: ``false``                                         |
+========================+===========================================================================+
| ``true``               | String logs of Error verbosity will also be saved as exceptions           |
+------------------------+---------------------------------------------------------------------------+
| ``false``              | String logs of Error verbosity are not saved as exceptions (default)      |
+------------------------+---------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------+
| Exceptions.ErrorLogExceptionType                                                             |
+========================+=====================================================================+
| Required               | true when ``Exceptions.TreatErrorLogsAsExceptions = true``          |
+------------------------+---------------------------------------------------------------------+
| Specifies the ExceptionType of the exceptions created by the string logs of Error verbosity  |
+----------------------------------------------------------------------------------------------+

Endpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "Endpoints": {
            "IncrementErrorCountCondition": "HttpStatusCodeGte400"
        }
    }

+---------------------------------------------------------------------------------------------------------------------------------------------+
| Endpoints.IncrementErrorCountCondition                                                                                                      |
+=============================================================================================================================================+
| **Values**                                                                                                                                  |
+---------------------------------------------------------------+-----------------------------------------------------------------------------+
| ``"HttpStatusCodeGte400"``                                    | An endpoint will increment the errors counter when                          |  
|                                                               | the Response.StatusCode >= 400                                              |
+---------------------------------------------------------------+-----------------------------------------------------------------------------+
| ``"HttpStatusCodeGte400_or_HasErrorLogMessage"``              | An endpoint will increment the errors counter when                          |  
|                                                               | the Response.StatusCode >= 400 or when it has any Error verbosity log       |
|                                                               | messasges                                                                   |
+---------------------------------------------------------------+-----------------------------------------------------------------------------+


RequestLogs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "RequestLogs": {
            "Search": { }
        }
    }

Search
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configuration used by the Request logs "search for keywords" engine.

.. code-block:: json
    
    {
        "RequestLogs": {
            "Search": {
                "Engine": "MongoDbTextSearch",
                "IndexInputStream": true,
                "KeyRange": [ 1, 100 ],
                "ValueRange": [ 1, 100 ]
            }
        }
    }

+---------------------------------------------------------------------------------------------------------------+
| Search.Engine                                                                                                 |
+===============================================================================================================+
| **Values**                                                                                                    |
+----------------------------+----------------------------------------------------------------------------------+
| ``null``                   | Search for keywords functionality is disabled                                    |
+----------------------------+----------------------------------------------------------------------------------+
| ``"MongoDbTextSearch"``    | Uses the MongoDB text-search engine.                                             |
|                            | Available when ``Database.Provider = "MongoDb"``                                 |
+----------------------------+----------------------------------------------------------------------------------+
| ``"RegexSearch"``          | Uses Regex to search for keywords                                                |
+----------------------------+----------------------------------------------------------------------------------+

TimeToLive
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Specifies for how long the captured logs and data aggregates should be kept in database.

.. code-block:: json
    
    {
        "TimeToLive": {
            "RequestLog": [
                {
                    "LessThanStatusCode": 400,
                    "Minutes": 2880
                }
            ],
            "ApplicationAlert": {
                "Minutes": 43200
            },
            "ApplicationException": {
                "Minutes": 43200
            },
            "ApplicationAlertTriggerEvent": { },
            "ApplicationChartData": { },
            "ApplicationExceptionInterval": { },
            "ApplicationGeneralData": { },
            "ApplicationMetadata": { },
            "ApplicationUrl": { },
            "ApplicationUser": { },
            "UrlException": { },
            "ApplicationUsageInterval": { }
        }
    }

Jobs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Configuration used for the automatic background jobs.

.. code-block:: json
    
    {
        "Jobs": {
            "DeleteApplicationData": { }
        }
    }

DeleteApplicationData
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Delete application data job configuration.

.. code-block:: json
    
    {
        "Jobs": {
            "DeleteApplicationData": {
                "TriggerIntervalInMinutes": 720
            }
        }
    }

+----------------------------------------------------------------------------------------------+
| DeleteApplicationData.TriggerIntervalInMinutes                                               |
+==============================================================================================+
| Specifies the interval of time in which the delete application data service is executed.     |
+----------------------------------------------------------------------------------------------+


RepositoryQueues
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "RepositoryQueues": {
            "ApplicationChartData": {
                "IsEnabled": true,
                "TriggerIntervalInSeconds": 10,
                "Take": 50
            },
            "ApplicationExceptionInterval": {
                "IsEnabled": true,
                "TriggerIntervalInSeconds": 10,
                "Take": 50
            },
            "ApplicationGeneralData": { },
            "ApplicationMetadata": { },
            "ApplicationUrl": { },
            "ApplicationUsageInterval": { },
            "ApplicationUser": { }
        }
    }

+----------------------------------------------------------------------------------------------------+
| [_DatabaseCollection_].IsEnabled                                                                   |
+===================+================================================================================+
| ``true``          | Enables delayed insert for the specified database collection.                  |
|                   | When enabled, the new entities are kept in memory (queue), and are later       |
| (recommended)     | inserted in database at regular intervals of time.                             |
|                   |                                                                                |
|                   | Having queue enabled significantly reduces                                     |
|                   | the database operations.                                                       |
+-------------------+--------------------------------------------------------------------------------+
| ``false``         | Entities are inserted in database as soon as a request is saved.               |
|                   |                                                                                |
|                   | Setting the flag to ``false`` can have a negative impact for the MongoDB       |
|                   | performance when dealing with large volumes of logs to be saved.               |
+-------------------+--------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------------------------+
| [_DatabaseCollection_].TriggerIntervalInSeconds                                                                      |
+======================================================================================================================+
| Specifies the interval in which the entities saved in memory (queue) should be inserted in database.                 |
+----------------------------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------------------------------+
| [_DatabaseCollection_].Take                                                                                          |
+======================================================================================================================+
| Specifies how many items from queue should be processed at the specified interval of time.                           |
+----------------------------------------------------------------------------------------------------------------------+

