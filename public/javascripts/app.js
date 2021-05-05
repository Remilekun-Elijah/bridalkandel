// jshint esversion:8
let token = localStorage.getItem("loginUser");
const product = [{
        name: "White Rosy Gown",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem facilis repudiandae nostrum at illum, unde dicta, aliquam, deleniti voluptatibus enim eius blanditiis officiis nesciunt exercitationem. Optio consequuntur aperiam itaque nisi!",
        size: ["XXL", "XL", "L", "M", "S"],
        color: ["White", "Black"],
        price: 250000,
        discount: 30000,
        category: 'New',
        uploadedBy: 'Moses Max',
        imgs: [
            '../images/product/gown.png',
            '../images/product/09.jpg',
            '../images/product/02.jpg',
            '../images/product/03.jpg',
            '../images/product/04.jpg'
        ]
    },
    {
        name: "Black Hulk Jacket",
        description: "It is made from top quality material, durable for daily wear. Exquisite workmanship ensure smooth surface and comfortable wear. Reasonable design for both side wear for different styles. Designed with patches, it is fashion and show your personality. Well designed, it makes you look more handsome and cool.",
        size: ["XL", "L", "M", "S"],
        color: ["Red", "Black"],
        price: 35000,
        discount: 10000,
        category: 'Used',
        uploadedBy: 'Remilekun Elijah',
        imgs: [
            '../images/product/03.jpg',
            '../images/product/07.jpg',
            '../images/product/02.jpg',
            '../images/product/06.jpg',
            '../images/product/04.jpg'
        ]
    }
];

function displayProducts() {
    product.map(item => {

        let template = '';
        template += `
    <div class="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3">
    <div class="product-card">
        <figure class="product-media">
            <div class="product-label-group"><label class="product-label label-new">new</label><label class="product-label label-off">-${Math.round(100*(item.price-item.discount)/item.price)}%</label></div>
            <a class="product-image" href="/user/product-single/${item.name}"><img src="${item.imgs[0]}" alt="product"></a>
        </figure>
        <div class="product-content">
            <h5 class="product-price"><span>&#x20a6;${item.price}</span><del>&#x20a6;${item.discount}</del></h5>
            <h5 class="product-name mb-0"><a href="/user/product-single/${item.name}">${item.name}</a></h5>
            <p class="text-16 mb-3 category">category: <b>${item.category}</b></p>
            <div class="product-action-group">
                <div class="product-action"><button class="action-wish" title="Product Wish"><i class="icofont-ui-love"></i></button><button class="action-cart" title="Add to Cart"><span>add to cart</span></button><button class="action-view" title="Product View"
                        data-toggle="modal" data-target="#product-view"><i class="icofont-eye-alt"></i></button></div>
                <div class="product-action"><button class="action-minus" title="Quantity Minus"><i class="icofont-minus"></i></button><input class="action-input" title="Quantity Number" type="text" name="quantity" value="1" disabled><button class="action-plus"
                        title="Quantity Plus"><i class="icofont-plus"></i></button></div>
            </div>
        </div>
    </div>
</div>
    `;

        $("#products").append(template);
        return template;
    });
    // return template;
}
displayProducts();

function viewClickedProduct() {
    $(".action-view").on("click", e => {
        let m = document.querySelector('.product-view'),
            //     clickedItemImg = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.children[1].firstElementChild.src,
            clickedItemName = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild.children[1].firstElementChild.innerText;
        //     modalImg = m.firstElementChild.firstElementChild.firstElementChild.firstElementChild.children[1].firstElementChild.firstElementChild.firstElementChild.src = clickedItemImg;
        // console.log(m.firstElementChild.lastElementChild.firstElementChild)
        let li = '';
        product.filter(e => {
            // let f;
            if (e.name === clickedItemName) {
                // console.log(e);

                // let ul = document.createElement('ul');
                // ul.className = 'product-gallery';

                // e.imgs.forEach(d => {
                m.firstElementChild.lastElementChild.firstElementChild.firstElementChild.textContent = e.name;
                m.firstElementChild.lastElementChild.firstElementChild.children[1].lastElementChild.textContent = e.uploadedBy;
                console.log(m.firstElementChild.lastElementChild.firstElementChild.children[1].lastElementChild.textContent)
                m.firstElementChild.lastElementChild.firstElementChild.children[2].firstElementChild.textContent = `₦${e.price}`;
                m.firstElementChild.lastElementChild.firstElementChild.children[2].lastElementChild.textContent = `₦${e.discount}`;

                m.firstElementChild.lastElementChild.firstElementChild.children[3].textContent = e.description;
                // m.firstElementChild.lastElementChild.firstElementChild.children[4]
                m.firstElementChild.lastElementChild.firstElementChild.children[5].lastElementChild.firstElementChild.firstElementChild.textContent = e.category;
                // if (e.imgs.length) {
                console.log(m.firstElementChild.lastElementChild.firstElementChild.children[4].lastElementChild)
                let f = '';
                e.size.forEach(p => {
                    // f = document.createElement('li');
                    f += `<li><a class="size" href="#">${p}</a></li>`;
                })
                document.querySelector('.details-size-list').innerHTML = f;
                // }
                document.querySelectorAll('.product-gallery .first').forEach(f => f.src = e.imgs[0]);
                document.querySelectorAll('.product-gallery .second').forEach(f => f.src = e.imgs[1]);
                document.querySelectorAll('.product-gallery .third').forEach(f => f.src = e.imgs[2]);
                document.querySelectorAll('.product-gallery .fourth').forEach(f => f.src = e.imgs[3]);
                // li += `<li><img src="${d}" style='width:100%'></li>`;
                // });
                // ul.innerHTML = li;
                // e;
                // console.log(ul)
            } else return 'None Found'
                // return f
        });
        // $('.product-gallery').append(li);

        // console.log(p);
    });
}
viewClickedProduct();

function addToCart() {
    document.querySelectorAll(".action-cart").forEach(addToCartBtn => {
        addToCartBtn.addEventListener('click', e => {
            const clickedItemName = e.target.parentElement.parentElement.parentElement.children[1].textContent;
            let li = '';
            li = product.map(n => {
                let cartPack = {
                    owner: n.uploadedBy,
                    user: document.querySelector('.fullName').textContent,
                    name: n.name,
                    image: n.imgs[0],
                    price: Number(n.price),
                    size: n.size[0],
                    category: n.category
                };

                return cartPack;
            }).filter(p => {
                if (p.name === clickedItemName) {
                    return p;
                }
            });
            // const { name, img, price, size, category } = li[0];
            const bodydata = { name, image, price, size, owner, user, category } = li[0],
                uri = `https://bridalkandy-api.herokuapp.com/api/v1/user/cart?token=${token}`
            console.log(bodydata);
            $.ajax({
                type: "POST",
                url: uri,
                data: bodydata,
                success: (data) => {
                    // let res = data.data;
                    console.log("sent", data);

                    // localStorage.setItem("loginUser", data.token);
                    alert(data)
                },
                error: (err) => {
                    console.log("an error occured")
                    alert(err.responseText)
                }

            })

            // console.log();
            let cartItem = document.createElement('li');
            cartItem.classList = 'cart-item alert fade show';
            cartItem.innerHTML = `
                <div class="cart-image">
                    <a href="#"><img src="${img}" alt="product"></a>
                </div>
                <div class="cart-info">
                    <h5><a href="product-single.html">${name}</a></h5><b class='pt-3'>₦</b> <span><b class='init-price'>${price}</b> <b>X</b> <b class='quantity'>1</b></span>
                    <h6 class='item-total'>₦ ${price}</h6>
                    <div class="product-action">
                    <button class="action-minus" title="Quantity Minus"><i class="icofont-minus"></i></button><input class="action-input" title="Quantity Number" type="text" name="quantity" value="1"><button class="action-plus" title="Quantity Plus"><i class="icofont-plus"></i></button></div>
                </div><button class="cart-delete" data-dismiss="alert"><i class="icofont-bin"></i></button>`;
            $('.cart-list').append(cartItem);
            $(".cartItemLength").text(document.querySelector('.cart-list').childElementCount);

            // updateCartTotal();
        })


        $(".cartItemLength").text(document.querySelector('.cart-list').childElementCount);


    });

}
addToCart();

function updateCart() {
    $('.product-action .action-plus').on('click', e => {
        let clickedItemName = e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstElementChild.textContent;
        e.target.parentElement.parentElement.children[1].value = Number(e.target.parentElement.parentElement.children[1].value) + 1;
        // console.log(e.target.parentElement.parentElement.children[1].value);
        let a = document.querySelectorAll('.cart-list h5 a');

        let li = '';
        li = product.map(n => {
            let cartPack = {
                name: n.name,
                img: n.imgs[0],
                price: n.price,
                category: n.category
            };

            return cartPack;
        }).filter(p => {
            if (p.name === clickedItemName) {
                return p;
            }
        });
        const bodydata = { name, img, price, category } = li[0];
        const uri = `https://bridalkandy-api.herokuapp.com/api/v1/user/cart?token=${token}`
        console.log(bodydata);
        $.ajax({
            type: "POST",
            url: uri,
            data: bodydata,
            success: (data) => {
                // let res = data.data;
                console.log("sent", data);

                // localStorage.setItem("loginUser", data.token);
                alert(data.responseText)
            },
            error: (err) => {
                console.log("an error occured")
                alert(err.responseText)
            }

        })

        a.forEach(b => {
            if (b.textContent == name) {
                let itemQuantity = b.parentElement.parentElement.children[2].children[2];
                itemQuantity.textContent = Number(itemQuantity.textContent) + 1;
                let itemPrice = b.parentElement.parentElement.children[3];
                itemPrice.textContent = `₦ ${(Number(itemPrice.textContent.replace('₦', '').trim()) + Number(price))}`;
            }
        });
        // updateCartTotal();
        // alert('Cart has been successfully updated')

    });

    $('.product-action .action-minus').on('click', e => {
        let clickedItemName = e.target.parentElement.parentElement.parentElement.parentElement.children[1].firstElementChild.textContent;
        let quantity = e.target.parentElement.parentElement.children[1];
        if (Number(quantity.value) > 1) {
            e.target.parentElement.parentElement.children[1].value = Number(quantity.value) - 1;
            console.log(e.target.parentElement.parentElement.children[1].value);
            let a = document.querySelectorAll('.cart-list h5 a');

            let li = '';
            li = product.map(n => {
                let cartPack = {
                    name: n.name,
                    img: n.imgs[0],
                    price: n.price,
                    category: n.category
                };

                return cartPack;
            }).filter(p => {
                if (p.name === clickedItemName) {
                    return p;
                }
            });
            const { name, img, price, category } = li[0];

            a.forEach(b => {
                if (b.textContent == name) {
                    let itemQuantity = b.parentElement.parentElement.children[2].children[2];
                    itemQuantity.textContent = Number(itemQuantity.textContent) - 1;
                    let itemPrice = b.parentElement.parentElement.children[3];
                    itemPrice.textContent = `₦ ${(Number(itemPrice.textContent.replace('₦', '').trim()) - Number(price))}`;


                }
            });
            // updateCartTotal();
        } else alert('product is 1 and will be remove from your cart');

    });
}
updateCart();


function totalPriceCalc() {
    try {
        let ar = document.querySelectorAll('.cart-list .item-total'),
            br = [];
        ar.forEach(arr => br.push(parseFloat(arr.textContent)));
        var re = br.reduce((a, b, c) => {
            c = a + b;
            return c;
        });

        $('#total-fee').text(`₦${re}`);

        var total = $('#total-fee').text(),
            delivery = $('#delivery-fee').text();
        total = parseFloat(total.replace('₦', ''));
        delivery = parseFloat(delivery.replace('₦', ''));
        $('#checkout-amount').text(`₦${total + delivery}`);
        $('#cartCheckout').prop('disabled', false);
    } catch (err) {
        if (err) {
            console.log(err);

            $('#checkout-amount').text('');
            $('#total-fee').text('0');
            $('#cartCheckout').prop('disabled', true);
        }
    }

}

function updateCartTotal(arr) {
    Array.from(document.querySelectorAll('.cart-list .item-total')).map((totalPrice, length) => {
            // console.log(totalPrice, length);
            // let totalP = Number(totalPrice.textContent.replace('₦', '').trim());
            // document.querySelectorAll('.cartTotal').forEach(total => {
            // total.textContent = `₦ ${Math.round(Number(total.textContent.replace('₦', '').trim())) + totalP}`;
            //     })
            // console.log(totalPrice.textContent);
            return Number(totalPrice.textContent.replace('₦', '').trim())

        })
        .reduce((init, current, arr) => {
            let p;

            let n = 0;
            p = Number(p);
            if (init == undefined) p += current;
            else init += current;

            document.querySelectorAll('.cartTotal').forEach(total => {
                total.textContent = Number(init || p);
            });
            // console.log(init, p);
        }, 0);
}

setInterval(updateCartTotal, 1000);

function show(el, val) {
    const tags = document.querySelectorAll(el);
    tags.forEach((tag) => {
        if (tag.tagName == "INPUT") tag.value = val || "";
        else if (tag.tagName === "IMG") tag.src = val;
        else tag.innerText = val || "";
    });
}

try {
    const uri = `https://bridalkandy-api.herokuapp.com/api/v1/user/profile?token=${token}`;

    fetch(uri)
        .then((res) => {

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
                console.log(data.data.name)
                const res = data.data;

                document.querySelector("#login").parentElement.addEventListener("click", () => {
                    localStorage.removeItem("loginUser");
                    alert('Logged out successfully');
                });

                console.log(res.isActive)

                show(".firstName", res.name.split(" ")[0]);
                show(".fullName", res.name);
                show(".userEmail", res.email);
                show(".primaryNumber", res.number.primary);
                show(".secondaryNumber", res.number.secondary || "Not provided");
                show(".otherNumber", res.number.other || "Not provided");
                show(".homeAddress", res.address.home || "Not provided");
                show(".officeAddress", res.address.office || "Not provided");
                show(".otherAddress", res.address.other || "Not provided");
                show(".userImage", res.image || "../images/user.png");

                localStorage.setItem("loginUser", data.token);

                if (res.isActive === false) {
                    let h5 = document.createElement('h5');
                    h5.className = "text-center mb-3";
                    h5.style.marginTop = '-10px';
                    // h5.style.cursor = 'pointer';
                    h5.innerHTML = `<i class="fas fa-exclamation-circle text-warning"></i> Your email address isn't verified yet`;
                    let div = document.querySelector(`.profile-part .container`);
                    console.log(div)
                    document.querySelector('.profile-part').insertBefore(h5, div);

                    let i = document.createElement('i');
                    i.style.cursor = 'pointer';
                    i.title = 'Click to get verification link'
                    i.className = 'fas fa-exclamation-circle text-warning';
                    document.querySelector('#userEmail-wrapper').insertBefore(i, document.querySelector('#userEmail-wrapper .userEmail'));

                    i.addEventListener('click', e => {
                        e.target.innerHTML = `<span class="spinner-border spinner-border-sm"></span>`;
                        console.log(e.target)
                        const uri = `https://bridalkandy-api.herokuapp.com/api/v1/user/profile?token=${token}&update_type=profile-info`;

                        const body = {
                            name: '',
                            email: e.target.nextElementSibling.value
                        }
                        console.log(body.email)
                        $.ajax({
                            type: "PUT",
                            url: uri,
                            data: body,
                            success: (data) => {

                                alert(data.msg);
                                $("#userEmail-wrapper .spinner-border").remove();
                            },
                            error: (err) => {
                                alert(err.responseText);

                                $("#userEmail-wrapper .spinner-border").remove();
                            },
                            dataType: "json"
                        })
                    })

                }
            } catch (err) {
                console.log(err);
            } finally {

            }
        });
} catch (err) {
    console.log(err);
}