let score = document.querySelector("#score");
let scoreText = document.querySelector("#scoreText");

score.innerHTML = `${localStorage.score}%`;

localStorage.score = 49

if(localStorage.score > 79)
    scoreText.innerHTML = "You got almost every question correct. Congrats!";

if(localStorage.score <= 79 && localStorage.score > 59)
    scoreText.innerHTML = "You Passed!";

if(localStorage.score <= 59 && localStorage.score > 49)
    scoreText.innerHTML = "You almostPassed! better luck next time";

if(localStorage.score <= 49)
    scoreText.innerHTML = "Try Harded Next Time!";