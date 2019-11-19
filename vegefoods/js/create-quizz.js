let quizz_name = document.querySelector("#quizz-name");
let quizz_description = document.querySelector("#quizz-description");
let quizz_image = document.querySelector("#quizz-image");

let q_name = document.querySelector("#q-name");
let q_time = document.querySelector("#q-time");
let q_img = document.querySelector("#q-img");

let btn_q_create = document.querySelector("#btn-q-create");
let bnt_a_add = document.querySelector("#btn-add-answer");
let btn_back = document.querySelector("#btn_back");
let btn_quizz_create = document.querySelector("#btn_quizz_create");

let question_list = document.querySelector("#question-list");
let answer_list = document.querySelector("#answer-list");
let answer_append = document.querySelector("#answer_append");

let model_q = document.querySelector("#modelId");

let questions = [];
let i = 2;


let saveQuestion = () => {
    event.preventDefault();
    
    let question = {};
    
    question.question = q_name.value;
    question.time = q_time.value;
    question.url = q_img.value;

    let answers = document.querySelectorAll(".answer");
    let array_answers = [];

    answers.forEach((item) => {
        let checkbox = item.previousElementSibling.previousElementSibling;
        let a = {};
        a.answer = item.value;
        a.correct = checkbox.checked;
        array_answers.push(a);
    });
    
    question.answers = array_answers;
    questions.push(question);
    
    cleanQuestion();
    loadQuestions();
    $("#modelId").modal('hide');
    console.log(questions);
}

let cleanQuestion = () => {
    q_name.value = "";
    q_time.value = 30;
    q_img.value = "";
    i = 2;
    answer_list.innerHTML = "";
}

let loadQuestions = () => {
    question_list.innerHTML = "";
    let html = questions.map((question) => {
        return `<tr class="text-center">
        <td class="product-name">
            <h3>${question.question}</h3>
        </td>
        <td class="product-remove">
            <a href="#"><span class="ion-ios-close"></span></a>
            <a href="#"><span class="ion-ios-more"></span></a>
        </td>
    </tr>`;
    }).join("\n");
    question_list.innerHTML = html;
}

let addAnswer = (e) => {
    let div = document.createElement("DIV");
    div.className = "form-group";
    div.innerHTML = `<input type="checkbox" value="" class="mr-2"> 
    <span class="input-group-addon"></span> 
    <input type="text" class="form-control answer" placeholder="Answer ${i}">`;
    
    answer_list.append(div);
    i++;
}

let createQuizz = (event) => {
    let quizz = {};
    quizz.name = quizz_name.value;
    quizz.description = quizz_description.value;
    quizz.url = quizz_image.value;
    quizz.creator = localStorage.userId | "";
    quizz.questions = questions;
    console.log(quizz);

    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/quizzes`;
    xhr.open('POST', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(quizz));
    xhr.onload = () => {
        console.log(xhr.response);
    }
}

bnt_a_add.addEventListener("click", addAnswer);
loadQuestions();
btn_back.addEventListener("click", (event) => {
    window.location.href = "index.html";
});
btn_quizz_create.addEventListener("click", createQuizz);