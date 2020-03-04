Search keywords
=====================

On kisslog.net, you can search for requests using specific assigned **keywords**.

When generating the **search keywords**, you have access to all the HTTP request/response information.

A list of optional ``defaultKeywords`` is automatically generated and passed to the handler. 

.. code-block:: c#
    :linenos:
    :emphasize-lines: 14
        
    protected void Application_Start()
    {
        KissLogConfiguration.Options
            .GenerateKeywords((FlushLogArgs args, IList<string> defaultKeywords) =>
            {
                List<string> keywords = new List<string>();
                bool includeDefaultKeywords = false;

                if(includeDefaultKeywords)
                {
                    keywords.AddRange(defaultKeywords);
                }

                keywords.Add("CorrelationID:b001c6bf");

                return keywords;
            });
    }

.. figure:: images/Options-GenerateKeywords.png
   :alt: Options.GenerateKeywords
   :align: center

   Searching for the "CorrelationID:b001c6bf" keyword


