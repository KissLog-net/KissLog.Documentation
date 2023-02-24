Change log
===============

KissLog.Frontend 4.0.0
--------------------------

Release date: 23-02-2023

https://github.com/KissLog-net/KissLog-server/releases/tag/KissLog.Frontend-v4.0.0

The application has been rebuilt on .NET 6.0 framework.

Although the application does not introduce any breaking changes, KissLog.Frontend 4.0.0 is only compatible with KissLog.Backend 4.0.0, which contains :ref:`breaking changes <on-premises/kisslog-backend/change-log:KissLog.Backend 4.0.0>`.

**KissLog.json** changes:

.. list-table::
   :header-rows: 1

   * - Property
     -
   * - "AppVersion"
     - renamed to "StaticResourcesVersion"
   * - "InternalLogs.DirectoryPath"
     - removed
   * - "InternalLogs.MinimumStatusCode"
     - removed
   * - "Database.KissLogDbContext"
     - renamed to "Database.ConnectionString"
