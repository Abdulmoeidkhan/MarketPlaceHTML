// // // Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyDUViPwpfn2VMJUffpMKtPHPawHpvIJG8c",
    authDomain: "market-place-8d296.firebaseapp.com",
    databaseURL: "https://market-place-8d296.firebaseio.com",
    projectId: "market-place-8d296",
    storageBucket: "market-place-8d296.appspot.com",
    messagingSenderId: "56293275831",
    appId: "1:56293275831:web:853f31174be6f9d899b532",
    measurementId: "G-GKZ0J9NT1S"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
let database = firebase.database()
let dataToBeSend = {}
let returnArr = [];
let returnArr2 = [];

// document.getElementById("Loading").style.display = "block"
// document.getElementById("carouselExampleCaptions").style.visibility = "hidden"
// document.getElementsByClassName("card-deck")[0].style.visibility = "hidden"

let fetchData = () => {
    let snapshotToArray = (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        return returnArr;
    };
    database.ref("Banner").once("value").then((snapshot) => {
        snapshotToArray(snapshot);
    }).then(() => {
        returnArr.forEach((item, index) => {
            let mainListComponent = document.getElementById("mainListComponent")
            let mainDivComponent = document.getElementById("mainDivComponent")
            let newDiv1 = document.createElement("div")
            let newImg = document.createElement("img")
            let newLi = document.createElement("li")

            newLi.setAttribute("data-target", "#carouselExampleCaptions")
            newLi.setAttribute("data-slide-to", index)
            newLi.setAttribute("class", "myLi")
            newDiv1.setAttribute("class", "carousel-item")
            newDiv1.setAttribute("id", item.key)
            newImg.setAttribute("src", item.img)
            newImg.setAttribute("class", "d-block w-100")
            newImg.setAttribute("alt", "https://via.placeholder.com/50")


            newDiv1.appendChild(newImg)
            mainDivComponent.appendChild(newDiv1)
            mainListComponent.appendChild(newLi)
        })
    }).then(() => {
        let firstDiv = document.getElementById("mainDivComponent")
        firstDiv = firstDiv.getElementsByClassName("carousel-item")[0]
        firstDiv.setAttribute("class", "carousel-item active")
        let firstLi = document.getElementById("mainListComponent")
        firstLi = firstLi.getElementsByClassName("myLi")[0]
        firstLi.setAttribute("class", "active")

        document.getElementById("Loading").style.display = "none"
        document.getElementById("carouselExampleCaptions").style.visibility = "visible"
    })

    let snapshotToArray2 = (
        snapshot
    ) => {
        returnArr3 = []
        let i = 0
        snapshot.forEach((childSnapshot) => {
            let item = childSnapshot.val();
            item.parent = childSnapshot.key;
            i = i + 1
            for (let prop in item.childComp) {
                let value = item.childComp[prop]
                value.name = Object.keys(item.childComp)[i]
                value.parentName = item.parent
            }
            returnArr2.push(item);
        })
        localStorage.setItem("collectedData", JSON.stringify(returnArr2))
        return returnArr2;
    };


    database.ref("Product").once("value").then((snapshot) => {
        snapshotToArray2(
            snapshot
        );
    }).then(() => {
        // console.log(returnArr2)
        returnArr2.forEach((item) => {
            let cardContainerDynamic = document.getElementById("cardContainerDynamic")
            let newH2 = document.createElement("h2")
            let newH2Text = document.createTextNode(item.parent)
            newH2.appendChild(newH2Text)
            cardContainerDynamic.appendChild(newH2)
            // console.log(item)
            let returnArr3 = []
            for (prop in item) {
                let name = prop
                let value = item[prop]
                returnArr3.push({ name, value })
            }
            returnArr3.pop()
            returnArr3.forEach((childItem) => {
                // console.log(childItem)
                let newH3 = document.createElement("h3")
                let newH3Text = document.createTextNode(childItem.name)
                newH3.appendChild(newH3Text)
                cardContainerDynamic.appendChild(newH3)
                let newDiv = document.createElement("div")
                cardContainerDynamic.appendChild(newDiv)
                newH2.setAttribute("class", "mx-auto font-weight-bolder")
                newH2.setAttribute("style", "width: 200px;")
                newDiv.setAttribute("class", "card-deck")
                let returnArr4 = []
                for (props in childItem.value) {
                    let name = props
                    let value = childItem.value[props]
                    returnArr4.push({ name, value })
                }
                // console.log(returnArr4)
                returnArr4.forEach((grandChildItem, index) => {
                    // console.log(grandChildItem)
                    // console.log(document.getElementsByClassName("card-deck"))
                    // for (let i = 0; i < 3; i++) {
                    let newDiv2 = document.createElement("div")
                    newDiv2.setAttribute("class", "card")
                    let galaryContainerDiv = document.createElement("div")
                    galaryContainerDiv.setAttribute("class", "galaryContainer")
                    let newImg = document.createElement("img")
                    newImg.setAttribute("class", "card-img-top")
                    newImg.setAttribute("id", grandChildItem.name)
                    newImg.setAttribute("src", grandChildItem.value.img)
                    newImg.setAttribute("alt", grandChildItem.value.img)
                    newImg.setAttribute("onclick", `imgClick(this.parentNode)`)
                    newDiv.appendChild(newImg)
                    let imgGalaryRowDiv = document.createElement("div")
                    imgGalaryRowDiv.setAttribute("class", "imgGalaryRow")

                    for (let j = 0; j < 4; j++) {
                        let imgGalaryColumnDiv = document.createElement("div")
                        imgGalaryColumnDiv.setAttribute("class", "imgGalaryColumn")
                        let imgGalaryImg = document.createElement("img")
                        imgGalaryImg.setAttribute("class", "imgGalaryImg")
                        imgGalaryImg.setAttribute("onclick", `imgGalaryfunc(this,"${grandChildItem.name}")`)
                        if (j == 0 && grandChildItem.value.img !== " ") {
                            imgGalaryImg.setAttribute("src", grandChildItem.value.img)
                            imgGalaryColumnDiv.appendChild(imgGalaryImg)
                            imgGalaryRowDiv.appendChild(imgGalaryColumnDiv)
                        }
                        else if (j == 1 && grandChildItem.value.img1 !== " ") {
                            imgGalaryImg.setAttribute("src", grandChildItem.value.img1)
                            imgGalaryColumnDiv.appendChild(imgGalaryImg)
                            imgGalaryRowDiv.appendChild(imgGalaryColumnDiv)
                        }
                        else if (j == 2 && grandChildItem.value.img2 !== " ") {
                            imgGalaryImg.setAttribute("src", grandChildItem.value.img2)
                            imgGalaryColumnDiv.appendChild(imgGalaryImg)
                            imgGalaryRowDiv.appendChild(imgGalaryColumnDiv)
                        }
                        else if (j == 3 && grandChildItem.value.img3 !== " ") {
                            imgGalaryImg.setAttribute("src", grandChildItem.value.img3)
                            imgGalaryColumnDiv.appendChild(imgGalaryImg)
                            imgGalaryRowDiv.appendChild(imgGalaryColumnDiv)
                        }
                        else {
                            null
                        }

                    }

                    let newModal = document.createElement("div")
                    newModal.setAttribute("id", `myModal${index}`)
                    newModal.setAttribute("class", `modal`)

                    let newModalSpan = document.createElement("span")
                    newModalSpan.setAttribute("class", "close")
                    newModalSpan.setAttribute("onclick", `spanClick(this.parentNode)`)
                    let newModalSpanText = document.createTextNode("X")

                    let newModalImg = document.createElement("img")
                    newModalImg.setAttribute("id", `caption0${index}`)
                    newModalImg.setAttribute("class", `modal-content`)

                    let newDiv3 = document.createElement("div")
                    newDiv3.setAttribute("class", "card-body")

                    let newH5 = document.createElement("h5")
                    newH5.setAttribute("class", "card-title")
                    newH5.setAttribute("title", grandChildItem.value.pCategory)
                    let newH5Text = document.createTextNode(grandChildItem.value.pName)

                    let newP = document.createElement("p")
                    newP.setAttribute("class", "card-text")
                    newP.setAttribute("title", grandChildItem.value.pHead)
                    let newPText = document.createTextNode(grandChildItem.value.pHead)

                    let newP1 = document.createElement("p")
                    newP1.setAttribute("class", "card-text displayNoneClass")
                    newP1.setAttribute("title", grandChildItem.value.pType)
                    let newP1Text = document.createTextNode(grandChildItem.value.pDesc)

                    let newP2 = document.createElement("p")
                    newP2.setAttribute("class", "card-text")
                    newP2.setAttribute("title", grandChildItem.value.price)
                    let newP2Text = document.createTextNode("Price : " + grandChildItem.value.price)

                    let newP3 = document.createElement("p")
                    newP3.setAttribute("class", "card-text displayNoneClass")
                    newP3.setAttribute("title", grandChildItem.value.pCode)
                    let newP3Text = document.createTextNode("Product Code : " + grandChildItem.value.pCode)

                    let newP4 = document.createElement("p")
                    newP4.setAttribute("class", "card-text displayNoneClass")
                    newP4.setAttribute("title", grandChildItem.value.vendor)

                    let newP5 = document.createElement("p")
                    newP5.setAttribute("class", "card-text displayNoneClass")

                    let small1 = document.createElement("small")
                    let small1Text = document.createTextNode(`Sizes : ${grandChildItem.value.sizes}`)

                    let small2 = document.createElement("small")
                    small2.setAttribute("class","displayNoneClass")
                    let small2Text = document.createTextNode(`Stock : ${grandChildItem.value.stock}`)

                    let cartButton = document.createElement("button")
                    cartButton.setAttribute("class", "add-to-cart btn btn-primary")
                    cartButton.setAttribute("onclick", "addToCart(this.parentNode)")
                    let cartButtonText = document.createTextNode("Add To Cart")

                    let productRevButton = document.createElement("button")
                    productRevButton.setAttribute("class", "add-to-cart btn btn-success")
                    productRevButton.setAttribute("onclick", `viewProduct("${grandChildItem.name}","${grandChildItem.value.pCategory}","${grandChildItem.value.pType}")`)
                    let productRevButtonText = document.createTextNode("View Product")

                    newDiv.appendChild(newDiv2)
                    galaryContainerDiv.appendChild(newImg)
                    galaryContainerDiv.appendChild(imgGalaryRowDiv)
                    newDiv2.appendChild(galaryContainerDiv)
                    newModalSpan.appendChild(newModalSpanText)
                    newModal.appendChild(newModalSpan)
                    newModal.appendChild(newModalImg)
                    newDiv2.appendChild(newModal)
                    newDiv2.appendChild(newDiv3)
                    newH5.appendChild(newH5Text)
                    newDiv3.appendChild(newH5)
                    newP.appendChild(newPText)
                    newDiv3.appendChild(newP)
                    newP1.appendChild(newP1Text)
                    newDiv3.appendChild(newP1)
                    newP2.appendChild(newP2Text)
                    newDiv3.appendChild(newP2)
                    newP3.appendChild(newP3Text)
                    newDiv3.appendChild(newP3)
                    small1.appendChild(small1Text)
                    small2.appendChild(small2Text)
                    newP4.appendChild(small1)
                    newP5.appendChild(small2)
                    newDiv3.appendChild(newP4)
                    newDiv3.appendChild(newP5)
                    cartButton.appendChild(cartButtonText)
                    newDiv3.appendChild(cartButton)
                    productRevButton.appendChild(productRevButtonText)
                    newDiv3.appendChild(productRevButton)
                    // }
                })
            })

        })
    }).then(() => {
        let firstDiv = document.getElementById("mainDivComponent")
        firstDiv = firstDiv.getElementsByClassName("carousel-item")[0]
        firstDiv.setAttribute("class", "carousel-item active")
        let firstLi = document.getElementById("mainListComponent")
        firstLi = firstLi.getElementsByClassName("myLi")[0]
        firstLi.setAttribute("class", "active")
        document.getElementById("Loading").style.display = "none"
        document.getElementById("carouselExampleCaptions").style.visibility = "visible"
        // document.getElementById("cardContainer").style.visibility = "visible"
    })
}



let imgClick = (data) => {
    data1 = data.parentNode
    let modal = data1.children[1]
    let modalImg = modal.children[1]
    let mainComp = document.getElementsByClassName("page-wrapper")[0]
    mainComp.style.overflow = "hidden"
    modal.style.display = "block";
    modalImg.src = data.children[0].src;
}



let spanClick = (data) => {
    data.style.display = "none";
    let mainComp = document.getElementsByClassName("page-wrapper")[0]
    mainComp.style.overflow = "auto"
}


setTimeout(function () {
    document.getElementById("Loading").style.display = "none"
    document.getElementById("carouselExampleCaptions").style.visibility = "visible"
    document.getElementsByClassName("card-deck")[0].style.visibility = "visible"
    window.scrollTo(0, 0)
}, 3000);




let imgGalaryfunc = (imgs, id) => {
    let expandImg = document.getElementById(id);
    expandImg.src = imgs.src;
}

// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(name, price, count, img, cardId, parent, ancestor, vendor, pCode) {
        this.name = name;
        this.price = price;
        this.count = count;
        this.img = img;
        this.cardId = cardId;
        this.parent = parent;
        this.ancestor = ancestor
        this.vendor = vendor
        this.pCode = pCode
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
        // localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart')) || JSON.parse(localStorage.getItem('shoppingCart'))
    }
    if (sessionStorage.getItem("shoppingCart") != null
        //  && 
        //  localStorage.getItem("shoppingCart") != null
    ) {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function (name, price, count, img, cardId, parent, ancestor, vendor, pCode) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(name, price, count, img, cardId, parent, ancestor, vendor, pCode);
        cart.push(item);
        saveCart();
    }
    // Set count from item
    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }
    return obj;
})();


let viewProduct = (id, category, type) => {
    let collectedData = JSON.parse(localStorage.getItem("collectedData"))
    // console.log(id, category, type, collectedData)
    collectedData.map((item, i) => {
        if (item.parent === type) {
            let itemCategory = item[category]
            localStorage.removeItem("viewProductData")
            localStorage.setItem("viewProductData", JSON.stringify(itemCategory[id]))
        }
        location = "./productPage/productPage.html"
    })

}
let addToCart = (data) => {
    // console.log(data.parentNode)
    let name = data.children[0].innerHTML
    let img = data.parentNode.children[0].children[0].src
    let cardId = data.parentNode.children[0].children[0].id
    let parent = data.children[0].title
    let ancestor = data.children[1].title
    let price = data.children[3].title
    let pCode = data.children[4].title
    let vendor = data.children[5].title
    shoppingCart.addItemToCart(name, price, 1, img, cardId, parent, ancestor, vendor, pCode);
    displayCart();
}



let clearMyCart = () => {
    shoppingCart.clearCart();
    displayCart();
}


let displayCart = () => {
    var cartArray = shoppingCart.listCart();
    var output = "";
    if (cartArray.length < 1) {
        document.getElementById("orderNow").style.display = "none"
        document.getElementById("clearMyCart").style.display = "none"
    }
    else {
        document.getElementById("orderNow").style.display = "block"
        document.getElementById("clearMyCart").style.display = "block"
        document.getElementById("orderNow").setAttribute("href", "./cart/cart.html")
    }
    for (var i in cartArray) {
        output += "<tr>"
            + "<td>" + cartArray[i].name + "</td>"
            + "<td>(" + cartArray[i].price + ")</td>"
            + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' title='" + cartArray[i].name + "' onclick='minusCartItem(this)'>-</button>"
            + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "' onchange='onChangeCart(this)'>"
            + "<button class='plus-item btn btn-primary input-group-addon' title='" + cartArray[i].name + "' onclick='addCartItem(this)'>+</button></div></td>"
            + "<td><button class='delete-item btn btn-danger' title='" + cartArray[i].name + "' onclick='deleteCartItem(this)'>X</button></td>"
            // + " = "
            + "<td>" + cartArray[i].total + "</td>"
            + "</tr>";
    }
    let table = document.getElementsByClassName("show-cart")[0]
    table.innerHTML = output
    let totalCart = document.getElementsByClassName("total-cart")[0]
    totalCart.innerHTML = shoppingCart.totalCart()
    let totalCount = document.getElementsByClassName("total-count")[0]
    totalCount.innerHTML = shoppingCart.totalCount()

}

// Delete item button
let deleteCartItem = (data) => {
    let name = data.title
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
}

let minusCartItem = (data) => {
    let name = data.title
    shoppingCart.removeItemFromCart(name);
    displayCart();
}

let addCartItem = (data, price) => {
    let name = data.title
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
}

let onChangeCart = (data) => {
    let name = data.title
    let count = Number(data.value);
    shoppingCart.setCountForItem(name, count);
    displayCart();
}
displayCart();

var attemp = 0;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userName = user.displayName;
        userEmail = user.email;
        userEmail = userEmail.replace("@", "")
        userEmail = userEmail.replace(".", "")
        let parentElem = document.getElementById("loginButton").parentNode
        parentElem.innerHTML = ""
        let logOutButt = document.createElement("button")
        logOutButt.setAttribute("type", "Button")
        logOutButt.setAttribute("class", "btn btn-outline-light")
        logOutButt.setAttribute("onclick", "signingOut()")
        parentElem.setAttribute("class", "form-inline signinOut")
        let logOutButtText = document.createTextNode("Log Out")
        logOutButt.appendChild(logOutButtText)
        parentElem.appendChild(logOutButt)
        let myOrderParent = parentElem.parentNode
        let newLi = document.createElement("li")
        newLi.setAttribute("class", "nav-item")
        let newA = document.createElement("a")
        newA.setAttribute("class", "nav-link")
        newA.setAttribute("href", "./myOrders/myOrders.html")
        let newAtext = document.createTextNode("My Orders")
        newA.appendChild(newAtext)
        newLi.appendChild(newA)
        myOrderParent.children[0].appendChild(newLi)

    }

    else {
        localStorage.removeItem("userData")
    };
})

document.getElementById("nameSignUp").addEventListener("keyup", function (data) {
    var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
    for (var i = 0; i < data.target.value.length; i++) {
        if (iChars.indexOf(data.target.value.charAt(i)) != -1) {
            alert("The box has special characters. \nThese are not allowed.\n");
            return false;
        }
    }
})

function signUp() {
    var emailI = document.getElementById('emailSignUp');
    var pass = document.getElementById('pass1');
    var pass2 = document.getElementById("pass2")
    var nameInput = document.getElementById('nameSignUp');
    if (pass.value === pass2.value) {
        var email = emailI.value;
        var password = pass.value;
        var name = nameInput.value;
        var pro = {
            emailU: email,
            uName: name,
            type: "user"
        };
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((results) => {
                let uid = results.user.uid;
                database.ref("UsersNames").child(uid).set(pro);
                pro.id = uid
                localStorage.setItem("userData", JSON.stringify(pro))
                return results.user.updateProfile({
                    displayName: pro.uName
                })
            }).then(() => {
                location.reload()
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error.message);
                alert(error.message)
            })
    }
    else {
        alert("Password does not match")
        pass.value = ""
        pass2.value = ""
    }
}
database.ref("UsersNames").on("child_added", function (snapshot) {
    var em = snapshot.val()
});
function login() {
    var emailI = document.getElementById('email');
    var pass = document.getElementById('password');
    if (attemp == 0) {
        var email = emailI.value;
        var password = pass.value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (user) {
                attemp = attemp + 1;
                if (email == user.user.email) {
                    let obj = JSON.stringify({
                        uName: user.user.displayName,
                        emailU: user.user.email,
                        id: user.user.uid,
                        type: "user",
                    })
                    localStorage.setItem("userData", obj)
                }
                localStorage.setItem("signOn", 1);
                window.location.reload()
            })
            .catch(function (error) {
                alert(error.message);
            });
    }
    else if (attemp == 1) {
        alert("You Are Already Sign In Please Wait");
    }
}
let forgotPass = () => {
    let newEmail = document.getElementById("email").value;
    firebase.auth().sendPasswordResetEmail(newEmail).then(function () {
        alert("Please check your email for password resetting")
    })
        .catch(function (error) {
            console.log(error.message);
            alert(error.message)
        })
}
function signingOut() {
    firebase.auth().signOut().then(function () {
        localStorage.removeItem("firebase:host:market-place-8d296.firebaseio.com");
        localStorage.removeItem("userData");
        localStorage.removeItem("signOn");
        window.location.reload()
    })
}