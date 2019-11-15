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
                loadHTML();
            }
            return;
        }
    }
    localStorage.removeItem("quizzDetails");
    return;
}

let loadHTML = () => {
    name.innerText = quizz.name;
    makeAnimationCount();
    localStorage.removeItem("quizzDetails");
}

let makeAnimationCount = () => {
    $('#played').animateNumber({
        number: quizz.played
    }, 5000);
    $('#best-score').animateNumber({
        number: quizz.bestScore
    }, 5000);
    $('#worst-score').animateNumber({
        number: quizz.worstScore
    }, 5000);
}

loadData();