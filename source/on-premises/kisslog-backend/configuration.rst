Configuration
=================================

KissLog.Backend configuration is achieved by updating the ``KissLog.Backend\Configuration\KissLog.json`` file.

.. contents:: Configuration options
   :local:

IsReadOnlyMode
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If ``true``, sets the application in read-only mode and no incoming logs will be saved in database.

.. code-block:: json
    
    {
        "IsReadOnlyMode": false
    }

InternalLogs.DirectoryPath
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Specifies the location of the internal logs folder. Path can be either relative or absolute.

.. code-block:: json
    
    {
        "InternalLogs.DirectoryPath": "Logs"
    }

InternalLogs.MinimumStatusCode
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Specifies the minimum http status code for the requests which should be saved to internal logs.

.. code-block:: json
    
    {
        "InternalLogs.MinimumStatusCode": "400"
    }

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

+------------------------+-------------------------------------------------------------+
| Database.Provider                                                                    |
+========================+=============================================================+
| ``"MongoDb"``          | Sets the database provider to MongoDB                       |
+------------------------+-------------------------------------------------------------+
| ``"AzureCosmosDb"``    | Sets the database provider to Azure CosmosDB                |
+------------------------+-------------------------------------------------------------+

+------------------------+-------------------------------------------------------------+
| Database.MongoDb                                                                     |
+========================+=============================================================+
| Required               | true when ``Database.Provider = "MongoDb"``                 |
+------------------------+-------------------------------------------------------------+

+------------------------+-------------------------------------------------------------+
| Database.AzureCosmosDb                                                               |
+========================+=============================================================+
| Required               | true when ``Database.Provider = "AzureCosmosDb"``           |
+------------------------+-------------------------------------------------------------+

.. _Backend_Configuration_MongoDb:

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

.. _Backend_Configuration_AzureCosmosDb:

AzureCosmosDb
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configuration used to connect to Azure CosmosDB service.

.. code-block:: json
    
    {
        "Database": {
            "AzureCosmosDb": {
                "AccountEndpoint": "https://my-cosmosdb.documents.azure.com:443/",
                "AccountKey": "A889wNrmGpCmScnZcVr2SprEU2NBNDwpJauXdmAEUZtdHJ4MVjVM92T5kNg53VB==",
                "DatabaseName": "KissLogDatabase"
            },
        }
    }


CreateRequestLog
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "CreateRequestLog": {
            "SaveInputStreamAsFileIfLengthGte": 5000,
            "TokenizeUrl": {},
            "Throttle": {},
            "Obfuscate": {},
            "Truncate": {}
        }
    }

+----------------------------------------------------------------------------------------------+
| CreateRequestLog.SaveInputStreamAsFileIfLengthGte                                            |
+==============================================================================================+
| If Request.InputStream content exceeds the length defined here,                              |
| the value will be saved as a blob file.                                                      |
|                                                                                              |
| This helps prevent creating too large database objects.                                      |
+----------------------------------------------------------------------------------------------+

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

Obfuscate
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: json
    
    {
        "CreateRequestLog": {
            "Obfuscate": {
                "IsEnabled": true,
                "Placeholder": "***obfuscated***",
                "Patterns": [ "(?si)pass" ]
            }
        }
    }

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

UploadRequestLogFiles
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "UploadRequestLogFiles": {
            "IsEnabled": true,
            "MaximumFileSizeInBytes": 2097152,
            "Provider": "MongoDbGridFS",
            "Throttle": {},
            "AzureBlobStorage": {}
        }
    }

+------------------------+-------------------------------------------------------------+
| UploadRequestLogFiles.IsEnabled                                                      |
+========================+=============================================================+
| ``true``               | File storage functionality is enabled                       |
+------------------------+-------------------------------------------------------------+
| ``false``              | File storage functionality is disabled                      |
+------------------------+-------------------------------------------------------------+


+--------------------------------------------------------------------------------------+
| UploadRequestLogFiles.MaximumFileSizeInBytes                                         |
+======================================================================================+
| Specifies the maximum file size (in bytes) which can be uploaded.                    |
+--------------------------------------------------------------------------------------+


+------------------------+-------------------------------------------------------------+
| UploadRequestLogFiles.Provider                                                       |
+========================+=============================================================+
| Required               | true when ``UploadRequestLogFiles.IsEnabled = true``        |
+------------------------+-------------------------------------------------------------+
| **Values**                                                                           |
+------------------------+-------------------------------------------------------------+
| ``"MongoDbGridFS"``    | Sets the file storage provider to MongoDB                   |
+------------------------+-------------------------------------------------------------+
| ``"AzureBlobStorage"`` | Sets the file storage provider to Azure Storage Container   |
+------------------------+-------------------------------------------------------------+


+------------------------+----------------------------------------------------------------------+
| UploadRequestLogFiles.AzureBlobStorage                                                        |
+========================+======================================================================+
| Required               | true when ``UploadRequestLogFiles.Provider = "AzureBlobStorage"``    |
+------------------------+----------------------------------------------------------------------+


AzureBlobStorage
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configuration used to connect to Azure Storage account.

.. code-block:: json
    
    {
        "UploadRequestLogFiles": {
            "AzureBlobStorage": {
                "ConnectionString": "DefaultEndpointsProtocol=https;AccountName=myfilesstorage;AccountKey=A889wNrmGpz74rT5kNg53VB==;EndpointSuffix=core.windows.net"
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

