Change log
=======================================================

KissLog_Package 3.0.0
--------------------------

KissLog.Frontend configuration changes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :widths: 40 60
   :header-rows: 1

   * - appsettings.json
     - 

   * - **Property**
     - 

   * - "KissLog.License"
     - has moved to KissLog.json "KissLog.License"

   * - "App.Version"
     - has moved to KissLog.json "App.Version"

   * - "HtmlMetaImagesVersion"
     - has been removed

   * - "LocalTextFileListener.DirectoryPath"
     - has moved to KissLog.json "InternalLogs.DirectoryPath"

   * - "KissLogBackend.BasicAuth.Password"
     - has moved to KissLog.json "KissLogBackend.BasicAuth.Password"

   * - "DeleteApplicationData"
     - has been removed

   * - "PageTitles"
     - has been removed

   * - "ExternalLinks"
     - has been removed

.. list-table::
   :widths: 40 60
   :header-rows: 1

   * - KissLog.json
     - 

   * - **Property**
     - 

   * - "KissLogOrganizationId"
     - has been removed

   * - "KissLogApplicationId"
     - has been removed

   * - "AnonymousAccess.HS256Secret"
     - has been removed

   * - "Notifications"
     - has been removed

   * - "UserInterface\\ReferringSites"
     - has moved to "UserInterface\\Dashboard\\ReferringSites"

   * - "Applications"
     - has moved to "UserInterface\\Applications"
