let quizzResults;
let quizz;

let question = document.querySelector("#question");
let answers = document.querySelector("#answers");
let index = 0;
let min = 0;
let sec = 0;

let addCorrectQuestions = (quizz) => {
    let correct = quizz.questions.map((item) => {
        return item.answers.map((answer) => {
            if(answer.correct == true){
                return answer.answer;
            }
        });
    });
    quizz.correct = correct;
}



let loadQuizz = (cb) => {
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/quizzes/${localStorage.pin}`
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if(xhr.status == 200){
            quizz = JSON.parse(xhr.response);
            addCorrectQuestions(quizz);
            cb(index);
        }
    }
}

let loadQuizzResults = () => {
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/quizzresults/${localStorage.quizz}`
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if(xhr.status == 200){
            quizzResults = JSON.parse(xhr.response);
            quizzResults.answers = [];
        }
    }
}

let loadQuestions = (index) => {
    question.innerText = quizz.questions[index].question;
    let html = quizz.questions[index].answers.map((item) => {
        return `
        <div class="col-md-6 col-lg-4">
            <div class="product">
                <div class="text py-3 pb-4 px-3 text-center">
                    <h3>${item.answer}</h3>
                </div>
            </div>
        </div>`
    }).join("");
    answers.innerHTML = html;
    console.log(quizz.questions[index]);
    console.log(quizz.questions[index].time);
    min = Math.floor(quizz.questions[index].time / 60);
    sec = quizz.questions[index].time % 60 | 0;
}

loadQuizz(loadQuestions);
loadQuizzResults();

function makeTimer() {
    $("#minutes").html(min + "<span>Minutes</span>");
    $("#seconds").html(sec + "<span>Seconds</span>");
    if(sec == 0){
        min--;
        sec = 60;
    }
    sec--;
    //Store answer null
    //loadNextQuestion
}

setInterval(function() { makeTimer(); }, 1000);

function storeAnswer(event) {
    if(event.target.className != "text py-3 pb-4 px-3 text-center" && event.target.nodeName != "H3" ){
        return; 
    }

    let newAnswer = {};
    newAnswer.time = quizz.questions[index].time - ((min * 60) + sec);
    newAnswer.question = quizz.questions[index].question;
    newAnswer.answer = event.target.innerText;
    
    let found = quizz.correct[index].find(x => {
        if(x == undefined) return;
        return x.toUpperCase() == event.target.innerText
    });

    if(found == undefined){
        newAnswer.correct = false;
    }else {
        newAnswer.correct = true;
    }
    quizzResults.answers[index] = newAnswer;
    index++;
    loadQuestions(index);
}

answers.addEventListener("click",storeAnswer);
