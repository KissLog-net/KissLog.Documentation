function init() {
    var $tocMenu = $(".toc-menu");

    $tocMenu.find("ul").each(function() {
        var $parentLi = $(this).parent("li");
        if($parentLi.length) {
            $parentLi.children("a").prepend("<span class='toctree-expand'></span>");
        }
    });

    $tocMenu.find("li.current").addClass("expanded");

    $tocMenu.on("click", ".toctree-expand", function(e) {
        e.preventDefault();
        e.stopPropagation();

        $(this).closest("li").toggleClass("expanded");
    });
};

$(function(){
    init();
});
