"use strict";
localStorage.sessionId;
localStorage.sessionName;
localStorage.userId;

//VARIABLES FROM INPUT TEXTS
let userFirstName = document.querySelector('#userFirstName');
let userLastName = document.querySelector('#userLastName');
let userEmail = document.querySelector('#userEmail');
let userPassword = document.querySelector('#userPassword');
let btnSaveChanges = document.querySelector('#btnSaveChanges');

console.log(localStorage.userId);

//ONLOAD EVENT
window.addEventListener('load',()=>{
    /*let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/users/?id=${localStorage.userId}`
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if (xhr.status == 200) {
            let user = JSON.parse(xhr.response);
            userFirstName.value=user[0].firstName;
            userLastName.value=user[0].lastName;
            userEmail.value=user[0].email;
            userPassword.value=user[0].password;
        } else if (xhr.status == 404) {
            alert("Error en el servidor");
        }
    }*/

    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/api/user/${localStorage.userId}`
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth-user', localStorage.sessionId);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status == 200) {
            let user = JSON.parse(xhr.response);
            userFirstName.value=user[0].firstName;
            userLastName.value=user[0].lastName;
            userEmail.value=user[0].email;
            userPassword.value=user[0].password;
        } else if (xhr.status == 402) {
            alert("Middleware Validation Error");
        } else{
            alert('Error');
        }
    }
})

function saveChanges() {
    let user = {};

    user.firstName =  userFirstName.value;
    user.lastName = userLastName.value;
    user.email = userEmail.value;
    user.password = userPassword.value;

   /* let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/users/${localStorage.userId}`

    xhr.open('PUT', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(user));
    xhr.onload = () => {
        if(xhr.status == 200){
            window.location.href = "index.html";
        }
    }*/

    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/api/user/${localStorage.userId}`
    xhr.open('PUT', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth-user', localStorage.sessionId);
    xhr.send(JSON.stringify(user));
    xhr.onload = () => {
        if(xhr.status == 200){
            window.location.href = "index.html";
        }else if (xhr.status == 402) {
            alert("Middleware Validation Error");
        } else{
            alert('Error');
        }
    }
}

btnSaveChanges.addEventListener("click",saveChanges);

