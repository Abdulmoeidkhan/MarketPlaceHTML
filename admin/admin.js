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
var database2 = firebase.database().ref("/");
var nameOfEve = document.getElementById("EvName");
var descriptionOfEve = document.getElementById("EvDescreption")
var dateOfEve = document.getElementById("date")
var sI = localStorage.getItem("signOn");
var userName;
var userEmail;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userName = user.displayName;
        userEmail = user.email;
        userEmail = userEmail.replace("@", "")
        userEmail = userEmail.replace(".", "")
    }
    else {
        location = "./adminLogin.html";
    };
})

function signingOut() {
    firebase.auth().signOut().then(function () {
        location = "./adminLogin.html";
        localStorage.removeItem("firebase:host:market-place-8d296.firebaseio.com");
        localStorage.removeItem("userNameForEvent");
        localStorage.removeItem("userEmailForEvent");
        localStorage.removeItem("signOn");
    })
}
let database = firebase.database()
let dataToBeSend = {}
let itemKey = ""
let returnArr = [];
let fetchArr1=[]
let fetchArr2=[]
let fetchArr3=[]

let fetchStaticData = () => {

    let snapshotToArray1 = (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            fetchArr1.push(item);
        });
        return fetchArr1;
    };
    database.ref("VendorList").once("value").then((snapshot) => {
        snapshotToArray1(snapshot);

    }).then(() => {
        fetchArr1.forEach((item, index) => {
            let parentComp=document.getElementById("validationTooltip09")
            let newOptionSelet=document.createElement("option")
            newOptionSelet.setAttribute("value",item)
            let newOptionSeletText=document.createTextNode(item)
            newOptionSelet.appendChild(newOptionSeletText)
            parentComp.appendChild(newOptionSelet)
        })
    })
    let snapshotToArray2 = (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            fetchArr2.push(item);
        });
        return fetchArr2;
    };
    database.ref("ProductList").once("value").then((snapshot) => {
        snapshotToArray2(snapshot);

    }).then(() => {
        fetchArr2.forEach((item, index) => {
            let parentComp=document.getElementById("validationTooltip07")
            let newOptionSelet=document.createElement("option")
            newOptionSelet.setAttribute("value",item)
            let newOptionSeletText=document.createTextNode(item)
            newOptionSelet.appendChild(newOptionSeletText)
            parentComp.appendChild(newOptionSelet)
        })
    })
    let snapshotToArray3 = (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            fetchArr3.push(item);
        });
        return fetchArr3;
    };
    database.ref("SubProductList").once("value").then((snapshot) => {
        snapshotToArray3(snapshot);

    }).then(() => {
        fetchArr3.forEach((item, index) => {
            let parentComp=document.getElementById("validationTooltip16")
            let newOptionSelet=document.createElement("option")
            newOptionSelet.setAttribute("value",item)
            let newOptionSeletText=document.createTextNode(item)
            newOptionSelet.appendChild(newOptionSeletText)
            parentComp.appendChild(newOptionSelet)
        })
    })
}

let submited = () => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = { date, time }
    dataToBeSend = {
        img: document.getElementById("validationTooltip01").value,
        img1: document.getElementById("validationTooltip13").value,
        img2: document.getElementById("validationTooltip14").value,
        img3: document.getElementById("validationTooltip15").value,
        pName: document.getElementById("validationTooltip02").value,
        price: document.getElementById("validationTooltip03").value,
        sizes: document.getElementById("validationTooltip04").value,
        pCode: document.getElementById("validationTooltip05").value,
        stock: document.getElementById("validationTooltip06").value,
        pType: document.getElementById("validationTooltip07").value,
        vendor: document.getElementById("validationTooltip09").value,
        pHead: document.getElementById("validationTooltip11").value,
        pDesc: document.getElementById("validationTooltip12").value,
        pCategory:document.getElementById("validationTooltip16").value,
        date: dateTime
    }
    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    let keyid = uuidv4()
    database.ref("Product").child(dataToBeSend.pType).child(dataToBeSend.pCategory).child(keyid).set(dataToBeSend)
    database.ref("Vendor").child(dataToBeSend.vendor).child(dataToBeSend.pCategory).child(keyid).set(dataToBeSend)
    document.getElementById("validationTooltip01").value = ""
    document.getElementById("validationTooltip13").value = ""
    document.getElementById("validationTooltip14").value = ""
    document.getElementById("validationTooltip15").value = ""
    document.getElementById("validationTooltip02").value = ""
    document.getElementById("validationTooltip03").value = ""
    document.getElementById("validationTooltip04").value = ""
    document.getElementById("validationTooltip05").value = ""
    document.getElementById("validationTooltip11").value = ""
    document.getElementById("validationTooltip12").value = ""
}

let submitNewDomain = () => {
    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    let keyid = uuidv4()
    let parentName = document.getElementById("validationTooltip100").value
    let childName = document.getElementById("validationTooltip200").value
    database.ref(parentName).child(keyid).set(childName).then(() => {
        document.getElementById("validationTooltip200").value = ""
    })
}

let updatePost = (index) => {
    dataToBeSend = {
        img: document.getElementById("validationTooltip01").value,
        img1: document.getElementById("validationTooltip13").value,
        img2: document.getElementById("validationTooltip14").value,
        img3: document.getElementById("validationTooltip15").value,
        pName: document.getElementById("validationTooltip02").value,
        price: document.getElementById("validationTooltip03").value,
        sizes: document.getElementById("validationTooltip04").value,
        pCode: document.getElementById("validationTooltip05").value,
        stock: document.getElementById("validationTooltip06").value,
        pType: document.getElementById("validationTooltip07").value,
        vendor: document.getElementById("validationTooltip09").value,
        pHead: document.getElementById("validationTooltip11").value,
        pDesc: document.getElementById("validationTooltip12").value,
        pCategory:document.getElementById("validationTooltip16").value
    }
    database.ref("Product").child(dataToBeSend.pType).child(returnArr[index].key).update(dataToBeSend);
    database.ref("Vendor").child(dataToBeSend.vendor).child(returnArr[index].key).update(dataToBeSend);
}

let editData = (index, type) => {


    document.getElementById("validationTooltip01").value = returnArr[index].img
    document.getElementById("validationTooltip13").value = returnArr[index].img1
    document.getElementById("validationTooltip14").value = returnArr[index].img2
    document.getElementById("validationTooltip15").value = returnArr[index].img3
    document.getElementById("validationTooltip02").value = returnArr[index].pName
    document.getElementById("validationTooltip03").value = returnArr[index].price
    document.getElementById("validationTooltip04").value = returnArr[index].sizes
    document.getElementById("validationTooltip05").value = returnArr[index].pCode
    document.getElementById("validationTooltip06").value = returnArr[index].stock
    document.getElementById("validationTooltip07").value = returnArr[index].pType
    document.getElementById("validationTooltip09").value = returnArr[index].vendor
    document.getElementById("validationTooltip11").value = returnArr[index].pHead
    document.getElementById("validationTooltip12").value = returnArr[index].pDesc
    document.getElementById("validationTooltip16").value = returnArr[index].pCategory
    document.getElementById("updateButton").style.visibility = "visible"
    document.getElementById("updateButton").setAttribute("onClick", `updatePost(${index})`)
    document.getElementsByClassName("form-group")[0].style.visibility = "hidden"
}


let optionSelect = (component) => {

    let newComponent = document.getElementById("validationTooltip08")
    let newComponent2 = document.getElementById("validationTooltip17")
    newComponent2.innerHTML=""
    if (component.value === "Product") {
        newComponent.innerHTML = ""
        fetchArr2.forEach((item, index) => {
            let optComp = document.createElement("option")
            let optCompText = ""
            newComponent.appendChild(optComp)
            optComp.setAttribute("value", item)
            optCompText = document.createTextNode(item)
            optComp.appendChild(optCompText)
        })
        
        document.getElementById("subProductLabel").style.visibility="visible"
        document.getElementById("validationTooltip17").style.visibility="visible"
        fetchArr3.forEach((item, index) => {
            let optComp = document.createElement("option")
            let optCompText = ""
            newComponent2.appendChild(optComp)
            optComp.setAttribute("value", item)
            optCompText = document.createTextNode(item)
            optComp.appendChild(optCompText)
        })
    }
    else if (component.value === "Vendor") {
        newComponent.innerHTML = ""
        fetchArr1.forEach((item, index) => {
            let optComp = document.createElement("option")
            let optCompText = ""
            newComponent.appendChild(optComp)
            optComp.setAttribute("value", item)
            optCompText = document.createTextNode(item)
            optComp.appendChild(optCompText)
        })
        document.getElementById("subProductLabel").style.visibility="visible"
        document.getElementById("validationTooltip17").style.visibility="visible"
        fetchArr3.forEach((item, index) => {
            let optComp = document.createElement("option")
            let optCompText = ""
            newComponent2.appendChild(optComp)
            optComp.setAttribute("value", item)
            optCompText = document.createTextNode(item)
            optComp.appendChild(optCompText)
        })
    }
}

let fetchData = () => {
    returnArr = []
    let dataToFetch={}
    let snapshotToArray = (snapshot) => {
        snapshot.forEach(function (childSnapshot) {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        console.log(returnArr)
        return returnArr;
    };
        dataToFetch = {
            parent: document.getElementById("validationTooltip10").value,
            child: document.getElementById("validationTooltip08").value,
            child2: document.getElementById("validationTooltip17").value,
        }
        database.ref(dataToFetch.parent).child(dataToFetch.child).child(dataToFetch.child2).once("value").then((snapshot) => {
            snapshotToArray(snapshot);
        }).then(() => {
            let mainComponent = document.getElementById("list-render")
            mainComponent.innerHTML = ""
            returnArr.forEach((item, index) => {
            
                let newAnchor = document.createElement("a")
                let newDiv = document.createElement("div")
                let newH5 = document.createElement("h5")
                let newP = document.createElement("p")
                let newP1 = document.createElement("p")
                let newP2 = document.createElement("p")
                let newP3 = document.createElement("p")
                let small1 = document.createElement("p")
                let small2 = document.createElement("p")
                let small3 = document.createElement("p")
                let small4 = document.createElement("p")
                let small5 = document.createElement("p")
                let small6 = document.createElement("p")
                let small7 = document.createElement("p")
                let newButton = document.createElement("button")
    
                let newH5Text, newPText, newP1Text, newP2Text, newP3Text, small1Text, small2Text, small3Text, small4Text, small5Text, small6Text, small7Text, newButtonText;
    
    
                newAnchor.setAttribute("href", "#")
                newAnchor.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start")
                newDiv.setAttribute("class", "d-flex w-100 justify-content-between")
                newH5.setAttribute("class", "mb-1")
                newP.setAttribute("class", "mb-1")
                newP1.setAttribute("class", "mb-1")
                newP2.setAttribute("class", "mb-1")
                newP3.setAttribute("class", "mb-1")
                newAnchor.setAttribute("id", item.key)
                newButton.setAttribute("class", "btn btn-success")
                newButton.setAttribute("onclick", `editData(${index},"${item.pType}")`)
                newButton.setAttribute("href", "#")
    
                mainComponent.appendChild(newAnchor)
                newAnchor.appendChild(newDiv)
                newDiv.appendChild(newH5)
                newDiv.appendChild(small1)
                newAnchor.appendChild(newP)
                newAnchor.appendChild(newP1)
                newAnchor.appendChild(newP2)
                newAnchor.appendChild(newP3)
                newAnchor.appendChild(small2)
                newAnchor.appendChild(small3)
                newAnchor.appendChild(small4)
                newAnchor.appendChild(small5)
                newAnchor.appendChild(small6)
                newAnchor.appendChild(small7)
                newAnchor.appendChild(newButton)
                newH5Text = document.createTextNode("Name : " + item.pName)
                newH5.setAttribute("title", item.pName)
                small1Text = document.createTextNode("Date : " + item.date.date)
                newPText = document.createTextNode("Img : " + item.img)
                newP1Text = document.createTextNode("Img : " + item.img1)
                newP2Text = document.createTextNode("Img : " + item.img2)
                newP3Text = document.createTextNode("Img : " + item.img3)
                newP.setAttribute("title", item.img)
                newP1.setAttribute("title", item.img1)
                newP2.setAttribute("title", item.img2)
                newP3.setAttribute("title", item.img3)
                small2Text = document.createTextNode("Price : " + item.price)
                small2.setAttribute("title", item.price)
                small3Text = document.createTextNode("Product Code : " + item.pCode)
                small3.setAttribute("title", item.pCode)
                small4Text = document.createTextNode("Size/Quantity : " + item.sizes)
                small4.setAttribute("title", item.sizes)
                small5Text = document.createTextNode("Stock : " + item.stock)
                small5.setAttribute("title", item.stock)
                small6Text = document.createTextNode("Head : " + item.pHead)
                small6.setAttribute("title", item.stock)
                small7Text = document.createTextNode("Description : " + item.pDesc)
                small7.setAttribute("title", item.stock)
                newButtonText = document.createTextNode("Edit")
                newH5.appendChild(newH5Text)
                small1.appendChild(small1Text)
                newP.appendChild(newPText)
                newP1.appendChild(newP1Text)
                newP2.appendChild(newP2Text)
                newP3.appendChild(newP3Text)
                small2.appendChild(small2Text)
                small3.appendChild(small3Text)
                small4.appendChild(small4Text)
                small5.appendChild(small5Text)
                small6.appendChild(small6Text)
                small7.appendChild(small7Text)
                newButton.appendChild(newButtonText)
            })
        })
    
}
let letterCap = (data) => {
    data.value = data.value.toUpperCase();
}
let firstLetterCap = (data) => {
    data.value = data.value.charAt(0).toUpperCase() + data.value.slice(1);
}