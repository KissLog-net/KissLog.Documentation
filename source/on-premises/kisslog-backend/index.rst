KissLog Backend
======================

KissLog.Backend is the application responsible for managing logs, exceptions and all other data aggregates.

KissLog.Backend exposes REST endpoints used for storing and querying the data.

External .NET applications are using KissLog SDK to send the logs to KissLog.Backend.

- :doc:`Configuration options <configuration>`

.. topic:: KissLog.Backend arhitecture

    .. image:: ../images/KissLog.Backend-arhitecture.png
        :alt: KissLog.Backend arhitecture

.. toctree::
   :maxdepth: 2
   :hidden:
   :titlesonly:
   :includehidden:

   configuration
   