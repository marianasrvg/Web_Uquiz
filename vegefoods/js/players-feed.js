let users_table = document.querySelector("#users-table");

let users = [];

let loadUsers = () => {
    let xhr = new XMLHttpRequest();
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
   let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/users/${id}`;
    xhr.open('DELETE', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log(xhr.response);
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
    }
})

//EDIT PLAYER

let saveChanges = () => {}
