KissLog.Frontend
=================================

Configuration
--------------------

KissLog.Frontend configuration is achieved by updating the ``KissLog.Frontend\Configuration\KissLog.json``.

.. contents:: Configuration options
   :local:

ApplicationName
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Display name of the KissLog instance - used when generating HTML titles.

.. code-block:: json
    
    {
        "ApplicationName": "My logging app"
    }

AppVersion
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ToDo

.. code-block:: json
    
    {
        "AppVersion": "1.0.0"
    }

InternalLogs.DirectoryPath
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ToDo

.. code-block:: json
    
    {
        "InternalLogs.DirectoryPath": "Logs"
    }

InternalLogs.MinimumStatusCode
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ToDo

.. code-block:: json
    
    {
        "InternalLogs.MinimumStatusCode": "400"
    }

KissLogBackend.BasicAuth.Password
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ToDo

.. code-block:: json
    
    {
        "KissLogBackend.BasicAuth.Password": "_This_Password_Should_Be_Replaced_"
    }

KissLog.License
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ToDo

.. code-block:: json
    
    {
        "KissLog.License": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMaWNlbnNlSWQiOiIzNTczMDI1My00NGRhLTRiZmMtOGQ0MS1iMzUzMDRkZWUyMzciLCJMaWNlbnNlVHlwZSI6IkVudGVycHJpc2UifQ.K4htH3YOulrpVrkTJuHza81VrYloYvTsfRYzb4fpUYI"
    }

KissLogBackendUrl
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "KissLogBackendUrl": "http://kisslog-backend.myapp.com/"
    }

KissLogFrontendUrl
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "KissLogFrontendUrl": "http://kisslog.myapp.com/"
    }

MediaDirectoryPath
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ToDo

.. code-block:: json
    
    {
        "MediaDirectoryPath": ""
    }

Database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "Database": {
            "Provider": "SqlServer",
            "KissLogDbContext": "Data Source=192.168.16.11;Initial Catalog=KissLog;UID=user;PWD=pass;"
        }
    }

+------------------------+-------------------------------------------------------------+
| Database.Provider                                                                    |
+========================+=============================================================+
| **Values**                                                                           |
+------------------------+-------------------------------------------------------------+
| ``"SqlServer"``        | Sets the database provider to MS-SQL                        |
+------------------------+-------------------------------------------------------------+
| ``"MySql"``            | Sets the database provider to MySql                         |
+------------------------+-------------------------------------------------------------+

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Database.KissLogDbContext                                                                                                                                       |
+=================================================================================================================================================================+
| Database connection string                                                                                                                                      |
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Example**                                                                                                                                                     |
+-----------------------------------------------------+-----------------------------------------------------------------------------------------------------------+
| ``Database.Provider = "SqlServer"``                 | "Data Source=192.168.16.11;Initial Catalog=KissLog;UID=user;PWD=pass;"                                    |
+-----------------------------------------------------+-----------------------------------------------------------------------------------------------------------+
| ``Database.Provider = "MySql"``                     | "server=192.168.16.11;port=3306;database=KissLog;uid=root;password=pass;Charset=utf8;"                    |
+-----------------------------------------------------+-----------------------------------------------------------------------------------------------------------+

Authorization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "Authorization": {
            "DefaultEmailDomain": "myapp.com",
            "HS256Secret": "J6UVNS3EKG46O1S1OVJ59OZ8DH3KEP",
            "SessionCookie": { }
        }
    }

+----------------------------------------------------------------------------------------------+
| Authorization.DefaultEmailDomain                                                             |
+==============================================================================================+
| Sets the default email domain for the authenticated users.                                   |
|                                                                                              |
| For example, ``darcy`` user will be displayed in the user-interface as ``darcy@myapp.com``.  |
+----------------------------------------------------------------------------------------------+

+---------------------------------------------------------------------------------------------------------------+
| Authorization.HS256Secret                                                                                     |
+===============================================================================================================+
| Represents the authentication JWT signature key.                                                              |
|                                                                                                               |
| In order to authenticate to this KissLog application, the user must provide a JWT token which                 |
| has been signed with the same key (HS256Secret) that has been specified here.                                 |
|                                                                                                               |
| The authentication JWT can be created programmatically or online using https://jwt.io/.                       |
+---------------------------------------------------------------------------------------------------------------+
| **Authentication JWT example**                                                                                |
+---------------------------------------------------------------------------------------------------------------+
| ``eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFyY3kifQ.ZXPw1NjoNFrJ1DrBljTOsZcjYRFQ4qMsS15i2TuIgFM``   |
+---------------------------------------------------------------------------------------------------------------+

SessionCookie
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: json
    
    {
        "Authorization": {
            "SessionCookie": {
                "IsPersistentFixedValue": null,
                "ExpireInMinutes": 10080
            }
        }
    }

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| SessionCookie.IsPersistentFixedValue                                                                                                                            |
+=================================================================================================================================================================+
| **Values**                                                                                                                                                      |
+-------------------+---------------------------------------------------------------------------------------------------------------------------------------------+
| ``null``          | Allows the user to specify, at login page, if he/she wants to create a persistent cookie or not.                                            |
+-------------------+---------------------------------------------------------------------------------------------------------------------------------------------+
| ``true``          | Authentication will create a peristent cookie.                                                                                              |
|                   |                                                                                                                                             |
|                   | The user will be remembered after he/she closes the browser.                                                                                |
+-------------------+---------------------------------------------------------------------------------------------------------------------------------------------+
| ``false``         | Authentication will create a session cookie.                                                                                                |
|                   |                                                                                                                                             |
|                   | The user will need to sign in again after he/she closes the browser.                                                                        |
+-------------------+---------------------------------------------------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------+
| SessionCookie.ExpireInMinutes                                                                |
+==============================================================================================+
| Specifies the persistent cookie expiration time.                                             |
+----------------------------------------------------------------------------------------------+


Smtp
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

SMTP configuration used for sending automated emails (alert notifications).

.. code-block:: json
    
    {
        "Smtp": {
            "Host": "smtp.sendgrid.net",
            "Port": 587,
            "UserName": "",
            "Password": "",
            "EnableSsl": false,
            "From": {
                "Address": "support@kisslog.net",
                "DisplayName": "KissLog"
            }
        }
    }

UserInterface
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "UserInterface": {
            "ForceAvatarSrc": null,
            "CreatePermalinkWithAnonymousAccess": { },
            "Applications": { },
            "Dashboard": { }
        }
    }

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| UserInterface.ForceAvatarSrc                                                                                                                                    |
+=================================================================================================================================================================+
| When a value is provided, the user avatars (displayed in the user-interface) will always use this value.                                                        |
|                                                                                                                                                                 |
| This is useful when you need to prevent any external resources loading.                                                                                         |
+-------------------+---------------------------------------------------------------------------------------------------------------------------------------------+
| ``null``          | User avatars will be generated using Gravatar (default).                                                                                    |
+-------------------+---------------------------------------------------------------------------------------------------------------------------------------------+
| ``string``        | User avatars will always load the provided ``src`` value.                                                                                   |
|                   |                                                                                                                                             |
|                   | Example: ``"ForceAvatarSrc": "/images/defaultAvatar.png"``                                                                                  |
+-------------------+---------------------------------------------------------------------------------------------------------------------------------------------+

CreatePermalinkWithAnonymousAccess
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: json
    
    {
        "UserInterface": {
            "CreatePermalinkWithAnonymousAccess": {
                "IsEnabled": true,
                "ValidForSeconds": 7200
            }
        }
    }

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| CreatePermalinkWithAnonymousAccess.IsEnabled                                                                                                                    |
+===================+=============================================================================================================================================+
| ``true``          | Permalinks created from the user interface (links to request logs) can be anonymously accessed for a limited period of time.                |
+-------------------+---------------------------------------------------------------------------------------------------------------------------------------------+
| ``false``         | Permalinks created from the user interface can be accessed only by authenticated users.                                                     |
+-------------------+---------------------------------------------------------------------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------------------+
| CreatePermalinkWithAnonymousAccess.ValidForSeconds                                           |
+==============================================================================================+
| Required when ``CreatePermalinkWithAnonymousAccess.IsEnabled = true``                        |
+----------------------------------------------------------------------------------------------+
| Specifies for how long after creation the permalink can be anonymously accessed.             |
+----------------------------------------------------------------------------------------------+

Applications
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: json
    
    {
        "UserInterface": {
            "Applications": {
                "LoadHowMany": 6
            }
        }
    }

+----------------------------------------------------------------------------------------------+
| Applications.LoadHowMany                                                                     |
+==============================================================================================+
| Specifies how many applications should be preloaded under the ``/Applications`` section.     |
+----------------------------------------------------------------------------------------------+

Dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code-block:: json
    
    {
        "UserInterface": {
            "Dashboard": {
                "ShowReferringSites": true
            }
        }
    }

+-----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ShowReferringSites                                                                                                                                              |
+===================+=============================================================================================================================================+
| ``true``          | The list of individual referring sites will be visible under the Dashboard page.                                                            |
+-------------------+---------------------------------------------------------------------------------------------------------------------------------------------+
| ``false``         | The list of individual referring sites will not be visible under the Dashboard page.                                                        |
+-------------------+---------------------------------------------------------------------------------------------------------------------------------------------+


