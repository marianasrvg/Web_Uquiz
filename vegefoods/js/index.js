"use strict";
localStorage.sessionId;

//USER LOGIN SWITCHER
function onLoad() {
    let loginUser = document.querySelector('#loginUser');
    console.log(loginUser);
    if (localStorage.sessionId == undefined || localStorage.sessionId == "") {
        console.log("no hay usuario logueado");
        loginUser.innerHTML = `<a class="nav-link" href="log-in.html">Log In</a>`;
    } else {
        console.log("usuario logueado");
        loginUser.innerHTML = `<a class="nav-link dropdown-toggle" href="profile.html" id="dropdown99" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">(user name)</a>
    <div class="dropdown-menu" aria-labelledby="dropdown99">
        <a class="dropdown-item" href="profile.html">Edit</a>
        <a onclick="signOut()" class="dropdown-item" href="index.html">Sign Out</a>
    </div>`;
    }
}

function signOut(){
    localStorage.clear();
}