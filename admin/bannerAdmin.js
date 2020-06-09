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
console.log(firebase)
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userName = user.displayName;
        userEmail = user.email;
        console.log(user);
        userEmail = userEmail.replace("@", "")
        userEmail = userEmail.replace(".", "")
    }
    else {
        location = "./adminLogin.html";
    };
})
function submit() {
    if (nameOfEve.value != "" && descriptionOfEve.value != "" && dateOfEve.value !== "") {
        var eventDateSort = dateOfEve.value.replace(/-/g, "");
        var event = {
            eventName: nameOfEve.value,
            eventDesc: descriptionOfEve.value,
            eventDate: dateOfEve.value,
            eventCreator: userName,
            eventCreatorId: userEmail,
            eventDateSort: eventDateSort
        };
        nameOfEve.value = "";
        descriptionOfEve.value = "";
        dateOfEve.value = "";
        database2.child("events").push(event);
        setTimeout(function () { alert("Your Event Has Been posted") }, 100)
    }
    else {
        alert("Kindly Fill All The Required Information")
    }
}
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
let submitBanner = () => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = { date, time }
    dataToBeSend = {
        img: document.getElementById("validationTooltip01").value,
        date: dateTime
    }
    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    let keyid = uuidv4()
    console.log(dataToBeSend)
    database.ref("Banner").child(keyid).set(dataToBeSend)
}

let delData=(index,key)=>{
    console.log(index,key)
    database.ref("Banner").child(key).remove()
    document.getElementsByTagName("a")[index].remove()
}


let fetchBannerData = () => {
    returnArr=[]
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
        console.log(returnArr)
        returnArr.forEach((item, index) => {
            let mainComponent = document.getElementById("list-render")
            mainComponent.innerHTML=""
            let newAnchor = document.createElement("a")
            let newDiv = document.createElement("div")
            let newH5 = document.createElement("h5")
            let newButton = document.createElement("button")
            let newH5Text, newButtonText;


            newAnchor.setAttribute("href", "#")
            newAnchor.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start")
            newDiv.setAttribute("class", "d-flex w-100 justify-content-between")
            newH5.setAttribute("class", "mb-1")
            newAnchor.setAttribute("id", item.key)
            newButton.setAttribute("class", "btn btn-danger")
            newButton.setAttribute("onclick", `delData(${index},"${item.key}")`)
            newH5Text = document.createTextNode("Name : " + item.img)

            mainComponent.appendChild(newAnchor)
            newAnchor.appendChild(newDiv)
            newDiv.appendChild(newH5)
            newButtonText = document.createTextNode("Delete")
            newH5.appendChild(newH5Text)
            newButton.appendChild(newButtonText)
            newDiv.appendChild(newButton)
        })
    })
}
