// jshint esversion:6


$(".avatar").click((function() {
    $(".avatar label").html(`${$(".avatar label").text()} <span class="spinner-border spinner-border-sm"></span>`);
    // append('<span class="spinner-border spinner-border-sm"></span>');
}));

document.querySelectorAll(".number .user-action .edit").forEach(btn => {
    btn.addEventListener('click', e => {
        let numWrapper = e.target.parentElement.parentElement.parentElement.parentElement;
        document.querySelectorAll("#edit-number-form .form-select option").forEach(option => {
            // console.log()
            if (option.value == numWrapper.firstElementChild.textContent.toLowerCase()) {
                option.selected = true;
                option.parentElement.parentElement.nextElementSibling.children[1].value = numWrapper.children[1].textContent;
            }
        });
    });
});

document.querySelector("#edit-number-form").addEventListener("submit", e => {
    e.preventDefault();
    //ADD SPINNER TO SUBMIT BUTTON
    $("#edit-number-form .form-btn").html(`${$("#edit-number-form .form-btn").text()} <span class="spinner-border spinner-border-sm"></span>`);


    $("#edit-number-form .form-btn").attr("disabled", true);

    const formName = document.querySelector("#edit-number-form").getAttribute("data-name");
    const uri = `https://bridalkandy-api.herokuapp.com/api/v1/user/profile?token=${token}&update_type=${formName}`;

    const body = {
        type: document.querySelector("#edit-number-form").type.value,
        number: document.querySelector("#edit-number-form").number.value
    }
    $.ajax({
        type: "PUT",
        url: uri,
        data: body,
        success: (data) => {
            const res = data.data;

            document.querySelector(".primaryNumber").innerText = res.primary;
            document.querySelector(".secondaryNumber").innerText = res.secondary;
            document.querySelector(".otherNumber").innerText = res.other;
            console.log(data.token);

            $("#edit-number-form .spinner-border").remove();

            localStorage.setItem("loginUser", data.token);
            alert(data.msg)

            $('.modal-backdrop').remove();
            $(e.target.parentElement.parentElement.parentElement).css('display', 'none');
            $(e.target.parentElement.parentElement.parentElement).removeClass('show');
            $(e.target.parentElement.parentElement.parentElement).css('padding-right', '0');
            $(e.target.parentElement.parentElement.parentElement).removeAttr('aria-modal');
            $(e.target.parentElement.parentElement.parentElement).attr('aria-hidden', 'true');
            $('body').css('padding-right', '0');
            $('body').removeClass('modal-open');
            $("#edit-number-form .form-btn").attr("disabled", false);
        },
        error: (err) => {
            alert(err.responseText);
            $("#edit-number-form .form-btn").attr("disabled", false);
            $("#edit-number-form .spinner-border").remove();
        },
        dataType: "json"
    })
})


document.querySelector("#update-basic-info").addEventListener("submit", e => {
    e.preventDefault();
    //ADD SPINNER TO SUBMIT BUTTON
    $("#update-basic-info .form-btn").html(`${$("#update-basic-info .form-btn").text()} <span class="spinner-border spinner-border-sm"></span>`);
    $("#update-basic-info .form-btn").attr("disabled", true);
    // console.log($("#update-basic-info .form-btn").attr("disabled", true));

    const formName = document.querySelector("#update-basic-info").getAttribute("data-name");
    const uri = `https://bridalkandy-api.herokuapp.com/api/v1/user/profile?token=${token}&update_type=${formName}`;

    const body = {
        name: document.querySelector("#update-basic-info").fullname.value,
        email: document.querySelector("#update-basic-info").email.value
    }
    $.ajax({
        type: "PUT",
        url: uri,
        data: body,
        success: (data) => {

            if (data.data) {
                show(".firstName", data.data.name.split(' ')[0]);
                show(".fullName", data.data.name);
                localStorage.setItem("loginUser", data.token);

            }

            alert(data.msg);
            $('.modal-backdrop').remove();
            $(e.target.parentElement.parentElement.parentElement).css('display', 'none');
            $(e.target.parentElement.parentElement.parentElement).removeClass('show');
            $(e.target.parentElement.parentElement.parentElement).css('padding-right', '0');
            $(e.target.parentElement.parentElement.parentElement).removeAttr('aria-modal');
            $(e.target.parentElement.parentElement.parentElement).attr('aria-hidden', 'true');
            $('body').css('padding-right', '0');
            $('body').removeClass('modal-open');




            $("#update-basic-info .spinner-border").remove();
            $("#update-basic-info .form-btn").attr("disabled", false);

            document.querySelector("#update-basic-info").fullname.value = '';
            document.querySelector("#update-basic-info").email.value = '';

        },
        error: (err) => {
            alert(err.responseText);
            $("#update-basic-info .form-btn").attr("disabled", false);
            $("#update-basic-info .spinner-border").remove();
        },
        dataType: "json"
    })
})


document.querySelectorAll(".address .user-action .edit").forEach(btn => {
    btn.addEventListener('click', e => {
        const addressWrapper = e.target.parentElement.parentElement.parentElement.parentElement;
        // console.log(addressWrapper.firstElementChild.textContent, addressWrapper.children[1].textContent)

        let form = document.querySelectorAll("#edit-address-info .form-select option").forEach(option => {
            console.log(option.parentElement.parentElement.nextElementSibling.children[1])
            if (option.value == addressWrapper.firstElementChild.textContent.toLowerCase()) {
                option.selected = true;
                if (addressWrapper.children[1].textContent == 'Not provided') {} else option.parentElement.parentElement.nextElementSibling.children[1].value = addressWrapper.children[1].textContent;
            }
        });
    })
})

document.querySelector("#edit-address-info").addEventListener("submit", e => {
    e.preventDefault();
    //ADD SPINNER TO SUBMIT BUTTON

    $("#edit-address-info .form-btn").html(`${$("#edit-address-info .form-btn").text()} <span class="spinner-border spinner-border-sm"></span>`);
    $("#edit-address-info .form-btn").attr("disabled", true);

    let token = localStorage.getItem("loginUser");
    const formName = document.querySelector("#edit-address-info").getAttribute("data-name");
    const uri = `https://bridalkandy-api.herokuapp.com/api/v1/user/profile?token=${token}&update_type=${formName}`;

    console.log(formName)
    const details = {
        type: document.querySelector("#edit-address-info").type.value,
        address: document.querySelector("#edit-address-info").address.value
    }
    $.ajax({
        type: "PUT",
        url: uri,
        data: details,
        success: (data) => {
            let res = data.data;
            console.log("sent", res);
            // show(".fullName", data.address);
            show(".homeAddress", res.home);
            show(".officeAddress", res.office);
            show(".otherAddress", res.other);
            localStorage.setItem("loginUser", data.token);
            alert(data.msg)
            $("#edit-address-info .spinner-border").remove();


            $('.modal-backdrop').remove();
            $(e.target.parentElement.parentElement.parentElement).css('display', 'none');
            $(e.target.parentElement.parentElement.parentElement).removeClass('show');
            $(e.target.parentElement.parentElement.parentElement).css('padding-right', '0');
            $(e.target.parentElement.parentElement.parentElement).removeAttr('aria-modal');
            $(e.target.parentElement.parentElement.parentElement).attr('aria-hidden', 'true');
            $('body').css('padding-right', '0');
            $('body').removeClass('modal-open');
            $("#edit-address-info .form-btn").attr("disabled", false);
        },
        error: (err) => {
            console.log("an error occured")
            alert(err.responseText);
            $("#edit-address-info .form-btn").attr("disabled", false);
            $("#edit-address-info .spinner-border").remove();
        }
    })
});

document.querySelector("#img").addEventListener("change", e => {
    // console.log()
    if (e.target.files.length > 0) {

        let p = URL.createObjectURL(e.target.files[0]);
        // console.log(p)
        document.querySelector("#profile-img img").src = p;
    }
});

document.querySelector("#profile-img").addEventListener("submit", e => {
    //ADD SPINNER TO SUBMIT BUTTON
    $("#profile-img .btn-success").html(`${$("#profile-img .btn-success").text()} <span class="spinner-border spinner-border-sm"></span>`);
    $("#profile-img .btn-success").attr("disabled", true);

    const url =
        `https://bridalkandy-api.herokuapp.com/api/v1/user/profile/image_upload?token=${token}`;
    // `http://localhost:5000/api/v1/user/profile/image_upload?token=${token}`;
    e.preventDefault();


    let formData = new FormData();
    const inputFile = document.querySelector("#profile-img #img");
    //loop files with for of

    for (const file of inputFile.files) {
        formData.append("avatar", file);

    }
    // console.log(inputFile.files);

    fetch(url, {
        method: "POST",
        mode: "cors",
        headers: { 'Content-Type': 'multipart/form-data' },
        body: formData
    }).then(res => {
        if (res.status == 201) {
            // alert(res.responseText);
            // console.log(res);
            return res.json();
        } else {
            alert('You must attach an image');
        }
        console.log(res.status);

    }).then(data => {
        if (data) {
            alert(data.msg);
            // console.log(data);

            show(".userImage", data.img)

            // inputFile.value = '';


            $('.modal-backdrop').remove();
            $(e.target.parentElement.parentElement.parentElement).css('display', 'none');
            $(e.target.parentElement.parentElement.parentElement).removeClass('show');
            $(e.target.parentElement.parentElement.parentElement).css('padding-right', '0');
            $(e.target.parentElement.parentElement.parentElement).removeAttr('aria-modal');
            $(e.target.parentElement.parentElement.parentElement).attr('aria-hidden', 'true');
            $('body').css('padding-right', '0');
            $('body').removeClass('modal-open');
        }
        $("#profile-img .btn-success").attr("disabled", false);
        $("#profile-img .spinner-border").remove();
    }).catch(err => {
        console.log(formData.get('avatar'));
        console.log(err);

        alert(err);
        $("#profile-img .spinner-border").remove();
        $("#profile-img .btn-success").attr("disabled", false);
        $("#profile-img .spinner-border").remove();
    })

});



document.querySelectorAll(".address .icofont-ui-delete").forEach(tag => {
    tag.addEventListener("click", e => {
        let token = localStorage.getItem("loginUser");
        const el = e.target.parentElement.parentElement.parentElement.parentElement;
        console.log(el.children[0].textContent);
        const url = `https://bridalkandy-api.herokuapp.com/api/v1/user/profile?token=${token}&delete_type=address`;
        const bodydata = {
            type: el.children[0].textContent,
            address: el.children[1].textContent
        }
        $.ajax({
            type: "DELETE",
            url: url,
            data: bodydata,
            success: (data) => {
                let res = data.data;
                console.log("sent", res);

                localStorage.setItem("loginUser", data.token);
                alert(data.msg)
            },
            error: (err) => {
                console.log("an error occured")
                alert(err.responseText)
            }

        })
    })
});
document.querySelectorAll(".number .icofont-ui-delete").forEach(tag => {
    tag.addEventListener("click", e => {
        let token = localStorage.getItem("loginUser");
        // $(this).append('<span class="spinner-border spinner-border-sm"></span>')

        const el = e.target.parentElement.parentElement.parentElement.parentElement;
        console.log(el.children[0].textContent);
        const url = `https://bridalkandy-api.herokuapp.com/api/v1/user/profile?token=${token}&delete_type=number`;
        const bodydata = {
            type: el.children[0].textContent,
            number: el.children[1].textContent
        }
        $.ajax({
            type: "DELETE",
            url: url,
            data: bodydata,
            success: (data) => {
                let res = data.data;
                console.log("sent", res);

                localStorage.setItem("loginUser", data.token);
                alert(data.msg);
            },
            error: (err) => {
                console.log("an error occured");
                alert(err.responseText);
            }

        })
    })
});