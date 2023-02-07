KissLog.Frontend
=================================

.. contents:: Table of contents
   :local:

About
------------------------------

KissLog.Frontend is a user-interface application used by developers to visualize the captured errors, logs and other metrics data.

KissLog.Frontend is generating the user-interface by consuming KissLog.Backend REST endpoints.

.. figure:: images/kisslog-frontend-architecture.png
    :alt: KissLog.Frontend arhitecture

    KissLog.Frontend arhitecture

Authentication
------------------------------

KissLog.Frontend uses a JSON Web Token (JWT) for authentication.

The authentication JWT must be signed with the secret provided under ``Authorization\HS256Secret`` property from the ``Configuration\KissLog.json`` file. 

.. figure:: images/generating-authentication-jwt.png
    :alt: Generating authentication JWT

.. figure:: images/kisslog-frontend-login.png
    :alt: KissLog.Frontend login page

Related resources
------------------

.. toctree::
   :maxdepth: 2
   :titlesonly:
   :includehidden:

   configuration
   change-log