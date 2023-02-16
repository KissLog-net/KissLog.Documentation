Troubleshooting
=============================

.. contents:: Table of contents
   :local:

Some of the common reasons for which the KissLog server can fail to run include:

- ``Configuration\KissLog.json`` configuration errors
- Services connectivity errors (such as SQL or Mongo DB)
- SQL permissions errors

Checklist
-------------------------------------------------------

Application logs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Both IIS applications save their internal logs under the ``\logs`` folder. Here should be the first place to check.

* ``C:\inetpub\wwwroot\KissLog.Backend\logs``
* ``C:\inetpub\wwwroot\KissLog.Frontend\logs``

IIS logs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

| If the application fails to start and there are no log messages, enable IIS logs:
| Update ``web.config``, set ``<aspNetCore stdoutLogEnabled="true" />``, then restart the application.

.. code-block:: xml
    :caption: C:\\inetpub\\wwwroot\\KissLog.Backend\\web.config

    <?xml version="1.0" encoding="utf-8"?>
    <configuration>
        <location path="." inheritInChildApplications="false">
            <system.webServer>
                <handlers>
                    <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
                </handlers>
                <aspNetCore processPath="dotnet" arguments=".\KissLog.Backend.AspNetCore.dll" stdoutLogEnabled="true" stdoutLogFile=".\logs\stdout" hostingModel="inprocess" />
            </system.webServer>
        </location>
    </configuration>
    <!--ProjectGuid: 4EC40754-6618-4D7D-B45E-C7FE1D6B8EF6-->

| **Important:**
| Create an empty ``logs`` folder if one does not already exist.

Important notes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1) KissLog.Backend will try to connect to MongoDB. If the server is not reachable, you should see an error:

   .. code-block:: none
       :caption: C:\\inetpub\\wwwroot\\KissLog.Backend\\logs\\21-03-2022.log

       Exception: A timeout occured after 30000ms selecting a server using CompositeServerSelector{ Selectors = MongoDB.Driver.MongoClient+AreSessionsSupportedServerSelector, LatencyLimitingServerSelector{ AllowedLatencyRange = 00:00:00.0150000 } }. Client view of cluster state is { ClusterId : "1", ConnectionMode : "Automatic", Type : "Unknown", State : "Disconnected", Servers : [{ ServerId: "{ ClusterId : 1, EndPoint : "Unspecified/localhost3:27017" }", EndPoint: "Unspecified/localhost:27017", ReasonChanged: "Heartbeat", State: "Disconnected", ServerVersion: , TopologyVersion: , Type: "Unknown", HeartbeatException: "MongoDB.Driver.MongoConnectionException: An exception occurred while opening a connection to the server.
       ---> System.Net.Sockets.SocketException (11001): No such host is known.

2) | KissLog.Frontend will try to connect to to SQL server.
   | On the first run, KissLog.Frontend will also create the database (if not already exists).
   | Any database errors, such as connection errors or database permissions, will be saved under the ``\logs`` folder.

   | **Important:**
   | If the SQL user does not have permissions to create the database, you will have to create it manually.
   | The database generation script will be generated under ``KissLog.Frontend\logs\CreateDatabaseScript.txt``.

3) Make sure you have the `ASP.NET Core Runtime 6 <https://dotnet.microsoft.com/en-us/download/dotnet/6.0>`_ installed.


Need help?
-------------------------------------------------------

Open a `GitHub issue <https://github.com/KissLog-net/KissLog.Sdk/issues>`_ or send an email to catalingavan@gmail.com.