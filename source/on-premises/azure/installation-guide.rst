Installation guide
=============================

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

- 1x Azure SQL Database
- 1x Azure Cosmos DB
- 1x Azure Storage account
- 2x Azure App Services

Installation
-------------------------------------------------------

Azure SQL Database
~~~~~~~~~~~~~~~~~~~~~

KissLog server does not use SQL intensively. The Basic or Standard tiers should be enough to start with. If necessary, you can always upgrade it later.

If you already have an SQL server, you can skip this step.

1. Create SQL Database Server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Most of the properties remain as default. We will mention the important changes.

.. list-table::
   :header-rows: 1

   * - Basics
     - 
   * - Server name
     - *<any value>*
   * - Location
     - (Europe) West Europe *<or any appropriate value>*
   * - Authentication method
     - Use SQL authentication
   * - Server admin login / Password
     - *<any value>*

.. list-table::
   :header-rows: 1

   * - Networking
     - 
   * - Allow Azure services and resources to access this server
     - No

.. figure:: images/installation-guide/sql-server-ReviewAndCreate.png
    :alt: Create SQL Database Server

2. Create SQL Database
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Most of the properties remain as default. We will mention the important changes. Most of these settings can always be updated later.

.. list-table::
   :header-rows: 1

   * - Basics
     - 
   * - Database name
     - kisslog-frontend *(or any value)*
   * - Server
     - *<the server created at the previous step>*
   * - Want to use SQL elastic pool?
     - No
   * - Workload environment
     - Production
   * - Compute + storage
     - Basic, 1 GB storage

.. figure:: images/installation-guide/sql-database-ReviewAndCreate.png
    :alt: Create SQL Database

Azure Cosmos DB
~~~~~~~~~~~~~~~~~~~~~

KissLog server uses Azure Cosmos DB very intensively. The minimum throughtput used by the KissLog server (calculated in RU/s) highly depends on the frequency and volume of data you save.

The cost of the Azure Cosmos DB service is influenced by the throughtput (RU/s) and by the number of replicas used.

To get started, we will use a single-region `Azure Cosmos DB free tier account <https://learn.microsoft.com/en-us/azure/cosmos-db/free-tier>`_ which covers for free a maximum of 1000 RU/s.

1. Create an Azure Cosmos DB account
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Select **Azure Cosmos DB for NoSQL**.

.. list-table::
   :header-rows: 1

   * - Basics
     - 
   * - Account Name
     - kisslog-database-nosql *(or any value)*
   * - Location
     - (Europe) West Europe *<or any appropriate value>*
   * - Capacity mode
     - Provisioned throughput
   * - Apply Free Tier Discount
     - Apply
   * - Limit total account throughput
     - Checked

.. list-table::
   :header-rows: 1

   * - Global Distribution
     - 
   * - Geo-Redundancy
     - Disable
   * - Multi-region Writes
     - Disable
   * - Availability Zones
     - Disable

.. list-table::
   :header-rows: 1

   * - Networking
     - 
   * - Connectivity method
     - All networks

.. list-table::
   :header-rows: 1

   * - Backup Policy
     - 
   * - Backup policy
     - Continuous (7 days) *(available for free)*

.. list-table::
   :header-rows: 1

   * - Encryption
     - 
   * - Data Encryption
     - Service-managed key

.. figure:: images/installation-guide/cosmos-db-ReviewAndCreate.png
    :alt: Create SQL Database

2. Create new Database
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

KissLog server creates all the tables automatically. However, the Azure Cosmos DB Database must be manually created.

