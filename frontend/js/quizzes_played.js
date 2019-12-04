let quizzResults;
let quizzesTable = document.querySelector("tbody");

let loadQuizzResults = (cb) => {
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/api/quizzresults/`
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth-user', localStorage.sessionId);
    xhr.send();
    xhr.onload = () => {
        if(xhr.status == 200){
            //console.log(xhr.response);
            quizzResults = JSON.parse(xhr.response);
            cb();
        }
    }
}

function loadQuizzInfo (results) {

    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/api/quizz/${results.quizz}`;
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth-user', localStorage.sessionId);
    xhr.send();
    xhr.onload = () => {
        if(xhr.status == 200){
            return loadQuizzHTML(JSON.parse(xhr.response), results);
        }
    }
    return;
}; 

let loadQuizzesHTML = () => {
    quizzesTable.innerHTML = "";
    quizzResults.forEach(element => {
        loadQuizzInfo(element)
    });

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
            ${time} secs
        </td>
    <td class="price">Quizz total time min</td>
    </tr>`
}


let verifyUser = () => {
    if(localStorage.sessionId){
        loadQuizzResults(loadQuizzesHTML);
        return;
    }
    window.location.href = "log-in.html";
    return;
}

//console.log(quizzesTable);
verifyUser();
