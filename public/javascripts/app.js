// jshint esversion:8

let token = localStorage.getItem("loginUser");

function show(el, val) {
    const tags = document.querySelectorAll(el);
    tags.forEach((tag) => {
        if (tag.tagName == "INPUT") tag.value = val || "";
        else if(tag.tagName === "IMG") tag.src = val;
        else tag.innerText = val || "";
    });
}

try {
    const uri = `http://localhost:5000/api/v1/user/one?token=${token}`;

    fetch(uri)
        .then((res) => {
            console.log(res.ok);
            if (res.ok === false) {
                $("#login").text("Login");
                $("#login").parent().parent().href = "/user/login";
            } else {
                $("#login").text("Logout");
                $("#login").parent().parent().href = "/user/login";
                return res.json();
            }
            // return res.json();
        })
        .then((data) => {
            try {
                console.log(data)
                const res = data.data;
                document
                    .querySelector("#login")
                    .parentElement.addEventListener("click", () => {
                        localStorage.removeItem("loginUser");
                        alert("click");
                    });

                show(".firstName", res.name.split(" ")[0]);
                show(".fullName", res.name);
                show(".userEmail", res.email);
                show(".primaryNumber", res.number.primary);
                show(".secondaryNumber", res.number.secondary||"Not provided");
                show(".otherNumber", res.number.other||"Not provided");
                show(".homeAddress", res.address.home||"Not provided");
                show(".officeAddress", res.address.office||"Not provided");
                show(".otherAddress", res.address.other||"Not provided");
                show(".userImage", res.image||"../images/user.png");

                localStorage.setItem("loginUser", data.token);
            } catch (err) {
                console.log(err);
            } finally {

            }
        });
} catch (err) {
    console.log(err);
}
// $("#usernavDesktop").children()[2].remove();
//
// $(".header-user").on("click", function () {
//   $("body").css("overflow", "hidden");
//   $(".sidebar-nav").toggleClass("active");
//   $(".nav-close").on("click", function () {
//     $("body").css("overflow-y", "scroll");
//     $(".sidebar-nav").removeClass("active");
//   });
// });
//   return data.data;
// })
// .catch((err) => {
//   $("#login").text("Login");
//   $("#login").parent().parent().href = "/user/login";
//
// })();