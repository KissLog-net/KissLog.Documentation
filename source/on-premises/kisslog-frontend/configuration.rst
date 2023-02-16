Configuration
=================================

KissLog.Frontend behavior can be customized by updating the ``Configuration\KissLog.json`` file.

.. contents:: Configuration options
   :local:

ApplicationName
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Display name of the on-premises KissLog application - used when generating HTML titles.

.. code-block:: json
    
    {
        "ApplicationName": "My logging app"
    }

AppVersion
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Property used as query string parameter when loading static resources (css/javascript).

This property should be changed after an application update in order to invalidate the static files cache.

.. code-block:: json
    
    {
        "AppVersion": "1.0.0"
    }

KissLogBackend.BasicAuth.Password
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Basic HTTP authentication scheme password used to connect to KissLog.Backend application.

This property should have the same value as the same property from ``KissLog.Backend\Configuration\KissLog.json``.

.. code-block:: json
    
    {
        "KissLogBackend.BasicAuth.Password": "_This_Password_Should_Be_Replaced_"
    }

KissLog.License
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The KissLog on-premises license key. Can be null.

.. code-block:: json
    
    {
        "KissLog.License": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMaWNlbnNlSWQiOiIzNTczMDI1My00NGRhLTRiZmMtOGQ0MS1iMzUzMDRkZWUyMzciLCJMaWNlbnNlVHlwZSI6IkVudGVycHJpc2UifQ.K4htH3YOulrpVrkTJuHza81VrYloYvTsfRYzb4fpUYI"
    }

KissLogBackendUrl
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Root url pointing to KissLog.Backend application.

.. code-block:: json
    
    {
        "KissLogBackendUrl": "http://kisslog-backend.myapp.com/"
    }

KissLogFrontendUrl
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Root url pointing to KissLog.Frontend application.

.. code-block:: json
    
    {
        "KissLogFrontendUrl": "http://kisslog.myapp.com/"
    }


MediaDirectoryPath
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Specifies the location of the media files uploaded within the application. Path can be either relative or absolute.

.. code-block:: json
    
    {
        "MediaDirectoryPath": ""
    }

Database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "Database": {
            "Provider": "MySql",
            "ConnectionString": "server=localhost;port=3306;database=KissLog_Frontend;uid={user};password={pass};Charset=utf8;"
        }
    }

.. list-table::
   :header-rows: 1

   * - Database.Provider
     - 
   * - MySql
     - Sets the database provider to MySql.
   * - SqlServer
     - Sets the database provider to MS-SQL.

Authorization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
    
    {
        "Authorization": {
            "DefaultEmailDomain": "myapp.com",
            "HS256Secret": "J6UVNS3EKG46O1S1OVJ59OZ8DH3KEP",
            "SessionCookie": { },
            "ExternalIdentityProviders": { }
        }
    }

.. list-table::
   :header-rows: 1

   * - Authorization.DefaultEmailDomain
   * - Sets the default email domain for the authenticated users (used when displaying the logged-in user).
       
       For example, user with name ``mike`` will be displayed in the user-interface as ``mike@myapp.com``.

.. list-table::
   :header-rows: 1

   * - Authorization.HS256Secret
   * - Represents the signature key of the authentication JSON Web Token (JWT).
       
       The authentication JWT must be signed with the secret provided in this property.

       :ref:`here <on-premises/kisslog-frontend/index:authentication>`

+---------------------------------------------------------------------------------------------------------------+
| Authorization.HS256Secret                                                                                     |
+===============================================================================================================+
| Represents the signature key of the authentication JWT signature key.                                                              |
|                                                                                                               |
| In order to authenticate to this KissLog application, the user must provide a JWT token which                 |
| has been signed with the same key (HS256Secret) that has been specified here.                                 |
|                                                                                                               |
| The authentication JWT can be created programmatically or online using https://jwt.io/.                       |
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
+===================+=============================================================================================================================================+
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

ExternalIdentityProviders
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Configuration for external identity providers authentication.

.. code-block:: json
    
    {
        "Authorization": {
            "ExternalIdentityProviders": {
                "AzureActiveDirectory": { }
            }
        }
    }

AzureActiveDirectory
""""""""""""""""""""""""""""""""""""

Configuration options for Azure ActiveDirectory authentication option.

.. code-block:: json
    
    {
        "Authorization": {
            "ExternalIdentityProviders": {
                "AzureActiveDirectory": {
                    "ClientId": "eb042044-cb75-49a3-a73d-493250cf0017",
                    "ClientSecret": "sM95AEDVJwh28qYRJWkyWCvFUYHAnPYHmC",
                    "Authority": "https://login.microsoftonline.com/299de8ce-0c07-49d3-bea7-3b8b8bd3d2c9/v2.0/"
                }
            }
        }
    }

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


