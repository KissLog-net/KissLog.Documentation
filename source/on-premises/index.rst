KissLog on-premises
======================

KissLog server can be installed on-premises.

Hosting KissLog server locally, all the logs will be stored and accessible only from within your in-house servers.

Artifacts
------------------------

- KissLog.Backend-v{version}-{platform}.zip
- KissLog.Frontend-v{version}-{platform}.zip

Artifacts can be downloaded from `https://github.com/KissLog-net/KissLog-server/releases <https://github.com/KissLog-net/KissLog-server/releases>`_.

Installation prerequisites
------------------------------

.. list-table::
   :header-rows: 1

   * - Local server
     - Azure hosting
     - Run as Docker container
   * - * IIS Web server with `ASP.NET Core Runtime 6 <https://dotnet.microsoft.com/en-us/download/dotnet/6.0>`_ installed
       * `MongoDB Community Server <https://www.mongodb.com/try/download/community>`_ (version >= 6.0.x)
       * `MS-SQL Server <https://www.microsoft.com/en-us/sql-server/sql-server-downloads>`_ or `MySQL Community Server <https://dev.mysql.com/downloads/mysql/>`_
     - * SQL Database
       * Azure Cosmos DB
       * Storage account
       * 2x App Services
       
     - `Docker Engine <https://docs.docker.com/engine/>`_
   

Arhitecture
------------------------

KissLog Backend
~~~~~~~~~~~~~~~~~~~~~~~~

KissLog.Backend is the application responsible for saving the logs, exceptions and all other data aggregates.

Consumer applications (the applications you develop) are sending the logs to KissLog.Backend using HTTP requests.

KissLog Frontend
~~~~~~~~~~~~~~~~~~~~~~~~

KissLog.Frontend represents the user-interface application where users (developers, business analysts, QA testers, application managers) can visualize the captured logs, exceptions and other metrics data.

.. figure:: images/kissLog-architecture.png
    :alt: KissLog arhitecture

Table of Contents
------------------

.. toctree::
   :maxdepth: 2
   :titlesonly:
   :includehidden:

   installation/index
   kisslog-frontend/index
   kisslog-backend/index

