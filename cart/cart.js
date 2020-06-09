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




let data = sessionStorage.getItem("shoppingCart")
let userData = localStorage.getItem("userData")
userData = JSON.parse(userData)
let total = document.getElementById("total")
let total1 = document.getElementById("total1")
data = JSON.parse(data)
let main = document.getElementById("table")
let someThingChanged = () => {
    let totalValue = 0
    data.forEach((item, i) => {
        totalValue = totalValue + (data[i].count * data[i].price)
    })
    total.innerHTML = "PKR (" + totalValue + ")"
    total1.innerHTML = "PKR (" + totalValue + ")"
}

let countChanged = (dataComp, iteration) => {
    let newNumber = parseInt(dataComp.value)
    data[iteration].count = newNumber
    sessionStorage.removeItem("shoppingCart")
    sessionStorage.setItem("shoppingCart", JSON.stringify(data))
    let comp = document.getElementsByClassName("totalOfCard")[iteration]
    comp.innerHTML = `PKR (${data[iteration].count * data[iteration].price})`
}
if(data){


data.forEach((item, i) => {
    let newTr = document.createElement("tr")

    // First Td
    let newTd = document.createElement("td")
    let newDiv = document.createElement("div")
    let newDivImg = document.createElement("img")
    let newDiv2 = document.createElement("div")
    let newDiv2H4 = document.createElement("h4")
    let newDiv2P = document.createElement("p")
    let newDiv2H4Text = document.createTextNode(item.name)
    let newDiv3 = document.createElement("div")

    newDiv3.setAttribute("class", "col-sm-10")
    newDiv.setAttribute("class", "row")
    newDiv2.setAttribute("class", "hidden-xs")
    newDiv2H4.setAttribute("class", "nomargin nameOfProduct")
    newDivImg.setAttribute("src", item.img)
    newDivImg.setAttribute("alt", item.cardId)
    newDivImg.setAttribute("class", "img-responsive")
    newDiv2P.setAttribute("class", "descriptionOfProduct")
    newTd.setAttribute("data-th", "Product")

    newDiv2.appendChild(newDivImg)
    newDiv2H4.appendChild(newDiv2H4Text)
    newDiv3.appendChild(newDiv2H4)
    newDiv3.appendChild(newDiv2P)
    newDiv.appendChild(newDiv2)
    newDiv.appendChild(newDiv3)
    newTd.appendChild(newDiv)
    newTr.append(newTd)


    // Second Tr

    let newTd2 = document.createElement("td")
    newTd2.setAttribute("class", "priceOfProduct")
    let newTd2Text = document.createTextNode(`PKR (${item.price})`)
    newTd2.appendChild(newTd2Text)
    newTr.appendChild(newTd2)
    newTd2.setAttribute("data-th", "Price")


    // Third Tr
    let newTd3 = document.createElement("td")
    let newTd3Input = document.createElement("input")
    newTd3Input.setAttribute("type", "number")
    newTd3Input.setAttribute("class", "form-control text-center quantityOfProduct")
    newTd3Input.setAttribute("value", item.count)
    newTd3Input.setAttribute("onchange", `countChanged(this,${i})`)
    newTd3.appendChild(newTd3Input)
    newTr.appendChild(newTd3)
    newTd3.setAttribute("data-th", "Quantity")


    // Fourth Tr
    let newTd4 = document.createElement("td")
    newTd4.setAttribute("class", "totalOfCard")
    newTd4.setAttribute("data-th", "Total")
    let newTd4Text = document.createTextNode(`PKR (${item.price * item.count})`)
    newTd4.appendChild(newTd4Text)
    newTr.appendChild(newTd4)

    main.appendChild(newTr)
})
}
else{
    window.location.replace("../myOrders/myOrders.html")
}
someThingChanged()

let checkChange = (data) => {
    if (data.checked) {
        document.getElementById("billingAddress").value = document.getElementById("deliveryAddress").value
    }
    else {
        document.getElementById("billingAddress").value = ""
    }
}

let cartSubmitted = () => {
    if (userData) {
        let primaryContact = document.getElementById("priamryContact").value
        let secondaryContact = document.getElementById("secondaryContact").value
        let deliveryAddress = document.getElementById("deliveryAddress").value
        let billingAddress = document.getElementById("billingAddress").value
        if (primaryContact != "" && deliveryAddress != "" && billingAddress != "") {
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = { date, time }
            let newObj = {
                primaryContact,
                secondaryContact,
                deliveryAddress,
                billingAddress,
                date: dateTime
            }
            let cart = sessionStorage.getItem("shoppingCart")
            cart = JSON.parse(cart)
            cart.forEach((item, index) => {
                let productNum = `product${index}`
                item.status = "Requested"
                newObj[productNum] = {
                    item
                }
                console.log(newObj)
            })
            function uuidv4() {
                return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                );
            }
            let keyid = uuidv4()
            database.ref("UsersNames").child(userData.id).child("Orders").child(keyid).set(newObj)
            newObj.emailU = userData.emailU
            newObj.uName = userData.uName
            newObj.type = userData.type
            database.ref("Orders").child(keyid).set(newObj)
            sessionStorage.removeItem("shoppingCart")
            window.location.replace("../myOrders/myOrders.html")
            window.location.replace("../myOrders/myOrders.html")
        }
        else {
            return alert("please fill up all required fields")
        }
    }
    else {
        let newName = document.getElementById("nameSignUp1").value;
        let newEmail = document.getElementById("emailSignUp1").value;
        let primaryContact = document.getElementById("priamryContact").value
        let secondaryContact = document.getElementById("secondaryContact").value
        let deliveryAddress = document.getElementById("deliveryAddress").value
        let billingAddress = document.getElementById("billingAddress").value
        if (primaryContact != "" && deliveryAddress != "" && billingAddress != "") {
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = { date, time }
            let newObj = {
                primaryContact,
                secondaryContact,
                deliveryAddress,
                billingAddress,
                date: dateTime
            }
            let cart = sessionStorage.getItem("shoppingCart")
            cart = JSON.parse(cart)
            cart.forEach((item, index) => {
                let productNum = `product${index}`
                item.status = "Requested"
                newObj[productNum] = {
                    item
                }
            })
            function uuidv4() {
                return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
                );
            }
            let keyid = uuidv4()
            function generatePassword() {
                var length = 8,
                    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                    retVal = "";
                for (var i = 0, n = charset.length; i < length; ++i) {
                    retVal += charset.charAt(Math.floor(Math.random() * n));
                }
                return retVal;
            }
            firebase.auth().createUserWithEmailAndPassword(newEmail, generatePassword())
                .then((results) => {
                    let uid = results.user.uid;
                    var pro = {
                        emailU: newEmail,
                        uName: newName,
                        type: "user"
                    };
                    database.ref("UsersNames").child(uid).set(pro);
                    pro.id = uid
                    localStorage.setItem("userData", JSON.stringify(pro))
                    userData = localStorage.getItem("userData")
                    userData = JSON.parse(userData)
                    return results.user.updateProfile({
                        displayName: newName
                    })
                }).then(() => {
                    firebase.auth().sendPasswordResetEmail(newEmail).then(function () {
                        console.log("emailSent")
                    })
                    database.ref("UsersNames").child(userData.id).child("Orders").child(keyid).set(newObj)
                    newObj.emailU = userData.emailU
                    newObj.uName = userData.uName
                    newObj.type = userData.type
                    database.ref("Orders").child(keyid).set(newObj)
                    sessionStorage.removeItem("shoppingCart")
                    window.location.replace("../myOrders/myOrders.html")
                })
                .catch(function (error) {
                    console.log(error.message);
                    alert(error.message+"Or you are already register with us please check your email for password resetting")
                })
        }
    }
}
var attemp = 0;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // userName = user.displayName;
        // userEmail = user.email;
        // userEmail = userEmail.replace("@", "")
        // userEmail = userEmail.replace(".", "")
        let parentElem = document.getElementById("loginButton").parentNode
        parentElem.innerHTML = ""
        let logOutButt = document.createElement("button")
        logOutButt.setAttribute("type", "Button")
        logOutButt.setAttribute("class", "btn btn-outline-light")
        parentElem.setAttribute("class", "form-inline signinOut")
        logOutButt.setAttribute("onclick", "signingOut()")
        let logOutButtText = document.createTextNode("Log Out")
        logOutButt.appendChild(logOutButtText)
        parentElem.appendChild(logOutButt)
        let myOrderParent = parentElem.parentNode
        let newLi = document.createElement("li")
        newLi.setAttribute("class", "nav-item")
        let newA = document.createElement("a")
        newA.setAttribute("class", "nav-link")
        newA.setAttribute("href", "../myOrders/myOrders.html")
        let newAtext = document.createTextNode("My Orders")
        newA.appendChild(newAtext)
        newLi.appendChild(newA)
        myOrderParent.children[0].appendChild(newLi)

    }

    else {
        let orderForm = document.getElementsByClassName("column1")[0]
        let newNameFormDocDiv = document.createElement("div")
        newNameFormDocDiv.setAttribute("class", "form-group")
        let newNameFormDocInput = document.createElement("input")
        newNameFormDocInput.setAttribute("class", "form-control")
        newNameFormDocInput.setAttribute("id", "nameSignUp1")
        newNameFormDocInput.setAttribute("placeholder", "Name")
        newNameFormDocInput.setAttribute("name", "name")
        newNameFormDocInput.setAttribute("type", "text")
        newNameFormDocDiv.appendChild(newNameFormDocInput)

        let newNameFormDocDiv2 = document.createElement("div")
        newNameFormDocDiv2.setAttribute("class", "form-group")
        let newNameFormDocInput2 = document.createElement("input")
        newNameFormDocInput2.setAttribute("class", "form-control")
        newNameFormDocInput2.setAttribute("type", "email")
        newNameFormDocInput2.setAttribute("id", "emailSignUp1")
        newNameFormDocInput2.setAttribute("placeholder", "Email")
        newNameFormDocInput2.setAttribute("name", "Email")
        newNameFormDocDiv2.appendChild(newNameFormDocInput2)
        orderForm.insertBefore(newNameFormDocDiv, orderForm.childNodes[2])
        orderForm.insertBefore(newNameFormDocDiv2, orderForm.childNodes[3])
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
let forgotPass=()=>{
    let newEmail = document.getElementById("email").value;
    firebase.auth().sendPasswordResetEmail(newEmail).then(function () {
        alert("Please check your email for password resetting")
    })
    .catch(function (error) {
        console.log(error.message);
        alert(error.message)
    })
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

function signingOut() {
    firebase.auth().signOut().then(function () {
        localStorage.removeItem("firebase:host:market-place-8d296.firebaseio.com");
        localStorage.removeItem("userNameForEvent");
        localStorage.removeItem("userEmailForEvent");
        localStorage.removeItem("signOn");
        window.location.reload()
    })
}