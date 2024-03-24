logBee.Backend
=================================

.. contents:: Table of contents
   :local:

About
------------------------------

logBee.Backend application is responsible for saving and centralizing the logs and other metrics.

logBee.Backend exposes REST endpoints which can be used to save and to query the data.

.. code-block:: none
   :caption: Creating a request by consuming the REST endpoint:
    
    POST http://localhost:44088/request-logs
    {
      "organizationId": "_OrganizationId_",
      "applicationId": "_ApplicationId_",
      "startedAt": "2024-03-11T14:36:31.108Z",
      "durationInMilliseconds": 41,
      "httpProperties": {
        "absoluteUri": "http://localhost/catalog/createProduct?locale=en",
        "method": "POST",
        "response": {
          "statusCode": 200
        }
      },
      "logs": [
        {
          "logLevel": "Information",
          "message": "Creating product..."
        }
      ]
    }

.. toctree::
   :hidden:
   :maxdepth: 2
   :titlesonly:
   :includehidden:

   configuration
   change-log
