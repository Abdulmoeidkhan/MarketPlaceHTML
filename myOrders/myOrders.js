// Your web app's Firebase configuration
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
let itemKey = ""
let returnArr = [];
let returnArr2 = [];
let returnArr3 = []
let userData = localStorage.getItem("userData")
userData = JSON.parse(userData)

let fetchBanner = () => {

    let snapshotToArray = (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr2.push(item);
        });
        return returnArr2;
    };
    database.ref("Banner").once("value").then((snapshot) => {
        snapshotToArray(snapshot);
    }).then(() => {
        returnArr2.forEach((item, index) => {
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
    })
        .then(() => {
            let firstDiv = document.getElementById("mainDivComponent")
            firstDiv = firstDiv.getElementsByClassName("carousel-item")[0]
            firstDiv.setAttribute("class", "carousel-item active")
            let firstLi = document.getElementById("mainListComponent")
            firstLi = firstLi.getElementsByClassName("myLi")[0]
            firstLi.setAttribute("class", "active")

            //     // document.getElementById("Loading").style.display = "none"
            //     // document.getElementById("carouselExampleCaptions").style.visibility = "visible"
            //     // document.getElementById("cardContainer").style.visibility = "visible"
        })
}

fetchBanner()

let fetchData = (datanode) => {
    document.getElementById("carouselExampleCaptions").style.visibility = "hidden"
    document.getElementById("cardContainer").style.visibility = "hidden"
    let dataToFetch = {
        parent: datanode.parent,
        child: userData.id,
    }
    let snapshotToArray = (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            let item = childSnapshot.val();
            item.parent = childSnapshot.key;
            returnArr.push(item);
        })
        return returnArr;
    };
    database.ref(dataToFetch.parent).child(dataToFetch.child).child("Orders").once("value").then((snapshot) => {
        snapshotToArray(snapshot);
    }).then(() => {
        if (returnArr.length > 0) {
            let mainComponent = document.getElementById("cardContainer")
            returnArr.forEach((item, index) => {
                let newH3 = document.createElement("h3")
                let newH3Text = document.createTextNode(`Order ${returnArr.length -index}`)
                newH3.appendChild(newH3Text)
                mainComponent.appendChild(newH3)

                for (prop in item) {
                    let name = prop
                    let value = item[prop]
                    if (name != "billingAddress" && name != "date" && name != "deliveryAddress" && name != "primaryContact" && name != "secondaryContact") {
                        returnArr3.push({ name, value })
                    }
                }
                returnArr3.pop()
                // console.log(returnArr3)
                returnArr3.forEach((childItem, index) => {
                    // console.log(childItem)
                    let newDiv1 = document.createElement("div")
                    newDiv1.setAttribute("class", "card mb-3")
                    newDiv1.setAttribute("style", "max-width: 950px; margin: auto;")

                    let newDiv2 = document.createElement("div")
                    newDiv2.setAttribute("class", "row no-gutters")

                    let newDiv3 = document.createElement("div")
                    newDiv3.setAttribute("class", "col-md-4")

                    let newDiv4 = document.createElement("div")
                    newDiv4.setAttribute("class", "col-md-8")

                    let newDiv5 = document.createElement("div")
                    newDiv5.setAttribute * ("class", "card-body")

                    let newH5 = document.createElement("h5")
                    newH5.setAttribute("class", "card-title")
                    newH5.setAttribute("title", childItem.value.item.pCategory)
                    let newH5Text = document.createTextNode(childItem.value.item.name)

                    let newP2 = document.createElement("p")
                    newP2.setAttribute("class", "card-text")
                    newP2.setAttribute("title", childItem.value.item.vendor)

                    let newP3 = document.createElement("p")
                    newP3.setAttribute("class", "card-text")
                    newP3.setAttribute("title", childItem.value.item.status)
                    let newP3Text = document.createTextNode(`Quantity : ${childItem.value.item.count}`)

                    let newP4 = document.createElement("p")
                    newP4.setAttribute("class", "card-text")
                    newP4.setAttribute("title", childItem.value.item.price)
                    let newP4Text = document.createTextNode("Price : PKR " + childItem.value.item.price)

                    let newP5 = document.createElement("p")
                    newP5.setAttribute("class", "card-text")
                    newP5.setAttribute("title", childItem.value.item.pCode)
                    let newP5Text = document.createTextNode("Product Code : " + childItem.value.item.pCode)

                    let newP6 = document.createElement("p")
                    newP5.setAttribute("class", "card-text")
                    newP5.setAttribute("title", childItem.value.item.status)
                    let newP6Text = document.createTextNode("Status : " + childItem.value.item.status)

                    let galaryContainerDiv = document.createElement("div")
                    galaryContainerDiv.setAttribute("class", "galaryContainer")

                    let newImg = document.createElement("img")
                    newImg.setAttribute("class", "card-img")
                    newImg.setAttribute("id", childItem.name)
                    newImg.setAttribute("src", childItem.value.item.img)
                    newImg.setAttribute("alt", childItem.value.item.img)
                    newImg.setAttribute("onclick", `imgClick(this.parentNode)`)

                    let imgGalaryRowDiv = document.createElement("div")
                    imgGalaryRowDiv.setAttribute("class", "imgGalaryRow")

                    for (let j = 0; j < 4; j++) {
                        let imgGalaryColumnDiv = document.createElement("div")
                        imgGalaryColumnDiv.setAttribute("class", "imgGalaryColumn")
                        let imgGalaryImg = document.createElement("img")
                        imgGalaryImg.setAttribute("class", "imgGalaryImg")
                        imgGalaryImg.setAttribute("onclick", `imgGalaryfunc(this,"${childItem.name}")`)
                        if (j == 0 && childItem.value.item.img !== " ") {
                            imgGalaryImg.setAttribute("src", childItem.value.item.img)
                            imgGalaryColumnDiv.appendChild(imgGalaryImg)
                            imgGalaryRowDiv.appendChild(imgGalaryColumnDiv)
                        }
                        else if (j == 1 && childItem.value.item.img1 !== " " && childItem.value.item.img1) {
                            imgGalaryImg.setAttribute("src", childItem.value.item.img1)
                            imgGalaryColumnDiv.appendChild(imgGalaryImg)
                            imgGalaryRowDiv.appendChild(imgGalaryColumnDiv)
                        }
                        else if (j == 2 && childItem.value.item.img2 !== " " && childItem.value.item.img2) {
                            imgGalaryImg.setAttribute("src", item.img2)
                            imgGalaryColumnDiv.appendChild(imgGalaryImg)
                            imgGalaryRowDiv.appendChild(imgGalaryColumnDiv)
                        }
                        else if (j == 3 && childItem.value.item.img3 !== " " && childItem.value.item.img3) {
                            imgGalaryImg.setAttribute("src", item.img3)
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

                    mainComponent.appendChild(newDiv1)
                    newDiv1.appendChild(newDiv2)
                    newDiv2.appendChild(newDiv3)
                    newDiv2.appendChild(newDiv4)
                    galaryContainerDiv.appendChild(newImg)
                    galaryContainerDiv.appendChild(imgGalaryRowDiv)
                    newDiv3.appendChild(galaryContainerDiv)
                    newModalSpan.appendChild(newModalSpanText)
                    newModal.appendChild(newModalSpan)
                    newModal.appendChild(newModalImg)
                    newDiv3.appendChild(newModal)
                    newDiv4.appendChild(newDiv5)
                    newDiv5.appendChild(newH5)
                    newDiv5.appendChild(newP4)
                    newDiv5.appendChild(newP5)
                    newDiv5.appendChild(newP2)
                    newDiv5.appendChild(newP3)
                    newDiv5.appendChild(newP6)
                    newP3.appendChild(newP3Text)
                    newH5.appendChild(newH5Text)
                    newP4.appendChild(newP4Text)
                    newP5.appendChild(newP5Text)
                    newP6.appendChild(newP6Text)
                })
                returnArr3=[]
            })
        }
        else if (returnArr.length < 1) {
            let mainComponent = document.getElementById("cardContainer")
            let newH2 = document.createElement("H2")
            let newH2Text = document.createTextNode("OOps! No Product Found")

            newH2.appendChild(newH2Text)
            mainComponent.appendChild(newH2)
        }
    }).then(() => {
        document.getElementById("Loading").style.display = "none"
        document.getElementById("carouselExampleCaptions").style.visibility = "visible"
        document.getElementById("cardContainer").style.visibility = "visible"
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
    }

    else {
        localStorage.removeItem("userData")
        location = "../index.html"
    };
})

let imgClick = (data) => {
    data1 = data.parentNode
    let modal = data1.children[1]
    let modalImg = modal.children[1]
    let mainComp = document.getElementsByClassName("page-wrapper")[0]
    mainComp.style.overflow = "hidden"
    modal.style.display = "block";
    modalImg.src = data.children[0].src;
}

let imgGalaryfunc = (imgs, myId) => {
    let expandImg = document.getElementById(myId);
    expandImg.src = imgs.src;
}

let spanClick = (data) => {
    data.style.display = "none";
    let mainComp = document.getElementsByClassName("page-wrapper")[0]
    mainComp.style.overflow = "auto"
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

function signingOut() {
    firebase.auth().signOut().then(function () {
        localStorage.removeItem("firebase:host:market-place-8d296.firebaseio.com");
        localStorage.removeItem("userNameForEvent");
        localStorage.removeItem("userEmailForEvent");
        localStorage.removeItem("signOn");
        window.location.reload()
    })
}