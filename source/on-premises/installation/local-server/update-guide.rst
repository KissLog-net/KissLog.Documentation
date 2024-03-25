Update guide
========================

.. contents:: Table of contents
   :local:

Artifacts
-------------------------------------------------------

- logBee.Backend-{version}-win-x64.zip
- logBee.Frontend-{version}-win-x64.zip

Artifacts can be downloaded from `https://github.com/KissLog-net/KissLog-server <https://github.com/KissLog-net/KissLog-server>`_.


Update steps
-------------------------------------------------------

1) Stop both IIS applications:

   * logBee.Backend
   * logBee.Frontend

Create backup
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

2) Create a backup of the existing IIS application folders.

   .. code-block:: none

       \Backups
       ├── logBee.Frontend\
       └── logBee.Backend\

Copy new files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

3) Delete from the **logBee.Backend** folder everything but:

   .. code-block:: none

       \logBee.Backend
       ├── Configuration\
       ├── appsettings.json
       └── web.config

4) Delete from the **logBee.Frontend** folder everything but:

   .. code-block:: none

       \logBee.Frontend
       ├── Configuration\
       ├── appsettings.json
       └── web.config

5) Extract the contents of ``logBee.Backend.AspNetCore.zip`` to logBee.Backend folder.

   Choose **not to override** the existing files (keep the local files).

6) Extract the contents of ``logBee.Frontend.AspNetCore.zip`` to logBee.Frontend folder.

   Choose **not to override** the existing files (keep the local files).

Update logBee.Backend configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

7) Apply the configuration changes (if any) by updating logBee.json file.

   The configuration changes will be listed in the :doc:`change log </on-premises/logBee-backend/change-log>`.


Update logBee.Frontend configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

8) Apply the configuration changes (if any) by updating logBee.json file.

   The configuration changes will be listed in the :doc:`change log </on-premises/logBee-frontend/change-log>`.

9) Change/increment the value of ``"StaticResourcesVersion"`` property from ``logBee.json`` file.

   This will refresh the browser cache for static resources.

   .. code-block:: json
       :emphasize-lines: 3
       :caption: C:\\inetpub\\wwwroot\\logBee.Frontend\\Configuration\\logBee.json

       {
           "KissLogFrontendDomain": "logBee.dev",
           "StaticResourcesVersion": "any-new-value"
       }

Start the applications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

10) Restart the IIS applications:

    * logBee.Backend
    * logBee.Frontend

11) Make a single request to logBee.Backend root URL (http://logBee-backend.your_domain.com).
   
    If everything went successful, you will see the logBee.Backend home page.
   
    .. figure:: images/installation-guide/logBee.Backend-running.png
        :alt: logBee.Backend home page

12) Make a single request to the logBee.Frontend root URL (http://logBee-frontend.your_domain.com).
   
    If the startup process went successful, you will see the home page.
   
    .. figure:: images/installation-guide/logBee.Frontend-running.png
        :alt: logBee.Frontend home page

