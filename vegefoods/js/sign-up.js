"use strict";
localStorage.sessionId;
localStorage.sessionName;

//VARIABLES FROM INPUT TEXTS
let userFirstName = document.querySelector('#userFirstName');
let userLastName = document.querySelector('#userLastName');
let userPassword = document.querySelector('#userPassword');
let userPasswordConfirm = document.querySelector('#userPasswordConfirm');
let userEmail = document.querySelector('#userEmail');


//CLICK SIGN UP
function signUp() {
    event.preventDefault();

    if(userPassword.value!=userPasswordConfirm.value){
        alert(`Contraseñas no coinciden`);
        userPassword.value = "";
        userPasswordConfirm.value = ""
    }else{
        console.log("Coinciden");
    }

    /*let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/users`
     xhr.open('POST', endpoint);
     xhr.setRequestHeader('Content-Type', 'application/json');
     xhr.send();
     xhr.onload = () => {
         if (xhr.status == 200) {
             let user = JSON.parse(xhr.response);
             if (user[0].password == userPassword.value) {
                 alert(`Bienvenido ${user[0].firstName} ${user[0].lastName}`);
                 localStorage.sessionName = user[0].firstName;
                 window.location.href="log-in.html";
             }else{
                 alert("Usuario o contraseña incorrectos");
             }
         } else if (xhr.status == 404) {
             alert("Usuario o contraseña incorrectos");
         }
     }*/
}