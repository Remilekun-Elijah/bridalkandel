// $(".details-cart").on("click", (function() {
//     $(this).hide(),
//         $(".details-action").css("display", "flex")
// }));
// Toggle Add To Wish on product modal 
$(".details-wish").on("click", (function() {
    $(this).toggleClass("active")
}));
// $(".details-color-list .color").on("click", (function() {
//     $(".details-color-list li a").removeClass("active");
//     $(this).addClass("active")
// }));
$(".details-size-list .size").on("click", (function() {
    $(".details-size-list li a").removeClass("active");
    $(this).addClass("active")
}));