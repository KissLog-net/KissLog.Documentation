function init() {
    var $tocMenu = $(".toc-menu");

    $tocMenu.find("ul").each(function() {
        var $parentLi = $(this).parent("li");
        if($parentLi.length) {
            $parentLi.children(".reference").prepend("<span class='toctree-expand'></span>");
        }
    });
};

$(function(){
    init();
});
