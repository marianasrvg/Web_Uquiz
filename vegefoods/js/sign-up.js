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
    let newUser = {};
    newUser.firstName = userFirstName.value;
    newUser.lastName = userLastName.value;
    newUser.email = userEmail.value;
    newUser.admin = 0;
    if(userPassword.value!=userPasswordConfirm.value){
        alert(`Contraseñas no coinciden`);
        userPassword.value = "";
        userPasswordConfirm.value = "";
    }else{
        console.log("Coinciden");
        newUser.password = userPassword.value;
        //window.location.href = "log-in.html";
        let xhr = new XMLHttpRequest();
        let endpoint = `http://localhost:3000/users`;
        xhr.open('POST', endpoint);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(newUser));
        xhr.onload = () => {
            if (xhr.status == 201) {
                    window.location.href = "log-in.html";
            } else  {
                    alert("Something went wrong");
            }
        }
    }

    
}
