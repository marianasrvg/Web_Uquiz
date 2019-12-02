"use strict";
localStorage.sessionId;
localStorage.sessionName;
localStorage.userId;
localStorage.isAdmin;

//VARIABLES FROM INPUT TEXTS
let userEmail = document.querySelector('#userEmail');
let userPassword = document.querySelector('#userPassword');

//CLICK LOGIN
function logIn() {
    let xhr = new XMLHttpRequest();
    console.log(userEmail.value);
    let endpoint = `http://localhost:3000/users/?email=${userEmail.value}`
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if (xhr.status == 200) {
            let user = JSON.parse(xhr.response);
            if (user[0].password == userPassword.value) {
                alert(`Bienvenido ${user[0].firstName} ${user[0].lastName}`);
                localStorage.sessionId = "TOKEN";
                localStorage.sessionName = user[0].firstName;
                localStorage.userId = user[0].id;
                localStorage.isAdmin = user[0].admin;
                window.location.href="index.html";
            }else{
                alert("Usuario o contraseña incorrectos");
            }
        } else if (xhr.status == 404) {
            alert("Usuario o contraseña incorrectos");
        }
    }
}
