document.querySelector("#login").parentElement.addEventListener("click", () => {
    localStorage.removeItem("loginUser");
    alert('Logged out successfully')
});
$(".avatar").click((function() {
    $(".avatar label").append('<span class="spinner-border spinner-border-sm"></span>')
}));
document.querySelector("#edit-number-form").addEventListener("submit", e=>{
    e.preventDefault();
    //ADD SPINNER TO SUBMIT BUTTON
    $("#edit-number-form .form-btn").append('<span class="spinner-border spinner-border-sm"></span>')

    const formName = document.querySelector("#edit-number-form").getAttribute("data-name");
    const uri = `http://localhost:5000/api/v1/user/one?token=${token}&update_type=${formName}`;

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

            document.querySelector(".primaryNumber").innerText = res.primary
            document.querySelector(".secondaryNumber").innerText = res.secondary
            document.querySelector(".otherNumber").innerText = res.other;
            console.log(data.token)

            setTimeout(()=>$("#edit-number-form .spinner-border").remove(),1000);

            localStorage.setItem("loginUser", data.token);
            alert(data.msg)
        },
        error: (err) => {
            alert(err.responseText)
        },
        dataType: "json"
    })
})


document.querySelector("#update-basic-info").addEventListener("submit", e=>{
    e.preventDefault();
    //ADD SPINNER TO SUBMIT BUTTON
    $("#update-basic-info .form-btn").append('<span class="spinner-border spinner-border-sm"></span>')

    const formName = document.querySelector("#update-basic-info").getAttribute("data-name");
    const uri = `http://localhost:5000/api/v1/user/one?token=${token}&update_type=${formName}`;

    const body = {
        name: document.querySelector("#update-basic-info").fullname.value,
        email: document.querySelector("#update-basic-info").email.value
    }
    $.ajax({
        type: "PUT",
        url: uri,
        data: body,
        success: (data) => {

            console.log("sent", data.token);
            show(".fullName", data.data.name);
            show(".userEmail", data.data.email)

            console.log(data.token)


            localStorage.setItem("loginUser", data.token);
            alert(data.msg)
            setTimeout(()=>$("#edit-number-form .spinner-border").remove(),1000);
        },
        error: (err) => {
            alert(err.responseText)
        },
        dataType: "json"
    })
})


document.querySelector("#edit-address-info").addEventListener("submit", e=> {
    e.preventDefault();
    //ADD SPINNER TO SUBMIT BUTTON
    $("#edit-address-info .form-btn").append('<span class="spinner-border spinner-border-sm"></span>')

    let token = localStorage.getItem("loginUser");
    const formName = document.querySelector("#edit-address-info").getAttribute("data-name");
    const uri = `http://localhost:5000/api/v1/user/one?token=${token}&update_type=${formName}`;

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
            setTimeout(()=>$("#edit-address-info .spinner-border").remove(),1000);
        },
        error: (err) => {
            console.log("an error occured")
            alert(err.responseText)
        }
    })
});

document.querySelector("#img").addEventListener("change", e=> {
    // console.log()
    if(e.target.files.length > 0){

        let p = URL.createObjectURL(e.target.files[0]);
        // console.log(p)
        document.querySelector("#profile-img img").src = p;
    }
});

document.querySelector("#profile-img").addEventListener("submit", e=> {
//ADD SPINNER TO SUBMIT BUTTON
    $("#profile-img .btn-success").append('<span class="spinner-border spinner-border-sm"></span>')

    const url = `http://localhost:5000/api/v1/user/one/image_upload?token=${token}`;
    e.preventDefault();


    let formData = new FormData();
    const inputFile = document.querySelector("#profile-img #img");
    //loop files with for of

    for (const file of inputFile.files){
        formData.append("avatar", file)
    }
    console.log(inputFile.files)

    fetch(`http://localhost:5000/api/v1/user/one/image_upload?token=${token}`, {
        method: "PUT",
        headers: {
            // "content-type": "application/json charset=UTF-8"
        },
        body: formData
    }).then(res=>res.json()).then(data=>{
        alert(data.msg)
        console.log(data)

        show(".userImage", data.img)
        setTimeout(()=>$("#profile-img .spinner-border").remove(),1000);
    }).catch(err=> {
        console.log(err)
        alert(err.responseText || 'You must select a file to upload')

    })

});



document.querySelectorAll(".address .icofont-ui-delete").forEach(tag=> {
    tag.addEventListener("click", e => {
        let token = localStorage.getItem("loginUser");
        const el = e.target.parentElement.parentElement.parentElement.parentElement;
        console.log(el.children[0].textContent)
        const url = `http://localhost:5000/api/v1/user/one?token=${token}&delete_type=address`;
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
                // show(".fullName", data.address);
                // show(".homeAddress", res.home);
                // show(".officeAddress", res.office);
                // show(".otherAddress", res.other);
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
document.querySelectorAll(".number .icofont-ui-delete").forEach(tag=> {
    tag.addEventListener("click", e => {
        let token = localStorage.getItem("loginUser");
        // $(this).append('<span class="spinner-border spinner-border-sm"></span>')

        const el = e.target.parentElement.parentElement.parentElement.parentElement;
        console.log(el.children[0].textContent)
        const url = `http://localhost:5000/api/v1/user/one?token=${token}&delete_type=number`;
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
                // document.querySelector(".primaryNumber").innerText = res.primary
                // document.querySelector(".secondaryNumber").innerText = res.secondary
                // document.querySelector(".otherNumber").innerText = res.other
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

