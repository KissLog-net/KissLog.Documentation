Change log
=======================================================

KissLog_Package 3.0.0
--------------------------

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

   * - "UserInterface\\ReferringSites"
     - has moved to "UserInterface\\Dashboard\\ReferringSites"

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
