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
var emailI = document.getElementById('email');
var pass = document.getElementById('password');
var nameInput = document.getElementById('username');
var type = "admin"
var database = firebase.database().ref("/");
var attemp = 0;

let signUpChecked = (data) => {
    type = data.value
}

function signUp() {
    var email = emailI.value;
    var password = pass.value;
    var name = nameInput.value;
    var pro = {
        emailU: email,
        uName: name,
        type
    };
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (user) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(function (user) {
                    attemp = attemp + 1;
                    database.child("UsersNames").on("child_added", function (snapshot) {
                        var em = snapshot.val()
                        if (email == em.emailU) {
                            let obj = JSON.stringify({
                                userNameForEvent: em.uName,
                                userEmailForEvent: em.emailU,
                                type: em.type,
                            })
                            localStorage.setItem("userData", obj)
                        }
                    });
                    localStorage.setItem("signOn", 1);
                    location = "./admin.html";
                })
                .catch(function (error) {
                    alert(error.message);
                });
        })
        .catch(function (error) {
            alert(error.message)
        })
    database.child("UsersNames").push(pro);

}
database.child("UsersNames").on("child_added", function (snapshot) {
    var em = snapshot.val()
});
function login() {
    if (attemp == 0) {
        var email = emailI.value;
        var password = pass.value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (user) {
                attemp = attemp + 1;
                database.child("UsersNames").on("child_added", function (snapshot) {
                    var em = snapshot.val()
                    if (email == em.emailU) {
                        let obj = JSON.stringify({
                            userNameForEvent: em.uName,
                            userEmailForEvent: em.emailU,
                            type: em.type,
                        })
                        localStorage.setItem("userData", obj)
                    }
                });
                localStorage.setItem("signOn", 1);
                location = "./admin.html";
            })
            .catch(function (error) {
                alert(error.message);
            });
    }
    else if (attemp == 1) {
        alert("You Are Already Sign In Please Wait");
    }
}