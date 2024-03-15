KissLog on-premises
======================

KissLog server can be installed on-premises.

Hosting KissLog server locally, all the logs will be stored and accessible only from within your in-house servers.

Artifacts
------------------------

- KissLog.Backend-{version}-{platform}.zip
- KissLog.Frontend-{version}-{platform}.zip

Artifacts can be downloaded from `https://github.com/KissLog-net/KissLog-server <https://github.com/KissLog-net/KissLog-server>`_.

Installation prerequisites
------------------------------

Local server
~~~~~~~~~~~~~~~~~~~~~~~~

- IIS Web server with `ASP.NET Core Runtime 6 <https://dotnet.microsoft.com/en-us/download/dotnet/6.0>`_ installed
- `MongoDB Community Server <https://www.mongodb.com/try/download/community>`_ (version >= 6.0.x)

Microsoft Azure
~~~~~~~~~~~~~~~~~~~~~~~~

- SQL Database
- Azure Cosmos DB
- Storage account
- 2x App Services

Docker
~~~~~~~~~~~~~~~~~~~~~~~~

- `Docker Engine <https://docs.docker.com/engine/>`_


.. toctree::
   :hidden: 
   :maxdepth: 2
   :titlesonly:
   :includehidden:

   installation/index
   kisslog-frontend/index
   kisslog-backend/index

