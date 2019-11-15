let users_table = document.querySelector("#users-table");

let users = [];

let loadUsers = () => {
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/users`;
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if(xhr.status == 200){
            console.log(xhr.response);
            users = JSON.parse(xhr.response);
            loadUsersHTML();
        }
    }
    return;
}

let loadUsersHTML = () => {
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
                        <a href="#"><span class="ion-ios-close"></span></a>
                        <a href="#"><span class="ion-ios-more"></span></a>
                    </td>
                </tr>`;
    }).join("\n");
    users_table.innerHTML = html;
}

loadUsers();