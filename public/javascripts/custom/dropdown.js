$((function() {
    $(".dropdown").click((
        function() {
            $(this).next().toggle();
            $(".dropdown-list:visible").length > 1 && ($(".dropdown-list:visible").hide(), $(this).next().show())
        }))
}));