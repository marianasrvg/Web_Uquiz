'use strict';

let btn_pin = document.querySelector("#btn_pin");
let input_pin = document.querySelector("#input_pin");
let model_nickname = document.querySelector("#modelId");
let btn_play = document.querySelector("#btn_play");
let nickname = document.querySelector("#nickname");

console.log(btn_pin);
console.log(input_pin);

input_pin.addEventListener("keyup", (e) => {
    if(e.keyCode < 47 || e.keyCode > 58){        
        input_pin.value = "";
    }else {
        if(input_pin.value.length > 4){
            input_pin.value = input_pin.value.slice(0,4);
        }
    }
});

let getUserName = () => {
    if(localStorage.sessionId != undefined){
        //obtienes el user
        if(localStorage.userId != ""){
        //muestras el nombre del usuario en el nickname
            nickname.value = localStorage.sessionName;
        //agregar el id a quizzresults
            quizzResults.user = localStorage.userId;
        }
        
        console.log(localStorage.sessionId);
    }else{

        console.log("Usuario dummy");
        quizzResults.user = 0;
        console.log(quizzResults);
    }
}

let verifyQuizz = (e) => {
    if(input_pin.value.length == 0){
        alert("Ingresa un pin válido");
        return;
    }
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/quizzes/${input_pin.value}`
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if(xhr.status == 200){
            localStorage.pin = JSON.parse(xhr.response).id;
            getUserName();
            $("#modelId").modal('show');
        }else if(xhr.status == 404){
            alert("Ese pin no existe");
            input_pin.value = "";
        }
    }
}

let quizzResults = {};

let startQuizz = (e) => {
    if(nickname.value.length == 0){
        alert("Ingresa nickname");
        return;
    }
    quizzResults.nickname = nickname.value;
    quizzResults.quizz = localStorage.pin;
    
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/quizzresults`
    xhr.open('POST', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(quizzResults));
    xhr.onload = () => {
        if(xhr.status == 201){
            localStorage.quizz = JSON.parse(xhr.response).id;
            window.location.href = "quizz.html";
        }
    }
}

btn_play.addEventListener("click", startQuizz);
btn_pin.addEventListener("click", verifyQuizz);