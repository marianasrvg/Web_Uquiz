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
    console.log(quizz);
    name.innerText = quizz.name;
    //played.textContent = quizz.played;
    //bestScore.textContent = quizz.bestScore;
    //worstScore.textContent = quizz.worstScore;
    played.setAttribute("data-number", quizz.played);
    bestScore.setAttribute("data-number", quizz.bestScore);
    worstScore.setAttribute("data-number", quizz.worstScore);
    makeCount();
    //setInterval(function() { makeCount(); }, 100);
}

let makeCount = () => {
    //console.log(played.innerText);
    //console.log(played.getAttribute("data-number"));
    //console.log(played);
    
    let count = Number(played.innerHTML);
    let lim = Number(played.getAttribute("data-number"));
    console.log(count);
    console.log(lim);
    $('#played').animateNumber({
        number: 50
    });
    // console.log(count);
    // console.log(lim);
    // if(count == lim){
    //      return;
    // }
    // count++;
    // played.textContent = count;
    
}


loadData();