// $(".select-menu").on("click", (function() { $(this).children(".menu-list").toggle() })), $(".select-option").on("click", (function() { $(this).children(".option-list").toggle() })), $(".select-option ul li a").on("click", (function() {
//     var t = $(this).children("i").attr("class"),
//         i = $(this).children("img").attr("src"),
//         c = $(this).children("span").text(),
//         e = $(this).closest(".select-option").children(".icon"),
//         s = $(this).closest(".select-option").children(".img"),
//         l = $(this).closest(".select-option").children(".text");
//     $(e).attr({ class: "icon " + t }), $(s).attr({ src: i }), $(l).text(c)
// }));
// setTimeout(() => {

// TOGGLE THE SELECT MENU
$(".select-menu").on("click", (function() { $(this).children(".menu-list").toggle() }));

// TOGGLE SELECT OPTION
$(".select-option").on("click", (function(e) {
    $(this).children(".option-list").toggle();
})), $(".select-option ul li a").on("click", (function() {
    var t = $(this).children("i").attr("class"),
        i = $(this).children("img").attr("src"),
        c = $(this).children("span").text(),
        e = $(this).closest(".select-option").children(".icon"),
        s = $(this).closest(".select-option").children(".img"),
        l = $(this).closest(".select-option").children(".text");
    $(e).attr({ class: "icon " + t });
    $(s).attr({ src: i }), $(l).text(c)
}));