
let quizzResults;
let quizzesTable = document.querySelector("tbody");

let loadQuizzResults = (cb) => {
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/quizzresults?user=${localStorage.userId}`
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
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
    let endpoint = `http://localhost:3000/quizzes/${results.quizz}`;
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if(xhr.status == 200){
            //console.log(xhr.response);
            //console.log(results);
            //console.log(JSON.parse(xhr.response));
            return loadQuizzHTML(JSON.parse(xhr.response), results);
        }
    }
    return;
}; 

let loadQuizzesHTML = () => {
    quizzesTable.innerHTML = "";
    //console.log(quizzResults);
    quizzResults.forEach(element => {
        loadQuizzInfo(element)
    });
    /*let html = quizzResults.map((quizz) => {
        loadQuizzInfo(quizz.id);
        console.log(quizzInfo);    
    }).join("\n");*/

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
        //loadQuizzResults for the an specific user;
    }
    loadQuizzResults(loadQuizzesHTML);
    return
}

//console.log(quizzesTable);
verifyUser();
