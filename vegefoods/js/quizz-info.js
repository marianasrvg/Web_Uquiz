let name = document.querySelector("#qname");
let played = document.querySelector("#played");
let bestScore = document.querySelector("#best-score");
let worstScore = document.querySelector("#worst-score");

let pin;
let quizz;

let loadData = () => {
    if(localStorage.quizzDetails){
        pin = localStorage.quizzDetails;
        let xhr = new XMLHttpRequest();
        let endpoint = `http://localhost:3000/quizzes/${pin}`;
        xhr.open('GET', endpoint);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
        xhr.onload = () => {
            if(xhr.status == 200){
                quizz = JSON.parse(xhr.response);
                localStorage.removeItem("quizzDetails");
                loadHTML();
            }
            return;
        }
    }
    localStorage.removeItem("quizzDetails");
    return;
}

let loadHTML = () => {
    //console.log(quizz);
    name.innerText = quizz.name;
    played.innerText = quizz.played;
    bestScore.innerText = quizz.bestScore;
    worstScore.innerText = quizz.worstScore;
    // played.setAttribute("data-number", quizz.played);
    // bestScore.setAttribute("data-number", quizz.bestScore);
    // worstScore.setAttribute("data-number", quizz.worstScore);
}

loadData();