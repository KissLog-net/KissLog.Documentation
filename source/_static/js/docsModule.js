var DocsModule = {};
(function() {
    function init() {
        var $tocMenu = $(".toc-menu");

        $tocMenu.find("ul").each(function() {
            var $parentLi = $(this).parent("li");
            if($parentLi.length) {
                $parentLi.addClass("has-children").children("a").prepend("<span class='toctree-expand'></span>");
                $parentLi.addClass("has-children").children("span").prepend("<span class='toctree-expand'></span>");
            }
        });

        $tocMenu.find("li.current").addClass("expanded");

        $tocMenu.on("click", ".toctree-expand", function(e) {
            e.preventDefault();
            e.stopPropagation();

            $(this).closest("li").toggleClass("expanded");
        });

        $tocMenu.addClass("page-ready");
    };

    DocsModule.init = init;
}());
