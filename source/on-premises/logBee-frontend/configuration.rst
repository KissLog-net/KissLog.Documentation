Configuration
=================================

logBee.Frontend behavior can be customized by updating the ``Configuration\logBee.json`` file.

A full example of the ``logBee.json`` configuration file can be found `here <https://github.com/KissLog-net/KissLog-server/blob/main/KissLog.Frontend/KissLog.json>`_.

.. contents:: Configuration options
   :local:

KissLogFrontendDomain
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The domain of the KissLog.Frontend application. This value is used in multiple places:

- when generating the HTML titles
- when sending alert emails, as the sender value (``support@kisslog.dev``)
- sets the default email domain for the authenticated users (``user1@kisslog.dev``).

.. code-block:: json
    
    {
        "KissLogFrontendDomain": "kisslog.dev"
    }

StaticResourcesVersion
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Property used as query string parameter when loading static resources (css/javascript).

This property should be changed after an application update in order to invalidate the static files cache.

.. code-block:: json
    
    {
        "StaticResourcesVersion": "1.0.0"
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

KissLogBackend.BasicAuth.Password
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Basic HTTP authentication scheme password used to connect to KissLog.Backend application.

This property should have the same value as the same property from ``KissLog.Backend\Configuration\KissLog.json``.

.. code-block:: json
    
    {
        "KissLogBackend.BasicAuth.Password": "_KissLogBackend_authorization_password_"
    }

KissLogFrontend.BasicAuth.Password
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Basic HTTP authentication scheme password used to connect to KissLog.KissLogFrontend application.

.. code-block:: json
    
    {
        "KissLogFrontend.BasicAuth.Password": "_KissLogFrontend_authorization_password_"
    }

KissLog.License
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The KissLog on-premises license key. Can be null.

.. code-block:: json
    
    {
        "KissLog.License": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMaWNlbnNlSWQiOiIzNTczMDI1My00NGRhLTRiZmMtOGQ0MS1iMzUzMDRkZWUyMzciLCJMaWNlbnNlVHlwZSI6IkVudGVycHJpc2UifQ.K4htH3YOulrpVrkTJuHza81VrYloYvTsfRYzb4fpUYI"
    }


Database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "Database": {
            "Provider": "MongoDb",
            "MongoDb": {},
            "MySql": {},
            "SqlServer": {}
        }
    }

.. list-table::
   :header-rows: 1

   * - Database.Provider
     - 
   * - MongoDb
     - Sets the database provider to MongoDb.
   * - MySql
     - Sets the database provider to MySql.
   * - SqlServer
     - Sets the database provider to MS-SQL.

.. list-table::
   :header-rows: 1

   * - Database.MongoDb
   * - Required when "Database.MongoDb" is "MongoDb".

.. list-table::
   :header-rows: 1

   * - Database.MySql
   * - Required when "Database.Provider" is "MySql".

.. list-table::
   :header-rows: 1

   * - Database.SqlServer
   * - Required when "Database.Provider" is "SqlServer".

Database.MongoDb
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configuration used to connect to MongoDb database.

.. code-block:: json
    
    {
        "Database": {
            "MongoDb": {
                "ConnectionString": "mongodb://localhost:27017?socketTimeoutMS=5000&connectTimeoutMS=5000",
                "DatabaseName": "KissLogFrontend"
            }
        }
    }

Database.MySql
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configuration used to connect to MySql database.

.. code-block:: json
    
    {
        "Database": {
            "MySql": {
                "ConnectionString": "server=localhost;port=3306;database=KissLogFrontend;uid=<replace_user>;password=<replace_password>;Charset=utf8;"
            }
        }
    }

Database.SqlServer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configuration used to connect to MS-SQL database.

.. code-block:: json
    
    {
        "Database": {
            "SqlServer": {
                "ConnectionString": "Server=localhost;Database=KissLogFrontend;User ID=<replace_user>;Password=<replace_password>;TrustServerCertificate=True;"
            }
        }
    }

Smtp
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

SMTP configuration used for sending automated emails (alert notifications).

.. code-block:: json
    
    {
        "Smtp": {
            "Host": "smtp.sendgrid.net",
            "Port": 587,
            "UserName": "",
            "Password": "",
            "EnableSsl": false
        }
    }

UserInterface
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "UserInterface": {
            "NumberOfApplicationsToPreloadOnTheDashboardPage": 6
        }
    }

.. list-table::
   :header-rows: 1

   * - UserInterface.NumberOfApplicationsToPreloadOnTheDashboardPage
   * - Specifies how many applications should be preloaded under the ``/Dashboard`` page.

Authorization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "Authorization": {
            "HS256Secret": "00000000-0000-0000-0000-000000000000-00000000-0000-0000-0000-000000000000",
            "AzureActiveDirectory": {}
        }
    }

.. list-table::
   :header-rows: 1

   * - Authorization.HS256Secret
   * - Represents the signature key of the authentication JSON Web Token (JWT).
       
       The authentication JWT must be signed with the secret provided in this property.

       More details about authentication can be found :ref:`here <on-premises/kisslog-frontend/index:authentication>`.

Authorization.AzureActiveDirectory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Optional configuration used to set up Azure Active Directory authentication.

More details can be found :ref:`here <on-premises/kisslog-frontend/index:Azure Active Directory>`.

.. code-block:: json
    
    {
        "Authorization": {
            "AzureActiveDirectory": {
                "ClientId": "<AD Application (client) ID>",
                "ClientSecret": "<secret>",
                "Authority": "https://login.microsoftonline.com/<AD Directory (tenant) ID>/v2.0/"
            }
        }
    }