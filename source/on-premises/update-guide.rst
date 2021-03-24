Update guide
======================

.. contents:: Table of contents
   :local:

This guide describes how to update an existing installation of KissLog on-premises.

Prerequisites
-------------------------------------------------------

Artifacts
~~~~~~~~~~~~~~~~~~~~~

- KissLog.Backend.AspNetCore.zip
- KissLog.Frontend.AspNetCore.zip

Artifacts can be downloaded from `here <https://kisslog.net/Overview/OnPremises>`_.


Update steps
-------------------------------------------------------

# 1) Stop both IIS applications:

* KissLog.Backend

* KissLog.Frontend

# 2) Create a backup of the existing IIS application folders

.. topic:: IIS folders backup

    .. image:: images/update-guide/folder-backups.png
        :alt: IIS folders backup

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

# 5) Extract the contents of **KissLog.Backend.AspNetCore.zip** to KissLog.Backend folder.

Choose **not to override** any of the existing files with files from the archive.

# 6) Extract the contents of **KissLog.Frontend.AspNetCore.zip** to KissLog.Frontend folder.

Choose **not to override** any of the existing files with files from the archive.

