"use strict";
localStorage.sessionId;
localStorage.sessionName;
localStorage.userId;
localStorage.isAdmin;

//VARIABLES FROM INPUT TEXTS
let createBtn = document.querySelector('#createBtn');

//VALIDAR USUARIO LOGUEADO
createBtn.addEventListener('click', (e) => {
    if (localStorage.sessionId == undefined || localStorage.sessionId == "") {
        console.log("no hay usuario logueado");
        window.location.href = "log-in.html";
    } else {
        window.location.href = "create-quiz.html";
        console.log("usuario logueado");
    }
})