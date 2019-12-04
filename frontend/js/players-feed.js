let users_table = document.querySelector("#users-table");

let users = [];

let loadUsers = () => {
    /*let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/users`;
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log(xhr.response);
            users = JSON.parse(xhr.response);
            loadUsersHTML();
        }
    }*/
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/api/user`;
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth-user', localStorage.sessionId);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log(xhr.response);
            users = JSON.parse(xhr.response);
            loadUsersHTML();
        }else if(xhr.status == 402){
            console.log("Validation error");
        }
    }
    return;
}

let loadUsersHTML = () => {
    console.log("loadUsers");
    users_table.innerHTML = "";
    let html = users.map((user) => {
        return `<tr class="text-center">
                    <td>
                        <input type="checkbox">
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
                        <a id="${user.id}" ><span class="ion-ios-close"></span></a>
                        <a data-toggle="modal"
                        data-target="#modelId" id=m"${user.id}"><span class="ion-ios-more"></span></a>
                    </td>
                </tr>`;
    }).join("\n");
    users_table.innerHTML = html;
}

loadUsers();

let btnDelete = document.querySelectorAll('.ion-ios-close');

//DELETE USER 
let deleteUsers = (id) => {
    console.log(id);
    /*let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/users/${id}`;
    xhr.open('DELETE', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log(xhr.response);
        }
    }*/
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/api/user/${id}`;
    xhr.open('DELETE', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth-user', localStorage.sessionId);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log(xhr.response);
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
    console.log("Edit users")

    /*let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/users/${id}`;
    console.log(endpoint);
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        console.log(xhr.response);
        if (xhr.status == 200) {
            user = JSON.parse(xhr.response);
            console.log(user)
            userFirstName.value = user.firstName;
            userLastName.value = user.lastName;
            userPassword.value = user.password;
            userEmail = user.email;
        }
    }*/

    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/api/user/${id}`;
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth-user', localStorage.sessionId);
    xhr.send();
    xhr.onload = () => {
        console.log(xhr.response);
        if (xhr.status == 200) {
            user = JSON.parse(xhr.response);
            console.log(user)
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
    if (e.target.id > 0 && e.target.id < 1000000) {
        console.log(typeof parseInt(e.target.id));
        deleteUsers(parseInt(e.target.id));
        loadUsersHTML();
    } else {
        console.log(e.target.closest('a').id.slice(2, e.target.closest('a').id.length - 1));
        id = e.target.closest('a').id.slice(2, e.target.closest('a').id.length - 1);
        editUsers(id);
    }
})

//EDIT PLAYER 
let saveChanges = () => {
    console.log(user);
    user.firstName = userFirstName.value;
    user.lastName = userLastName.value;
    user.email = userEmail;
    user.password = userPassword.value;
    //Falta pasarle el admin


    /*let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/users/${id}`
    xhr.open('PUT', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(user));
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log("Usuario editado");
        } else {
            console.log("No se pudo editar el usuario");
        }
    }*/

    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/api/user/${id}`
    xhr.open('PUT', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth-user', localStorage.sessionId);
    xhr.send(JSON.stringify(user));
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log("Usuario editado");
        } else {
            console.log("No se pudo editar el usuario");
        }
    }

}