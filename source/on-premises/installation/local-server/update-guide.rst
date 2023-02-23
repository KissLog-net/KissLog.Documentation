Update guide
========================

.. contents:: Table of contents
   :local:

Artifacts
-------------------------------------------------------

- KissLog.Backend-{version}-win-x64.zip
- KissLog.Frontend-{version}-win-x64.zip

Artifacts can be downloaded from `https://github.com/KissLog-net/KissLog-server <https://github.com/KissLog-net/KissLog-server>`_.


Update steps
-------------------------------------------------------

1) Stop both IIS applications:

   * KissLog.Backend
   * KissLog.Frontend

Create backup
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

2) Create a backup of the existing IIS application folders.

   .. code-block:: none

       \Backups
       ├── KissLog.Frontend\
       └── KissLog.Backend\

Copy new files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

3) Delete from the **KissLog.Backend** folder everything but:

   .. code-block:: none

       \KissLog.Backend
       ├── Configuration\
       ├── appsettings.json
       └── web.config

4) Delete from the **KissLog.Frontend** folder everything but:

   .. code-block:: none

       \KissLog.Frontend
       ├── _kisslogMedia\
       ├── Configuration\
       ├── appsettings.json
       └── web.config

5) Extract the contents of ``KissLog.Backend.AspNetCore.zip`` to KissLog.Backend folder.

   Choose **not to override** the existing files (keep the local files).

6) Extract the contents of ``KissLog.Frontend.AspNetCore.zip`` to KissLog.Frontend folder.

   Choose **not to override** the existing files (keep the local files).

Update KissLog.Backend configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

7) Apply the configuration changes (if any) by updating KissLog.json file.

   The configuration changes will be listed in the :doc:`change log </on-premises/kisslog-backend/change-log>`.


Update KissLog.Frontend configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

8) Apply the configuration changes (if any) by updating KissLog.json file.

   The configuration changes will be listed in the :doc:`change log </on-premises/kisslog-frontend/change-log>`.

9) Change/increment the value of ``"AppVersion"`` property from ``KissLog.json`` file.

   This will refresh the browser cache for static resources.

   .. code-block:: json
       :emphasize-lines: 3
       :caption: C:\\inetpub\\wwwroot\\KissLog.Frontend\\Configuration\\KissLog.json

       {
           "ApplicationName": "KissLog",
           "AppVersion": "any-new-value"
       }

Start the applications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

10) Restart the IIS applications:

    * KissLog.Backend
    * KissLog.Frontend

11) Make a single request to KissLog.Backend root URL ("http://kisslog-backend.your_domain.com")
   
    If everything went successful, you will see the KissLog.Backend home page.
   
    .. figure:: images/installation-guide/kisslog-backend-running.png
        :alt: KissLog.Backend home page

12) Make a single request to the KissLog.Frontend root URL ("http://kisslog-frontend.your_domain.com").
   
    If the startup process went successful, you will see the home page.
   
    .. figure:: images/installation-guide/kisslog-frontend-running.png
        :alt: KissLog.Frontend home page

