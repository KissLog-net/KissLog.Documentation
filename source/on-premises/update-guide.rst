Update guide
======================

.. contents:: Table of contents
   :local:

This guide describes how to update an existing installation of KissLog on-premises.

Artifacts
-------------------------------------------------------

- KissLog.Backend.AspNetCore.zip
- KissLog.Frontend.AspNetCore.zip

Artifacts can be downloaded from `here <https://kisslog.net/Overview/OnPremises>`_.


Update steps
-------------------------------------------------------

# 1) Stop both IIS applications:

* KissLog.Backend

* KissLog.Frontend

Create backup
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# 2) Create a backup of the existing IIS application folders.

.. code-block:: none

    /Backups
    ├── KissLog.Frontend\
    └── KissLog.Backend\

Copy new files
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# 3) Delete from the **KissLog.Backend** folder everything but:

.. code-block:: none

    /KissLog.Backend
    ├── Configuration\
    ├── appsettings.json
    └── web.config

# 4) Delete from the **KissLog.Frontend** folder everything but:

.. code-block:: none

    /KissLog.Frontend
    ├── _kisslogMedia\
    ├── Configuration\
    ├── appsettings.json
    └── web.config

# 5) Extract the contents of ``KissLog.Backend.AspNetCore.zip`` to KissLog.Backend folder.

Choose **not to override** the existing files (keep the local files).

# 6) Extract the contents of ``KissLog.Frontend.AspNetCore.zip`` to KissLog.Frontend folder.

Choose **not to override** the existing files (keep the local files).

Update configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# 6) Update ``KissLog.Backend\Configuration\KissLog.json`` file.

Apply the configuration schema changes (if any).

# 7) Update ``KissLog.Frontend\Configuration\KissLog.json`` file.

Apply the configuration schema changes (if any).

# 8) Update ``KissLog.Frontend\appsettings.json`` file.

Change/increment the values for ``"AppVersion"`` and ``"HtmlMetaImagesVersion"`` settings.

This will refresh the browser cache for static resources.

.. code-block:: json
    :emphasize-lines: 6,7
    :caption: C:\\inetpub\\wwwroot\\KissLog.Frontend\\appsettings.json

    {
        "Logging": {},
        "ApplicationType": "OnPremises",
        "ConfigurationFilePath": "Configuration\\KissLog.json",
        "KissLog.License": "",
        "AppVersion": "any-new-value",
        "HtmlMetaImagesVersion": "any-new-value"
    }

Start the applications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# 9) Make a single request to KissLog.Backend root URL ("http://kisslog-backend.myapp.com")

If the startup process went successful, a ``200 OK "Running"`` response will be returned.

.. figure:: images/installation-guide/KissLogBackend-Startup.png
    :alt: KissLog.Backend Startup

# 10) Make a single request to the KissLog.Frontend root URL ("http://kisslog.myapp.com").

If the startup process went successful, you will see the home page.

.. figure:: images/installation-guide/KissLogFrontend-Startup.png
    :alt: KissLog.Frontend Startup

Troubleshooting
-------------------------------------------------------

Please follow the troubleshooting steps from the :ref:`installation guide <InstallInstructions-Troubleshooting>`.

Need help?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Open a `GitHub issue <https://github.com/KissLog-net/KissLog.Sdk/issues>`_ or send an email to catalingavan@gmail.com.
