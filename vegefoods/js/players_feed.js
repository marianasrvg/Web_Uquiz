let playersTable = document.querySelector("tbody");
let playersResults;

let loadUsers = (cb) => {
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/users`;
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if(xhr.status == 200){            
            players = JSON.parse(xhr.response);
            cb();
        }
    }   
}

function loadPlayerInfo (results) {
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/users/${results.quizz}`;
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if(xhr.status == 200){
            console.log(xhr.response);
            console.log(results);
            console.log(JSON.parse(xhr.response));
            return loadQuizzHTML(JSON.parse(xhr.response), results);
        }
    }
    return;
}; 


let loadPlayersHTML = () => {
    playersTable.innerHTML = "";
    //console.log(quizzResults);
    playersResults.forEach(element => {
        loadQuizzInfo(element)
    });
}

let loadPlayerHTML = (quizz, results) => {
    //console.log("Entro o no?");
    let score = results.score | "-";
    let time = results.time | "-";
    quizzesTable.innerHTML += `<tr class="text-center">
        <td class="image-prod">
            <div class="img" style="background-image:url(${quizz.url});">
            </div>
        </td>
        <td class="product-name">
            <h3>${quizz.name}</h3>
            <p>${quizz.description}</p>
        </td>
        <td class="price">${score}%</td>
        <td class="price">
            ${time}
        </td>
    <td class="price">Quizz total time min</td>
    </tr>`
}
let loadQuizzHTML = (quizz, results) => {
    //console.log("Entro o no?");
    let score = results.score | "-";
    let time = results.time | "-";
    quizzesTable.innerHTML += `<tr class="text-center">
        <td class="image-prod">
            <div class="img" style="background-image:url(${quizz.url});">
            </div>
        </td>
        <td class="product-name">
            <h3>${quizz.name}</h3>
            <p>${quizz.description}</p>
        </td>
        <td class="price">${score}%</td>
        <td class="price">
            ${time}
        </td>
    <td class="price">Quizz total time min</td>
    </tr>`
}
