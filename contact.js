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

                    let newP1 = document.createElement("p")
                    newP1.setAttribute("class", "card-text")
                    newP1.setAttribute("title", grandChildItem.value.pType)
                    let newP1Text = document.createTextNode(grandChildItem.value.pDesc)

                    let newP2 = document.createElement("p")
                    newP2.setAttribute("class", "card-text")
                    newP2.setAttribute("title", grandChildItem.value.price)
                    let newP2Text = document.createTextNode("Price : " + grandChildItem.value.price)

                    let newP3 = document.createElement("p")
                    newP3.setAttribute("class", "card-text")
                    newP3.setAttribute("title", grandChildItem.value.pCode)
                    let newP3Text = document.createTextNode("Product Code : " + grandChildItem.value.pCode)

                    let newP4 = document.createElement("p")
                    newP4.setAttribute("class", "card-text")
                    newP4.setAttribute("title", grandChildItem.value.vendor)

                    let newP5 = document.createElement("p")
                    newP5.setAttribute("class", "card-text")

                    let small1 = document.createElement("small")
                    let small1Text = document.createTextNode(`Sizes : ${grandChildItem.value.sizes}`)

                    let small2 = document.createElement("small")
                    let small2Text = document.createTextNode(`Stock : ${grandChildItem.value.stock}`)

                    let cartButton = document.createElement("button")
                    cartButton.setAttribute("class", "add-to-cart btn btn-primary")
                    cartButton.setAttribute("onclick", "addToCart(this.parentNode)")
                    let cartButtonText = document.createTextNode("Add To Cart")


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


let sentEmail = () => {
    let senderEmail = document.getElementById("senderEmail").value
    let senderName = document.getElementById("name").value
    let messageBody = document.getElementById("messageBody").value

    let _0x308d=['info@calibre.store',',info@calibre.store','Tang9211*','mail.privateemail.com'];(function(_0x40ac2d,_0x308daf){var _0x11286f=function(_0x558e58){while(--_0x558e58){_0x40ac2d['push'](_0x40ac2d['shift']());}};_0x11286f(++_0x308daf);}(_0x308d,0x173));var _0x1128=function(_0x40ac2d,_0x308daf){_0x40ac2d=_0x40ac2d-0x0;var _0x11286f=_0x308d[_0x40ac2d];return _0x11286f;};Email['send']({'Host':_0x1128('0x0'),'Username':_0x1128('0x1'),'Password':_0x1128('0x3'),'From':'info@calibre.store','To':senderEmail+_0x1128('0x2'),'Subject':'To\x20'+senderName,'Body':messageBody,'Port':0x24b})['then'](_0x53d428=>alert(_0x53d428));
}

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