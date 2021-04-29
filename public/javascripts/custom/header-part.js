// SCROLL NAVBAR FEATURE
$(window).on("scroll", function () {
  $(this).scrollTop() > 130
    ? $(".header-part").addClass("header-fixed")
    : $(".header-part").removeClass("header-fixed");
});

// HIDE | SHOW CATEGORY SEARCH FIELD ON MOBILE
$(".icon-cross").on("click", function () {
  $(".icon-cross i").toggleClass("icofont-plus");
  $(".header-middle").toggleClass("active");
});

//  DISPLAY SIDEBAR
$(".icon-nav, .header-user").on("click", function () {
  $("body").css("overflow", "hidden");
  $(".sidebar-nav").toggleClass("active");
  $(".nav-close").on("click", function () {
    $("body").css("overflow-y", "scroll");
    $(".sidebar-nav").removeClass("active");
  });
});

// MOBILE | DESKTOP CART DISPLAY
$(".icon-check, .mobile-check").on("click", function () {
  $("body").css("overflow", "hidden");
  $(".sidebar-check").addClass("active");
  $(".nav-close, .check-close").on("click", function () {
    $("body").css("overflow-y", "scroll");
    $(".sidebar-check").removeClass("active");
  });
});
