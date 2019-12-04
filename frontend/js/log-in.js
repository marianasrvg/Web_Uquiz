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
    console.log("login")
    let xhr = new XMLHttpRequest();
    let data = {};
    data.email = userEmail;
    data.password = userPassword;
    //console.log(userEmail.value);
    //let endpoint = `http://localhost:3000/users/?email=${userEmail.value}`
    let endpoint = `http://localhost:3000/api/login`
    xhr.open('POST', endpoint);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "email":data.email.value,
        "password":data.password.value
      }));
    xhr.onload = () => {
        if (xhr.status == 200) {
            let response = JSON.parse(xhr.response);
            window.location.href="index.html";
            alert(`Bienvenido ${response.firstName}`);
            localStorage.sessionId = response.token;
            localStorage.sessionName =response.firstName;
            localStorage.userId = response.id;
            localStorage.isAdmin = response.admin;
        } else if (xhr.status == 400){
            alert("Invalid Crdentials");
        }
    }
}
