KissLog on-premises
======================

KissLog can be installed on-premises.

Using KissLog on-premises, all the data will be stored and accessible only from within your in-house servers.


Prerequisites
------------------------

KissLog can be hosted on both Local server and on Azure cloud.

Server hosting
~~~~~~~~~~~~~~~~~~~~~~

- IIS Web server with `ASP.NET Core 3.1 Hosting Bundle <https://dotnet.microsoft.com/download/dotnet-core/3.1>`_ installed

- `MongoDB Community Server <https://www.mongodb.com/try/download/community>`_

- `MS-SQL Server <https://www.microsoft.com/en-us/sql-server/sql-server-downloads>`_ or `MySQL Community Server <https://dev.mysql.com/downloads/mysql/>`_

Azure hosting
~~~~~~~~~~~~~~~~~~~~~~

- 2x App Service

- 1x Azure Cosmos DB database (1400 RU/s shared throughput)

- 1x SQL database

Download
-----------------------

Latest version of KissLog server can be downloaded from `here <https://kisslog.net/Overview/OnPremises>`_.

Arhitecture
------------------------

KissLog on-premises consists of two .NET Core 3.1 web applications.

**KissLog.Frontend**

User-interface application used by users (developers, IT administrators, application managers and implementation consultants) to visualise the captured errors, logs and other metrics data.

**KissLog.Backend**

Backend application responsible for managing the logs data. Exposes REST endpoints which can be used to save and to query the logs.

.. topic:: KissLog arhitecture

    .. figure:: images/kissLog-architecture.png
        :alt: KissLog arhitecture
        :align: center


.. topic:: KissLog network

    .. figure:: images/kissLog-network.png
        :alt: KissLog network
        :align: center
