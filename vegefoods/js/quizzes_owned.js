let quizzesTable = document.querySelector("tbody");
let closeBtn;
let quizzes;

function loadQuizzesInfo () {
    let xhr = new XMLHttpRequest();
    let endpoint = `http://localhost:3000/quizzes`;
    xhr.open('GET', endpoint);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        if(xhr.status == 200){
            console.log(xhr.response);
            quizzes = JSON.parse(xhr.response);
            loadQuizzesHTML();
        }
    }
    return;
}; 

let loadQuizzesHTML = () => {
    quizzesTable.innerHTML = "";
    quizzesTable.innerHTML = quizzes.map((quizz) => {
        return `<tr class="text-center">
        <td class="image-prod">
            <div class="img" style="background-image:url(${quizz.url});">
            </div>
        </td>

        <td class="product-name">
            <a href="#" onclick="quizzDetails(${quizz.id})">
                <h3>${quizz.name}</h3>
                <p>${quizz.description}</p>
            </a>
        </td>

        <td class="price">${quizz.id}</td>

        <td class="product-remove">
            <a class="delete" href="#"><span class="ion-ios-close"></span></a>
            <a href="#"><span class="ion-ios-more"></span></a>
        </td>
    </tr>`;
    }).join("\n");
    addDeleteClass();
}

let deleteQuizz = (event) => {
    pin = event.currentTarget.parentElement.previousElementSibling.innerText;
    let option = confirm(`¿Deseas eliminar el quizz con el pin ${pin}`);
    if(option == true) {
        let xhr = new XMLHttpRequest();
        let endpoint = `http://localhost:3000/quizzes/${pin}`;
        xhr.open('DELETE', endpoint);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
        xhr.onload = () => {
            if(xhr.status == 200){
                console.log(xhr.response);
                //quizzes = JSON.parse(xhr.response);
                //loadQuizzesHTML();
            }
        }
    } 
    return;
}

let addDeleteClass = () => {
    closeBtn = document.querySelectorAll(".delete");
    //console.log(closeBtn);
    closeBtn.forEach((element) => {
        element.addEventListener("click", deleteQuizz);
    });
}

let verifyUser = () => {
    if(localStorage.sessionId){
       //loadHTMLInfo
    }
    loadQuizzesInfo();
    return;
}

let quizzDetails = (pin) => {
    //console.log(`Details ${pin}`);
    localStorage.quizzDetails = pin;
    window.location.href = "quizz-info.html";
}

//console.log(closeBtn);
verifyUser();