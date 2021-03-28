Installation guide
======================

.. contents:: Table of contents
   :local:

Prerequisites
-------------------------------------------------------

Artifacts
~~~~~~~~~~~~~~~~~~~~~

- KissLog.Backend.AspNetCore.zip
- KissLog.Frontend.AspNetCore.zip

Artifacts can be downloaded from `here <https://kisslog.net/Overview/OnPremises>`_.

Services
~~~~~~~~~~~~~~~~~~~~~

- IIS Web server with `NET Core 3.1 Runtime <https://dotnet.microsoft.com/download/dotnet-core/3.1>`_ installed

- `MongoDB Community Server <https://www.mongodb.com/try/download/community>`_ (version >= 4.2.x)

- `MS-SQL Server <https://www.microsoft.com/en-us/sql-server/sql-server-downloads>`_ or `MySQL Community Server <https://dev.mysql.com/downloads/mysql/>`_


Installation
-------------------------------------------------------

MongoDB
~~~~~~~~~~~~~~~~~~~~~

For instructions installing MongoDB server, please check the `official tutorial <https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/>`_.

MS-SQL / MySql
~~~~~~~~~~~~~~~~~~~~~

We will not cover the installation guide for these services. There is a high possibility that the existing server will already have a running instance of MySQL or MS-SQL server.

IIS web applications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* On the machine hosting the IIS server, install `.NET Core 3.1 Runtime <https://dotnet.microsoft.com/download/dotnet-core/3.1>`_

* Create two IIS applications:

  * KissLog.Backend

  * KissLog.Frontend

* Update the Application Pool settings for both of the applications to the following:

+------------------------------------------------------------------------------+-----------------------------------------------------------------------------+
| KissLogFrontend                                                              | KissLog.Backend                                                             |
+==============================================================================+=============================================================================+
| .. image:: images/installation-guide/KissLogFrontend-ApplicationPool.png     | .. image:: images/installation-guide/KissLogBackend-ApplicationPool.png     |
|   :alt: KissLog.Frontend Application Pool                                    |   :alt: KissLog.Backend Application Pool                                    |
+------------------------------------------------------------------------------+-----------------------------------------------------------------------------+

* Copy into each IIS application folder the corresponding deploy package

+------------------------------------------------------------------------------+-----------------------------------------------------------------------------+
| KissLogFrontend                                                              | KissLog.Backend                                                             |
+==============================================================================+=============================================================================+
| Example: C:\\inetpub\\wwwroot\\KissLog.Frontend                              | Example: C:\\inetpub\\wwwroot\\KissLog.Backend                              |
|                                                                              |                                                                             |
| .. image:: images/installation-guide/KissLogFrontend-Folder.png              | .. image:: images/installation-guide/KissLogBackend-Folder.png              |
|   :alt: KissLog.Frontend Application Pool                                    |   :alt: KissLog.Backend Application Pool                                    |
+------------------------------------------------------------------------------+-----------------------------------------------------------------------------+

Configuration
-------------------------------------------------------

After the initial deployment, you need to update the mandatory configuration options.

The configuration file for each application is located under ``.\Configuration\KissLog.json``.

KissLog.Backend 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

C:\\inetpub\\wwwroot\\KissLog.Backend\\Configuration\\KissLog.json

Replace the following mandatory properties with corresponding values:

.. code-block:: json

    {
        "KissLogBackendUrl": "http://my.kisslog-backend.com",
        "KissLogFrontendUrl": "http://my.kisslog-frontend.com",
        "Database": {
            "Provider": "MongoDb",
            "MongoDb": {
                "ConnectionString": "mongodb://localhost:27017",
                "DatabaseName": "KissLog"
            },
            "AzureCosmosDb": {
                "AccountEndpoint": "https://my-cosmosdb.documents.azure.com:443/",
                "AccountKey": "A889wNrmGpCmScnZcVr2SprEUHCvUz74rVZgeYyXQyGt9PPW2NBNDwpJauXdmAEUZtdHJ4MVjVM92T5kNg53VB==",
                "DatabaseName": "KissLog"
            }
        }
    }

+----------------------------------------------+-------------------------------------------------------------+
| Description                                                                                                |
+==============================================+=============================================================+
| KissLogBackendUrl                            | Root url pointing to KissLog.Backend application            |
+----------------------------------------------+-------------------------------------------------------------+
| KissLogFrontendUrl                           | Root url pointing to KissLog.Frontend application           |
+----------------------------------------------+-------------------------------------------------------------+
| Database.Provider                            | Possible values: **MongoDb**, **AzureCosmosDb**             |
+----------------------------------------------+-------------------------------------------------------------+
| Database.MongoDb { }                         | Required if Database.Provider = MongoDb                     |
+----------------------------------------------+-------------------------------------------------------------+
| Database.AzureCosmosDb { }                   | Required if Database.Provider = AzureCosmosDb               |
+----------------------------------------------+-------------------------------------------------------------+

KissLog.Frontend 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

C:\\inetpub\\wwwroot\\KissLog.Frontend\\Configuration\\KissLog.json

Replace the following mandatory properties with corresponding values:

.. code-block:: json

    {
        "KissLogBackendUrl": "http://my.kisslog-backend.com",
        "KissLogFrontendUrl": "http://my.kisslog-frontend.com",
        "Database": {
            "Provider": "SqlServer",
            "KissLogDbContext": "Data Source=192.168.16.11;Initial Catalog=KissLog_Frontend;UID={_username_};PWD={_password_};"
        }
    }

+----------------------------------------------+-------------------------------------------------------------+
| Description                                                                                                |
+==============================================+=============================================================+
| KissLogBackendUrl                            | Root url pointing to KissLog.Backend application            |
+----------------------------------------------+-------------------------------------------------------------+
| KissLogFrontendUrl                           | Root url pointing to KissLog.Frontend application           |
+----------------------------------------------+-------------------------------------------------------------+
| Database.Provider                            | Possible values: **SqlServer**, **MySql**                   |
+----------------------------------------------+-------------------------------------------------------------+
| Database.KissLogDbContext                    | Database (entity framework) connection string               |
+----------------------------------------------+-------------------------------------------------------------+


Initial startup
-------------------------------------------------------

After updating the configuration files, you can run the applications.

The initial startup  will bootstrap all the necessary components including MongoDB and SQL databases.

Startup logs (including errors) will be generated under ``.\Logs`` folder:

* ``C:\inetpub\wwwroot\KissLog.Backend\Logs\``

* ``C:\inetpub\wwwroot\KissLog.Frontend\Logs\``

Startup steps 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# 1) Make a single request to KissLog.Backend root URL ("http://kisslog-backend.myapp.com")

If the startup process went successful, a ``200 OK "Running"`` response will be returned.

.. figure:: images/installation-guide/KissLogBackend-Startup.png
    :alt: KissLog.Backend Startup

# 2) Make a single request to the KissLog.Frontend root URL ("http://kisslog.myapp.com").

If the startup process went successful, you will see the home page.

.. figure:: images/installation-guide/KissLogFrontend-Startup.png
    :alt: KissLog.Frontend Startup

.. figure:: images/installation-guide/KissLogFrontend-Login.png
    :alt: KissLog.Frontend Login

.. code-block:: none
    :caption: Login JWT Token

    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGV2ZWxvcGVyIn0.DWgMpOWPCT-4idapOIeWtQ8On8wT0_RdkyOYcIq9DoE

.. _InstallInstructions-Troubleshooting:

Troubleshooting
-------------------------------------------------------

Startup logs (including errors) will be available under ``.\Logs`` folder. Here should be the first place to check.

* ``C:\inetpub\wwwroot\KissLog.Backend\Logs\``

* ``C:\inetpub\wwwroot\KissLog.Frontend\Logs\``

Quick checklist
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# 1) Make sure you deploy and run KissLog.Backend first

# 2) If there are any confiuguration errors, you should see them under the ``\Logs`` folder.

# 3) KissLog.Backend will try to connect to MongoDB. If the MongoDB server is not reachable, you should see an error:

.. code-block:: none
    :caption: C:\\inetpub\\wwwroot\\KissLog.Backend\\Logs\\21-03-2021.log

    KissLog.Backend startup failed
    DatabaseName: KissLogBackend
    Exception: A timeout occured after 30000ms selecting a server using CompositeServerSelector{ Selectors = MongoDB.Driver.MongoClient+AreSessionsSupportedServerSelector, LatencyLimitingServerSelector{ AllowedLatencyRange = 00:00:00.0150000 } }. Client view of cluster state is { ClusterId : "1", ConnectionMode : "Automatic", Type : "Unknown", State : "Disconnected", Servers : [{ ServerId: "{ ClusterId : 1, EndPoint : "Unspecified/localhost3:27017" }", EndPoint: "Unspecified/localhost:27017", ReasonChanged: "Heartbeat", State: "Disconnected", ServerVersion: , TopologyVersion: , Type: "Unknown", HeartbeatException: "MongoDB.Driver.MongoConnectionException: An exception occurred while opening a connection to the server.
    ---> System.Net.Sockets.SocketException (11001): No such host is known.

# 4) KissLog.Frontend will try to connect to MS-SQL / MySql server.

On the first run, KissLog.Frontend will also create the database (if not already exists).

Any database errors, such as connection errors or database permissions, will be saved under the ``\Logs`` folder.

**Important:**

If the SQL user does not have permissions to create the database, you will have to create it manually.

The database generation script will be created under: ``C:\inetpub\wwwroot\KissLog.Frontend\Logs\CreateDatabaseScript.txt``

# 5) KissLog applications (KissLog.Frontend and KissLog.Backend) connect to each other using HTTP requests.

Make sure there is no firewall blocking the connection.

# 6) If the application fails to start and there are no log messages, **enable IIS logs**:

Update ``web.config``, set ``<aspNetCore stdoutLogEnabled="true" />``, then restart the application.

**Important:**

Create an empty ``\Logs`` folder if one does not already exist.

``C:\inetpub\wwwroot\KissLog.Backend\Logs``


Need help?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Open a `GitHub issue <https://github.com/KissLog-net/KissLog.Sdk/issues>`_ or send an email to catalingavan@gmail.com.
