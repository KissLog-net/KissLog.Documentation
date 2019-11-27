Entity Framework exceptions
==============================

You can configure KissLog to log Entity Framework exceptions, such as validation exceptions.

This can be achived by using the ``AppendExceptionDetails((Exception ex)`` configuration.

.. code-block:: c#
    :emphasize-lines: 6,18

    protected void Application_Start()
    {
        KissLogConfiguration.Options
            .AppendExceptionDetails((Exception ex) =>
            {
                if (ex is DbEntityValidationException dbException)
                {
                    StringBuilder sb = new StringBuilder();
                    sb.AppendLine("DbEntityValidationException:");

                    foreach (var error in dbException.EntityValidationErrors.SelectMany(p => p.ValidationErrors))
                    {
                        string message = string.Format("Field: {0}, Error: {1}", error.PropertyName, error.ErrorMessage);
                        sb.AppendLine(message);
                    }

                    // the string will be appended to the exception message
                    return sb.ToString();
                }

                return null;
            });
    }

The same concept can be used to log additional information for any types of exceptions.

.. code-block:: c#
    :emphasize-lines: 6,15,18,22

    protected void Application_Start()
    {
        KissLogConfiguration.Options
            .AppendExceptionDetails((Exception ex) =>
            {
                if (ex is UserLockedException userLockedEx)
                {
                    string userId = userLockedEx.UserId;
                    string reason = userLockedEx.Reason;

                    StringBuilder sb = new StringBuilder();
                    sb.AppendLine(string.Format("UserId: {0}", userId));
                    sb.AppendLine(string.Format("Reason: {0}", reason));

                    return sb.ToString();
                }

                if (ex is UserNotFoundException userNotFoundEx)
                {
                    string userId = userNotFoundEx.UserId;

                    return string.Format("UserId: {0}", userId);
                }

                return null;
            });
    }
