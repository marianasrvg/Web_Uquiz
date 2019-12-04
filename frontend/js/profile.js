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

let admin;
//ONLOAD EVENT
window.addEventListener('load',()=>{
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/api/users/${localStorage.userId}`
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth-user', localStorage.sessionId);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log(xhr.response);
            let user = JSON.parse(xhr.response);
            userFirstName.value=user.firstName;
            userLastName.value=user.lastName;
            userEmail.value=user.email;
            userPassword.value=user.password;
            admin = user.admin;
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
    user.admin = admin;
    user.password = userPassword.value;

    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/api/users/${localStorage.userId}`
    xhr.open('PUT', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth-user', localStorage.sessionId);
    xhr.send(JSON.stringify(user));
    xhr.onload = () => {
        if(xhr.status == 200){
            alert("User changed");
        }else if (xhr.status == 402) {
            alert("Middleware Validation Error");
        } else{
            alert('Error');
        }
    }
}

btnSaveChanges.addEventListener("click",saveChanges);

