"use strict";
localStorage.sessionId;
localStorage.sessionName;

//VARIABLES FROM INPUT TEXTS
let userFirstName = document.querySelector('#userFirstName');
let userLastName = document.querySelector('#userLastName');
let userPassword = document.querySelector('#userPassword');
let userPasswordConfirm = document.querySelector('#userPasswordConfirm');
let userEmail = document.querySelector('#userEmail');
let btnSignUp = document.querySelector("#btnSignup");

//CLICK SIGN UP
function signUp() {
    event.preventDefault();
    if (userPassword.value != userPasswordConfirm.value) {
        alert(`Contraseñas no coinciden`);
        userPassword.value = "";
        userPasswordConfirm.value = "";
    } else {
        console.log("Coinciden");
        let xhr = new XMLHttpRequest();
        let endpoint = `http://localhost:3000/api/users`;
        xhr.open('POST', endpoint);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            "firstName": userFirstName.value,
            "lastName": userLastName.value,
            "email": userEmail.value,
            "admin": "0",
            "password": userPassword.value
        }));
        xhr.onload = () => {
            if (xhr.status == 201) {
                window.location.href = "log-in.html";
            } else {
                alert("Something went wrong");
            }
        }

    }
}