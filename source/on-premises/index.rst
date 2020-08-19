KissLog on-premises
======================

KissLog can be installed on-premises.

Using KissLog on-premises, all the data will be stored and accessible only from within your in-house servers.

Deployment packages
------------------------

KissLog on-premises consists of two .NET Core 3.1 web applications:

- :doc:`KissLog.Frontend <kisslog-frontend/index>`

- :doc:`KissLog.Backend <kisslog-backend/index>`

Latest version of KissLog deployment package can be downloaded from `here <https://kisslog.net/Overview/OnPremises>`_.

Prerequisites
------------------------

KissLog can be hosted on both local server and on Azure cloud.

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

Arhitecture
------------------------

.. topic:: KissLog arhitecture

    .. figure:: images/kissLog-architecture.png
        :alt: KissLog arhitecture
        :align: center


.. topic:: KissLog network

    .. figure:: images/kissLog-network.png
        :alt: KissLog network
        :align: center

.. toctree::
   :maxdepth: 2
   :hidden:
   :titlesonly:
   :includehidden:

   kisslog-frontend/index
   kisslog-backend/index

