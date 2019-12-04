let users_table = document.querySelector("#users-table");

let users = [];

let loadUsers = () => {
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/api/users`;
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth-user', localStorage.sessionId);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status == 200) {
            users = JSON.parse(xhr.response);
            loadUsersHTML();
        }else if(xhr.status == 402){
            console.log("Validation error");
        }
    }
    return;
}

let loadUsersHTML = () => {
    users_table.innerHTML = "";
    console.log("loadusers");
    let html = users.map((user) => {
        return `<tr class="text-center">
                    <td>
                        <input  id="CB-${user.id}" type="checkbox" ${(user.admin==0)?">":"checked >"}
                    </td>
                    <td>
                        <p id="user-id">${user.id}</p>
                    </td>
                    <td class="product-name">
                        <h3>${user.firstName}</h3>
                        <p>${user.lastName}</p>
                    </td>
                    <td class="product-name">
                        <h3>${user.email}</h3>
                    </td>
                    <td class="product-remove">
                        <a id="${user.id}" ><span id=${user.id} class="ion-ios-close"></></a>
                        <a data-toggle="modal"
                        data-target="#modelId" id=m"${user.id}"><span id=m"${user.id} class="ion-ios-more"></span></a>
                    </td>
                </tr>`;
    }).join("\n");
    users_table.innerHTML = html;
}

loadUsers();

let btnDelete = document.querySelectorAll('.ion-ios-close');

//DELETE USER 
let deleteUsers = (id) => {
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/api/users/${id}`;
    xhr.open('DELETE', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth-user', localStorage.sessionId);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log(xhr.response);
            loadUsers();
        }
    }
    return;
}

//EDIT USER MODAL ELEMENTS
let userFirstName = document.querySelector('#userFirstName');
let userLastName = document.querySelector('#userLastName');
let userPassword = document.querySelector('#userPassword');

//ID DE USUARIO SELECCIONADO
let id;
//USUARIO SELECCIONADO
let user;


//EDIT USER 
let editUsers = (id) => {
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/api/users/${id}`;
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth-user', localStorage.sessionId);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status == 200) {
            user = JSON.parse(xhr.response);
            userFirstName.value = user.firstName;
            userLastName.value = user.lastName;
            userPassword.value = user.password;
            userEmail = user.email;
        }
    }
    return;
}

//DELETE USER EVENT
users_table.addEventListener('click', (e) => {
    console.log(e.target.id);
    if (e.target.id > 0 && e.target.id < 1000000) {
        console.log(typeof parseInt(e.target.id));
        deleteUsers(parseInt(e.target.id));
    } else {
        console.log(e.target.closest('a').id.slice(2, e.target.closest('a').id.length - 1));
        id = e.target.closest('a').id.slice(2, e.target.closest('a').id.length - 1);
        editUsers(id);
    }
})

//EDIT PLAYER 
let saveChanges = () => {

    //Falta pasarle el admin
    console.log({
        "firstName":userFirstName.value,
        "lastName": userLastName.value,
        "email":userEmail,
        "admin":(document.getElementById(`CB-${id}`).checked==true?1:0),
        "password":userPassword.value
    });
    console.log(id);
    
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/api/users/${id}`
    xhr.open('PUT', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth-user', localStorage.sessionId);
    xhr.send(JSON.stringify({
        "firstName":userFirstName.value,
        "lastName": userLastName.value,
        "email":userEmail,
        "admin":(document.getElementById(`CB-${id}`).checked==true?1:0),
        "password":userPassword.value
    }));
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log("User edited");
        } else {
            console.log(xhr.response);
        }
    }

}