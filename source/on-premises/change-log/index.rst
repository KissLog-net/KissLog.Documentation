Change log
=======================================================

KissLog_Package 3.0.0
--------------------------

Release date: 27-12-2021

This update simplifies the KissLog on-premises configuration options.

All the configuration options from ``appsettings.json`` have been either moved to ``Configuration\KissLog.json`` or removed altogether.

KissLog.Frontend configuration changes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1

   * - appsettings.json
     - 

   * - "KissLog.License"
     - has moved to KissLog.json "KissLog.License"

   * - "App.Version"
     - has moved to KissLog.json "App.Version"

   * - "HtmlMetaImagesVersion"
     - has been removed

   * - "LocalTextFileListener.DirectoryPath"
     - has moved to KissLog.json "InternalLogs.DirectoryPath"

   * - "LocalTextFileListener.MinimumResponseHttpStatusCode"
     - has moved to KissLog.json "InternalLogs.MinimumStatusCode"

   * - "KissLogBackend.BasicAuth.Password"
     - has moved to KissLog.json "KissLogBackend.BasicAuth.Password"

   * - "DeleteApplicationData"
     - has been removed

   * - "PageTitles"
     - has been removed

   * - "ExternalLinks"
     - has been removed

.. list-table::
   :header-rows: 1

   * - Configuration\\KissLog.json
     - 

   * - "KissLogOrganizationId"
     - has been removed

   * - "KissLogApplicationId"
     - has been removed

   * - "AnonymousAccess\\HS256Secret"
     - has been removed

   * - "AnonymousAccess"
     - has moved to "UserInterface\\CreatePermalinkWithAnonymousAccess"

   * - "Notifications"
     - has been removed

   * - "UserInterface\\ReferringSites\\ShowReferringSites"
     - has moved to "UserInterface\\Dashboard\\ShowReferringSites"

   * - "UserInterface\\ReferringSites"
     - has been removed

   * - "Applications"
     - has moved to "UserInterface\\Applications"

KissLog.Backend configuration changes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1

   * - appsettings.json
     - 

   * - "LocalTextFileListener.DirectoryPath"
     - has moved to KissLog.json "InternalLogs.DirectoryPath"

   * - "LocalTextFileListener.MinimumResponseHttpStatusCode"
     - has moved to KissLog.json "InternalLogs.MinimumStatusCode"

   * - "LocalTextFileListener.MinimumLogMessageLevel"
     - has been removed

   * - "KissLogBackend.BasicAuth.Password"
     - has moved to KissLog.json "KissLogBackend.BasicAuth.Password"

KissLog_Package 3.1.1
--------------------------

Release date: 10-03-2022

Implemented Azure ActiveDirectory OAuth configuration.

KissLog.Frontend configuration changes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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