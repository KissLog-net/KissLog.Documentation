KissLog on-premises
======================

*in progress...*

Arhitecture
------------------------

KissLog on-premises consists of two .NET Core 2.0 web applications.

KissLog.Frontend
~~~~~~~~~~~~~~~~~~~~~~

User-interface application used by users (developers, IT administrators, application managers
and implementation consultants) to visualise the captured errors, logs and other metrics data.

KissLog.Backend
~~~~~~~~~~~~~~~~~~~~~~

Backend application responsible for managing the logs data. Exposes REST endpoints which
can be used to save and to query the logs.

.. figure:: images/kissLog-architecture.png
   :alt: KissLog arhitecture
   :align: center

   KissLog arhitecture

.. figure:: images/kissLog-network.png
   :alt: KissLog network
   :align: center

   KissLog network

